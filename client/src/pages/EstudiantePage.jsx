import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../actions/userActions';
import { Button } from '@heroui/react';
import { Calendar03Icon } from 'hugeicons-react';

function EstudiantePage() {
  const [formData, setFormData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (!storedUserInfo) {
        navigate('/auth/estudiante/login', { replace: true });
        return;
      }

      const parsedUserInfo = JSON.parse(storedUserInfo);
      if (
        !parsedUserInfo.user ||
        parsedUserInfo.user.user_rol !== 'estudiante'
      ) {
        navigate('/auth/estudiante/login', { replace: true });
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const logoutHandler = () => {
    setFormData(true);
    dispatch(userLogout());
    localStorage.removeItem('userInfo');
    navigate('/auth/estudiante/login', { replace: true });
  };

  const goToCalendar = () => {
    navigate('/dashboard/schedule', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#FAFBFD] auth flex gap-8 flex-col justify-center items-center">
      <div className="bg-[#FAFBFD] p-4">
        <h1 className="text-6xl">
          Bienvenido <strong>{userInfo.user.user_nombre}!</strong>
        </h1>
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          size="sm"
          className="bg-blue-600 text-white rounded-lg px-6 py-2 text-xs font-bold shadow-sm hover:shadow-md flex items-center gap-2"
          onPress={goToCalendar}
        >
          <Calendar03Icon size={18} color="#ffffff" variant="stroke" />
          Ver Calendario
        </Button>
        {!formData ? (
          <Button
            type="button"
            size="sm"
            className="bg-zinc-900 text-white rounded-lg px-6 py-2 text-xs font-bold shadow-sm hover:shadow-md"
            onPress={logoutHandler}
          >
            Cerrar Sesion
          </Button>
        ) : (
          <Button
            isLoading
            size="sm"
            className="bg-zinc-900 text-white rounded-lg px-6 py-2 text-xs font-bold shadow-sm hover:shadow-md"
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            Cargando
          </Button>
        )}
      </div>
    </div>
  );
}

export default EstudiantePage;
