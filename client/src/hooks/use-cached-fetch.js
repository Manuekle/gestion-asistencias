'use client';

import { useState, useEffect } from 'react';
import { useCache } from './use-cache';

export function useCachedFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cache = useCache({
    expirationTime: options.cacheTime || 5 * 60 * 1000
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Intentar obtener del caché primero
        const cachedData = cache.get(url);

        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        // Si no está en caché, hacer la petición
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();

        // Guardar en caché y actualizar estado
        cache.set(url, result);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
