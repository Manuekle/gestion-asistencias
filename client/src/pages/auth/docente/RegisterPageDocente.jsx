/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Select, SelectItem } from '@heroui/react';
import {
  Mail01Icon,
  Passport01Icon,
  UserSharingIcon,
  MentoringIcon
} from 'hugeicons-react';
import { useToast } from '../../../hooks/use-toast.ts';

import { docenteRegister } from '../../../actions/docenteActions';

function RegisterPageDocente() {
  const [formData, setFormData] = useState(false);

  const dispatch = useDispatch();

  const { toast } = useToast();

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [status, setStatus] = useState(false);

  // regex
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const validatePassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  const isInvalidEmail = React.useMemo(() => {
    if (email === '') return false;

    return !validateEmail(email);
  }, [email]);

  const isInvalidPassword = React.useMemo(() => {
    if (password === '') return false;

    return !validatePassword(password);
  }, [password]);

  const alert = (data) => {
    if (data.status === 404) {
      toast({
        variant: 'destructive',
        title: 'Oh oh! Algo salio mal',
        description: error.message
      });
    }
  };

  const handleSubmit = async () => {
    setFormData(true);
    dispatch(docenteRegister(user, email, password, role, status));
    await setTimeout(() => {
      setFormData(false);
      alert(error);
    }, 2000);
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      navigate('/dashboard/home');
    } else {
      null;
    }
  }, [dispatch, userInfo]);

  return (
    <div className="flex justify-center items-center h-svh auth">
      <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-16 bg-[#1E201E] rounded-xl shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-zinc-100 sm:text-2xl dark:text-white">
          Crear Cuenta
        </div>
        <span className="justify-center text-xs text-center text-zinc-300 flex-items-center dark:text-gray-400">
          Ya tienes una cuenta?
          <Link
            to="/auth/docente/login"
            className="ml-2 text-amber-400 underline"
          >
            Inicia sesion
          </Link>
        </span>
        <div className="p-6 mt-2">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              size="md"
              placeholder="nombre de usuario"
              // errorMessage="Por favor ingrese un email valido"
              // isInvalid={isInvalidEmail}
              value={user}
              onValueChange={setUser}
              startContent={
                <UserSharingIcon size={18} color="#000" variant="stroke" />
              }
            />
            <Input
              size="md"
              type="email"
              placeholder="you@example.com"
              errorMessage="Por favor ingrese un email valido"
              isInvalid={isInvalidEmail}
              value={email}
              onValueChange={setEmail}
              startContent={
                <Mail01Icon size={18} color="#000" variant="stroke" />
              }
            />
            <Input
              size="md"
              type="password"
              placeholder="contraseña"
              errorMessage="Por favor ingrese una contraseña valida"
              isInvalid={isInvalidPassword}
              value={password}
              onValueChange={setPassword}
              startContent={
                <Passport01Icon size={18} color="#000" variant="stroke" />
              }
            />

            <Select
              size="sm"
              startContent={
                <MentoringIcon size={18} color="#000" variant="stroke" />
              }
              label="Seleccione el rol"
              variant="solid"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="max-w-full"
            >
              <SelectItem key="docente">Docente</SelectItem>
            </Select>
            {!formData ? (
              <Button
                onPress={handleSubmit}
                className="bg-amber-400 text-white shadow-lg"
              >
                Registrarse
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageDocente;
