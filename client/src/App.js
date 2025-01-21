import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Using Routes instead of Switch
import GoogleLoginForm from './components/googleLoginForm';
import Dashboard from './components/dashboard';
import DailyLogForm from './components/dailyLogForm';
import DataVisualization from './components/dataVisualization';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/daily-log" element={<DailyLogForm />} />
        <Route path="/data-visualization" element={<DataVisualization />} />
      </Routes>
    </Router>
  );
};

export default App;
