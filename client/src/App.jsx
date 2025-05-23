import React from 'react';
// Supports weights 100-900
import '@fontsource-variable/manrope';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import Dashboard from './layout/Dashboard';
import StudentLayout from './layout/StudentLayout';
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
          {/* Ruta pública */}
          <Route path="/" element={<HomePage />} />

          {/* Rutas de dashboard */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          {/* Rutas de estudiante */}
          <Route path="/student/*" element={<StudentLayout />} />

          {/* Rutas de autenticación */}
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
          <Route
            path="/auth/docente/forgot-password"
            element={<RestorePasswordPageAuth />}
          />

          {/* Ruta para asistencia */}
          <Route path="/attendance" element={<Attendance />} />

          {/* Ruta 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
