// Servicio para monitorear el rendimiento de la aplicación

// Medir el tiempo de carga de la página
export const measurePageLoad = () => {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigationTiming = window.performance.timing;
  const pageLoadTime =
    navigationTiming.loadEventEnd - navigationTiming.navigationStart;

  return {
    pageLoadTime,
    domContentLoaded:
      navigationTiming.domContentLoadedEventEnd -
      navigationTiming.navigationStart,
    firstPaint: navigationTiming.responseEnd - navigationTiming.navigationStart,
    networkLatency:
      navigationTiming.responseEnd - navigationTiming.requestStart,
    redirectTime: navigationTiming.redirectEnd - navigationTiming.redirectStart,
    dnsLookupTime:
      navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
    tcpConnectionTime:
      navigationTiming.connectEnd - navigationTiming.connectStart,
    serverResponseTime:
      navigationTiming.responseEnd - navigationTiming.requestStart
  };
};

// Medir el tiempo de ejecución de una función
export const measureExecutionTime = (fn, ...args) => {
  const startTime = performance.now();
  const result = fn(...args);
  const endTime = performance.now();

  return {
    result,
    executionTime: endTime - startTime
  };
};

// Medir el tiempo de renderizado de un componente
export const createRenderTimingHook = () => {
  return (componentName) => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      console.log(
        `[Rendimiento] ${componentName} renderizado en ${endTime - startTime}ms`
      );
    };
  };
};

// Registrar métricas de rendimiento
export const logPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  // Obtener métricas de rendimiento
  const metrics = measurePageLoad();

  // Registrar en la consola
  console.log('[Métricas de Rendimiento]', metrics);

  // Aquí podrías enviar las métricas a un servicio de análisis
  // sendMetricsToAnalyticsService(metrics);
};

// Inicializar el monitoreo de rendimiento
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Registrar métricas cuando la página termine de cargar
  window.addEventListener('load', () => {
    // Esperar un momento para asegurarse de que todas las métricas estén disponibles
    setTimeout(logPerformanceMetrics, 0);
  });

  // Monitorear errores no capturados
  window.addEventListener('error', (event) => {
    console.error('[Error no capturado]', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });

    // Aquí podrías enviar el error a un servicio de monitoreo
    // sendErrorToMonitoringService(event);
  });
};
