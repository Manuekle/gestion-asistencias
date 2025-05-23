'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio de monitoreo como Sentry
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI personalizada para el error
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Algo salió mal
            </h2>
            <p className="text-gray-600 mb-4">
              Ha ocurrido un error inesperado.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
