import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import DailyForm from '../components/DailyForm';
import PrivateRoute from "./privateRoute";
import Dashboard from "../components/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route
        path="/daily_logs" element={
          <PrivateRoute>
            <DailyForm />
          </PrivateRoute> } />
      <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;