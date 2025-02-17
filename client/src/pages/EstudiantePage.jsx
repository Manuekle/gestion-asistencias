import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../actions/userActions';
import { Button } from '@heroui/react';

function EstudiantePage() {
  const [formData, setFormData] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    navigate('/');
    await setTimeout(() => {
      dispatch(userLogout());
    }, 2000);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);
  return (
    <div className="w-full h-screen bg-[#FAFBFD] auth flex gap-8 flex-col justify-center items-center">
      <div className="bg-[#FAFBFD] p-4">
        <h1 className="text-6xl">
          Bienvenido <strong>{userInfo.user.user_nombre}!</strong>
        </h1>
      </div>
      <div>
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
