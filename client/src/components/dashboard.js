import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import api from '../axios';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchUserLogs();
  }, []);

  const fetchUserLogs = async () => {
    try {
      const profile = JSON.parse(localStorage.getItem('userProfile'));
      const response = await api.get(`/logs/${profile.id}`, {
        headers: {
          'Authorization': `Bearer ${profile.token}`,
        },
        credentials: 'include'
      });
      setLogs(response.data);
    } catch(error) {
      console.error('Error fetching logs:', error)
    }
  };
  const xLabels = logs.map((_, index) => `Day ${index + 1}`);
  
  const chartData = {
    mood: logs.map(log => log.mood),
    anxiety: logs.map(log => log.anxiety),
    sleep: logs.map(log => log.sleep),
  };

  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <LineChart
          series={[
            {
              data: chartData.mood,
              label: 'Mood',
              color: 'rgba(255, 99, 132, 1)',
            },
            {
              data: chartData.anxiety,
              label: 'Anxiety',
              color: 'rgba(54, 162, 235, 1)',
            },
            {
              data: chartData.sleep,
              label: 'Sleep',
              color: 'rgba(255, 206, 86, 1)',
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'point' }]}
          height={300}
        />
      </div>
    </div>
  );
};

export default Dashboard;
