import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role, allowedRoles }) {
  console.log(role);
  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === 'estudiante') {
      return <Navigate to="/student" replace />;
    } else if (role === 'docente' || role === 'administrador') {
      return <Navigate to="/dashboard/home" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
