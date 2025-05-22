import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bell01Icon, Delete02Icon } from 'hugeicons-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      fetchNotifications();
    }
  }, [userInfo]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${dev}/notificaciones/${userInfo.user.user_id}`
      );
      setNotifications(data);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notifId) => {
    try {
      await axios.put(`${dev}/notificaciones/marcar-leida/${notifId}`);
      setNotifications(
        notifications.map((notif) =>
          notif.notif_id === notifId ? { ...notif, leido: true } : notif
        )
      );
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(
        `${dev}/notificaciones/limpiar/${userInfo.user.user_id}`
      );
      setNotifications([]);
    } catch (error) {
      console.error('Error al limpiar notificaciones:', error);
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.leido).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <Bell01Icon size={20} color="#52525B" variant="stroke" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-sm">Notificaciones</h3>
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
            >
              <Delete02Icon size={14} color="#52525B" variant="stroke" />
              Limpiar
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-sm text-gray-500">
                Cargando...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No tienes notificaciones
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.notif_id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notif.leido ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notif.notif_id)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notif.titulo}</h4>
                    <span className="text-xs text-gray-500">
                      {format(new Date(notif.fecha_creacion), 'PPp', {
                        locale: es
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notif.mensaje}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
