import React from 'react';

// Componente de carga con diferentes variantes
const LoadingSpinner = ({
  size = 'medium',
  color = 'blue',
  fullScreen = false,
  text = 'Cargando...'
}) => {
  // Determinar el tamaño del spinner
  const spinnerSizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  // Determinar el color del spinner
  const spinnerColors = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    gray: 'border-gray-500'
  };

  const spinnerSize = spinnerSizes[size] || spinnerSizes.medium;
  const spinnerColor = spinnerColors[color] || spinnerColors.blue;

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full ${spinnerSize} border-t-2 border-b-2 ${spinnerColor}`}
      ></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );

  // Si es pantalla completa, centrar en la pantalla
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  // De lo contrario, renderizar normalmente
  return spinner;
};

export default React.memo(LoadingSpinner);
