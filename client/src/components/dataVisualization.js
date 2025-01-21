import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Import Chart.js

const DataVisualization = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/logs', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setLogs(data);
      })
      .catch(error => console.error('Error fetching logs:', error));
  }, []);

  const logData = logs.map(log => ({
    mood: log.mood,
    anxiety: log.anxiety,
    sleep: log.sleep,
  }));

  const chartData = {
    labels: logs.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Mood',
        data: logData.map(data => data.mood),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Anxiety',
        data: logData.map(data => data.anxiety),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sleep',
        data: logData.map(data => data.sleep),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <div>
      <h1>Data Visualization</h1>
      <Line data={chartData} />
    </div>
  );
};

export default DataVisualization;
