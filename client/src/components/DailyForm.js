import AppBar from '@mui/material/AppBar';
import api from '../axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const DailyForm = () => {

  const moodMarks = [
    { value: 1, label: 'Very Sad' },
    { value: 5, label: 'Neutral' },
    { value: 10, label: 'Very Happy' }
  ];

  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState('');
  const [sleep, setSleep] = useState('');
  const [activity, setActivity] = useState('');
  const [social, setSocial] = useState('');
  const [stress, setStress] = useState('');
  const profile = JSON.parse(localStorage.getItem('userProfile'));
  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    anxiety: false,
    sleep: false
  });

  const logOut = () => {
    googleLogout();
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logData = {
      userId: profile.id,
      mood,
      anxiety,
      sleep,
      activity,
      social,
      stress
    };

    const newErrors = {
      anxiety: anxiety === '',
      sleep: sleep === ''
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      const response = await api.post('/log', logData, {
        headers: {
          'Authorization': `Bearer ${profile.token}`,
        },
      });
      if (response.data) {
        navigate('/');
      } else {
        console.log('Failed to submit log');
      }
    } catch (error) {
      console.error('Error submitting daily log:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome, {profile.email}
            </Typography>
            <Button color="inherit" onClick={logOut}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      <Box sx={{ width: 400, flexDirection: 'column', display: 'flex', marginX: 'auto', marginTop: 5 }}>
        <h3>Daily Mental Health Check-in</h3>
        <form noValidate>
          <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
            <label>Mood Rating</label>
            <Slider
              marks={moodMarks}
              min={1}
              max={10}
              valueLabelDisplay="auto"
              value={mood} onChange={(e) => setMood(e.target.value)}
            />
            
            <TextField
              required
              label="Anxiety Level (1-10)"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              fullWidth
              margin="normal"
              error={errors.anxiety}
              helperText={errors.anxiety ? 'This field is required' : ''}
              value={anxiety} onChange={(e) => setAnxiety(e.target.value)}
            />
            
            <TextField
              required
              label="Hours of sleep"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              placeholder="Hours of sleep"
              fullWidth
              margin="normal"
              error={errors.sleep}
              helperText={errors.sleep ? 'This field is required' : ''}
              value={sleep} onChange={(e) => setSleep(e.target.value)}
            />
            
            <TextField
              select
              label="Physical Activity"
              defaultValue=""
              fullWidth
              margin="normal"
              value={activity} onChange={(e) => setActivity(e.target.value)}
            >
              <MenuItem value="none">No Activity</MenuItem>
              <MenuItem value="light">Light (15-30 mins)</MenuItem>
              <MenuItem value="moderate">Moderate (30-60 mins)</MenuItem>
              <MenuItem value="intense">Intense (60+ mins)</MenuItem>
            </TextField>
            
            <TextField
              select
              label="Social Interactions Today"
              defaultValue=""
              fullWidth
              margin="normal"
              value={social} onChange={(e) => setSocial(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="extensive">Extensive</MenuItem>
            </TextField>
            
            <TextField
              label="Stress Level (1-10)"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              fullWidth
              margin="normal"
              value={stress} onChange={(e) => setStress(e.target.value)}
            />
          </FormControl>
          
          <Button 
            sx={{ width: '100%', marginBottom: 2 }} 
            type="submit" 
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit Daily Check-in
          </Button>
        </form>
      </Box>
    </>
  );
};

export default DailyForm;
