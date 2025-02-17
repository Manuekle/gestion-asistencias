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
import LoginPageAdmin from './pages/auth/administrador/LoginPageAdmin';
import RegisterPageAdmin from './pages/auth/administrador/RegisterPageAdmin.jsx';
// estudiante
import LoginPageEstudiante from './pages/auth/estudiante/LoginPageEstudiante.jsx';
import RegisterPageEstudiante from './pages/auth/estudiante/RegisterPageEstudiante.jsx';
import EstudiantePage from './pages/EstudiantePage.jsx';
// docente
import LoginPageDocente from './pages/auth/docente/LoginPageDocente.jsx';
import RegisterPageDocente from './pages/auth/docente/RegisterPageDocente.jsx';
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
          <Route path="/student" element={<EstudiantePage />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* admin */}
          <Route
            path="/auth/administrador/login"
            element={<LoginPageAdmin />}
          />
          <Route
            path="/auth/administrador/register"
            element={<RegisterPageAdmin />}
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
          <Route
            path="/auth/estudiante/forgot-password"
            element={<RestorePasswordPageAuth />}
          />
          {/* docente */}
          <Route path="/auth/docente/login" element={<LoginPageDocente />} />
          <Route
            path="/auth/docente/register"
            element={<RegisterPageDocente />}
          />
          {/* recover */}
          <Route
            path="/auth/docente/forgot-password"
            element={<RestorePasswordPageAuth />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
