/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import React from 'react';
// Supports weights 100-900
import '@fontsource-variable/manrope';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import Dashboard from './layout/Dashboard';
import Attendance from './layout/Attendance';
import LoginPageAuth from './pages/auth/administrador/LoginPageAuth';
import RegisterPageAuth from './pages/auth/administrador/RegisterPageAuth';
import RestorePasswordPageAuth from './pages/auth/administrador/RestorePasswordPageAuth';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from './components/ui/toaster.tsx';

function App() {
  return (
    <div className="">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/administrador/login" element={<LoginPageAuth />} />
          <Route
            path="/auth/administrador/register"
            element={<RegisterPageAuth />}
          />
          <Route
            path="/auth/administrador/forgot-password"
            element={<RestorePasswordPageAuth />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
