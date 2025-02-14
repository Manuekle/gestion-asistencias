/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from '@heroui/react';
import { Mail01Icon } from 'hugeicons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../hooks/use-toast.ts';
import { userRecoverPassword } from '../../actions/userActions';

function RestorePasswordPageAuth() {
  const [formData, setFormData] = useState(false);

  const dispatch = useDispatch();

  const { toast } = useToast();

  const navigate = useNavigate();

  const [user, setUser] = useState('');

  const userRecover = useSelector((state) => state.userRecover);
  const { error } = userRecover;

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (user === '') return false;

    return !validateEmail(user);
  }, [user]);

  const alertSuccess = () => {
    if (!error) {
      toast({
        variant: 'default',
        title: 'Exito!',
        description:
          'Se ha enviado un correo electronico con tu contraseña nueva'
      });
      // navigate('/auth/administrador/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh oh! Algo salio mal',
        description: error
      });
    }
  };

  const handleSubmit = () => {
    setFormData(true);
    dispatch(userRecoverPassword(user));
    setTimeout(() => {
      setFormData(false);
    }, 2000);
    alertSuccess();
  };
  return (
    <div className="flex justify-center items-center h-svh auth">
      <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-16 bg-[#1E201E] rounded-xl shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-zinc-100 sm:text-2xl">
          Restablecer Contraseña
        </div>
        {/* <span className="justify-center text-xs text-center text-zinc-300 flex items-center ">
          No tienes una cuenta?
          <Link to="/auth/administrador/register" className="ml-2 text-amber-400 underline">
            Registrate
          </Link>
        </span> */}
        <p className="px-6 py-4 text-pretty flex items-center justify-center text-xs text-zinc-300">
          Olvidaste tu contraseña? No te preocupes, ingresa tu correo
          electronico. Te enviaremos una nueva contraseña.
        </p>
        <div className="p-6">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              size="md"
              type="email"
              // color={isInvalid ? 'danger' : 'success'}
              onChange={(e) => setUser(e.target.value)}
              placeholder="you@example.com"
              errorMessage="Por favor ingrese un email valido"
              isInvalid={isInvalidEmail}
              value={user}
              onValueChange={setUser}
              startContent={
                <Mail01Icon size={18} color="#000" variant="stroke" />
              }
            />

            {!formData ? (
              <Button
                onPress={handleSubmit}
                className="bg-amber-400 text-white shadow-lg"
              >
                Restablecer
              </Button>
            ) : (
              <Button
                isLoading
                className="bg-amber-400 text-white shadow-lg"
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
            <div className="flex text-xs w-full justify-center items-center">
              <h1 className="text-zinc-300">No tienes una cuenta?</h1>
              <Link
                to="/auth/administrador/register"
                className="underline ml-2 text-amber-400"
              >
                Registrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestorePasswordPageAuth;
