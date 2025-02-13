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
// admin
import LoginPageAuth from './pages/auth/administrador/LoginPageAuth';
import RegisterPageAuth from './pages/auth/administrador/RegisterPageAuth';
// estudiante
import LoginPageEstudiante from './pages/auth/estudiante/LoginPageAuth';
import RegisterPageEstudiante from './pages/auth/estudiante/RegisterPageAuth';
// docente
import LoginPageDocente from './pages/auth/docente/LoginPageAuth';
import RegisterPageDocente from './pages/auth/docente/RegisterPageAuth';
import RestorePasswordPageAuth from './pages/auth/RestorePasswordPageAuth';
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
          {/* admin */}
          <Route path="/auth/administrador/login" element={<LoginPageAuth />} />
          <Route
            path="/auth/administrador/register"
            element={<RegisterPageAuth />}
          />
          <Route
            path="/auth/administrador/forgot-password"
            element={<RestorePasswordPageAuth />}
          />
          {/* estudiante */}
          <Route
            path="/auth/estudiante/login"
            element={<LoginPageEstudiante />}
          />
          <Route
            path="/auth/estudiante/register"
            element={<RegisterPageEstudiante />}
          />
          {/* docente */}
          <Route path="/auth/docente/login" element={<LoginPageDocente />} />
          <Route
            path="/auth/docente/register"
            element={<RegisterPageDocente />}
          />
          {/* recover */}
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
