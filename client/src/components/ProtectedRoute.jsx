import React from "react";
import { Navigate } from "react-router-dom"; // Solo importamos Navigate para la redirección

function ProtectedRoute({ role, allowedRoles, children }) {
  // Si el rol del usuario no está permitido, redirige a la página de acceso denegado o login
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // Si el rol es permitido, renderiza los componentes hijos (contenido de la ruta protegida)
  return children;
}

export default ProtectedRoute;
