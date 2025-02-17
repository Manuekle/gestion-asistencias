/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../hooks/use-toast.ts';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button
} from '@heroui/react';

import { showClassQr } from '../actions/classActions';
import { createAttendance } from '../actions/attendanceActions';

function Attendance() {
  const [formData, setFormData] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  const dispatch = useDispatch();

  // const location = useLocation();

  const classQr = useSelector((state) => state.classQr);
  const { codigo } = classQr;

  const attendanceCreate = useSelector((state) => state.attendanceCreate);
  const { error, success } = attendanceCreate;

  console.log(error);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // regex
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const validatePassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  const isInvalidEmail = React.useMemo(() => {
    if (user === '') return false;

    return !validateEmail(user);
  }, [user]);

  const isInvalidPassword = React.useMemo(() => {
    if (password === '') return false;

    return !validatePassword(password);
  }, [password]);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'ID no encontrado';
  const token = searchParams.get('token') || 'Token no encontrado';

  const { toast } = useToast();

  const navigate = useNavigate();

  const alertSuccess = () => {
    if (success) {
      toast({
        variant: 'default',
        title: 'Exito!',
        description: `Has entrado a tu clase de ${codigo.asig_nombre}`
      });
      navigate('/dashboard/schedule');
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh oh! Algo salio mal',
        description: error.message
      });
    }
  };

  const handleSubmit = () => {
    setFormData(true);
    dispatch(
      createAttendance(
        userInfo.user.user_id,
        codigo.clas_id,
        window.location.href
      )
    );
    setTimeout(() => {
      setFormData(false);
    }, 2000);
    alertSuccess();
  };

  useEffect(() => {
    if (codigo) {
      navigate('/student');
    }

    if (userInfo) {
      onOpen(true);
    } else {
      onOpen(false);
    }

    if (id && token) {
      dispatch(showClassQr(id));
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div className="flex justify-center items-center h-svh auth">
        <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-16 bg-[#1E201E] rounded-xl shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-2 text-xl font-light text-zinc-100 sm:text-2xl">
            Confirmar Asistencia
          </div>
          <span className="flex items-center justify-center px-6 py-4">
            <p className="text-wrap text-xs text-zinc-300">
              ¿Hola <strong>{userInfo && userInfo.user.user_nombre}</strong> vas
              a la clase de{' '}
              <strong>
                {codigo.asig_nombre}-{codigo.asig_grupo}
              </strong>
              ? ¡Confirma tu presencia!
            </p>
          </span>
          <div className="p-6">
            <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
              {!formData ? (
                <Button
                  onPress={handleSubmit}
                  size="lg"
                  className="bg-amber-400 text-white shadow-lg text-sm"
                >
                  Confirmar
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop: 'bg-black bg-opacity-70',
          modal: 'bg-white rounded-lg shadow-lg w-96 p-6'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-zinc-800">
                <h1 className="font-bold text-base">
                  Para confirmar asistencia, inicie sesion
                </h1>
              </ModalHeader>
              <ModalBody>
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
                  <Input
                    size="md"
                    type="password"
                    placeholder="contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    errorMessage="Por favor ingrese una contraseña valida"
                    isInvalid={isInvalidPassword}
                    value={password}
                    onValueChange={setPassword}
                    startContent={
                      <Passport01Icon size={18} color="#000" variant="stroke" />
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                {!formData ? (
                  <Button
                    onPress={handleCancel}
                    className="bg-amber-400 text-white text-xs rounded-lg font-bold px-4 py-2"
                  >
                    Iniciar Sesion
                  </Button>
                ) : (
                  <Button
                    isLoading
                    className="bg-amber-400 text-white text-xs rounded-lg font-bold px-4 py-2"
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Attendance;
