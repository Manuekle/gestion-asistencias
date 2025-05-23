export function useCache(options = {}) {
  const { expirationTime = 5 * 60 * 1000 } = options; // 5 minutos por defecto

  // Caché en memoria
  const cache = new Map();

  const get = (key) => {
    if (!cache.has(key)) return null;

    const item = cache.get(key);

    // Verificar si el item ha expirado
    if (Date.now() - item.timestamp > expirationTime) {
      cache.delete(key);
      return null;
    }

    return item.data;
  };

  const set = (key, data) => {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  };

  const remove = (key) => {
    cache.delete(key);
  };

  const clear = () => {
    cache.clear();
  };

  return {
    get,
    set,
    remove,
    clear
  };
}
