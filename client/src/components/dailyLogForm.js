import React, { useState } from 'react';

const DailyLogForm = () => {
  const [mood, setMood] = useState('');
  const [anxiety, setAnxiety] = useState('');
  const [sleep, setSleep] = useState('');
  const [activity, setActivity] = useState('');
  const [social, setSocial] = useState('');
  const [stress, setStress] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      mood,
      anxiety,
      sleep,
      activity,
      social,
      stress,
      symptoms
    };

    try {
      const response = await fetch('/api/log', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (response.ok) {
        alert('Daily log submitted successfully!');
      } else {
        alert('Failed to submit log');
      }
    } catch (error) {
      console.error('Error submitting daily log:', error);
    }
  };

  return (
    <div>
      <h2>Daily Mental Health Log</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mood:
          <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} required />
        </label>
        <br />
        <label>
          Anxiety:
          <input type="text" value={anxiety} onChange={(e) => setAnxiety(e.target.value)} required />
        </label>
        <br />
        <label>
          Sleep Hours:
          <input type="number" value={sleep} onChange={(e) => setSleep(e.target.value)} required />
        </label>
        <br />
        <label>
          Physical Activity:
          <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} required />
        </label>
        <br />
        <label>
          Social Interactions:
          <input type="text" value={social} onChange={(e) => setSocial(e.target.value)} required />
        </label>
        <br />
        <label>
          Stress:
          <input type="text" value={stress} onChange={(e) => setStress(e.target.value)} required />
        </label>
        <br />
        <label>
          Symptoms:
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)}></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DailyLogForm;
