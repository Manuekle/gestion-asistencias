'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para implementar debounce en valores
 * @param {any} value El valor que se quiere debounce
 * @param {number} delay El tiempo de espera en milisegundos
 * @returns {any} El valor con debounce aplicado
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Actualizar el valor debounced después del tiempo de espera
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancelar el timeout si el valor cambia (o el componente se desmonta)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
