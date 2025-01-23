import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Home(props) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome, {props.profile.email}
            </Typography>
            <Button color="inherit" component={Link} to="/daily_logs">
              New logs
            </Button>
            <Button color="inherit" onClick={props.logOut}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
