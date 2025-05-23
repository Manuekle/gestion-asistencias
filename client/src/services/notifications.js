'use client';

import { useToast } from '../hooks/use-toast';

// Tipos de notificaciones
export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Servicio de notificaciones
export const NotificationService = {
  // Referencia al toast
  toast: null,

  // Inicializar el servicio
  init(toast) {
    this.toast = toast;
  },

  // Mostrar notificación
  show(title, message, type = NotificationType.INFO, duration = 5000) {
    if (!this.toast) {
      console.error(
        'NotificationService no inicializado. Llama a init() primero.'
      );
      return;
    }

    const variant =
      type === NotificationType.SUCCESS
        ? 'default'
        : type === NotificationType.ERROR
        ? 'destructive'
        : 'default';

    this.toast({
      variant,
      title,
      description: message,
      duration
    });
  },

  // Métodos de conveniencia
  success(title, message, duration) {
    this.show(title, message, NotificationType.SUCCESS, duration);
  },

  error(title, message, duration) {
    this.show(title, message, NotificationType.ERROR, duration);
  },

  warning(title, message, duration) {
    this.show(title, message, NotificationType.WARNING, duration);
  },

  info(title, message, duration) {
    this.show(title, message, NotificationType.INFO, duration);
  }
};

// Hook para usar el servicio de notificaciones
export const useNotifications = () => {
  const toast = useToast();

  // Inicializar el servicio si no está inicializado
  if (!NotificationService.toast) {
    NotificationService.init(toast);
  }

  return NotificationService;
};
