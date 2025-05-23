import React, { lazy, Suspense } from 'react';
// Supports weights 100-900
import '@fontsource-variable/manrope';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Dashboard = lazy(() => import('./layout/Dashboard'));
const StudentLayout = lazy(() => import('./layout/StudentLayout'));
const Attendance = lazy(() => import('./layout/Attendance'));
// admin
const LoginPageAdmin = lazy(() =>
  import('./pages/auth/administrador/LoginPageAdmin')
);
const RegisterPageAdmin = lazy(() =>
  import('./pages/auth/administrador/RegisterPageAdmin.jsx')
);
// estudiante
const LoginPageEstudiante = lazy(() =>
  import('./pages/auth/estudiante/LoginPageEstudiante.jsx')
);
const RegisterPageEstudiante = lazy(() =>
  import('./pages/auth/estudiante/RegisterPageEstudiante.jsx')
);
const EstudiantePage = lazy(() => import('./pages/EstudiantePage.jsx'));
// docente
const LoginPageDocente = lazy(() =>
  import('./pages/auth/docente/LoginPageDocente.jsx')
);
const RegisterPageDocente = lazy(() =>
  import('./pages/auth/docente/RegisterPageDocente.jsx')
);
const RestorePasswordPageAuth = lazy(() =>
  import('./pages/auth/RestorePasswordPageAuth')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { Toaster } from './components/ui/toaster.tsx';

function App() {
  return (
    <div className="">
      <Toaster />
      <Router>
        <Suspense fallback={<div>Cargando...</div>}>
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
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
