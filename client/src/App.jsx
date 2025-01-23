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
import LoginPageAuth from './pages/auth/LoginPageAuth';
import RegisterPageAuth from './pages/auth/RegisterPageAuth';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/login" element={<LoginPageAuth />} />
          <Route path="/auth/register" element={<RegisterPageAuth />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
