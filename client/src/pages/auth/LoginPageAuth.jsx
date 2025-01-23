/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router';
import { Input, Button } from '@heroui/react';
import { Mail01Icon, Passport01Icon } from 'hugeicons-react';

function LoginPageAuth() {
  return (
    <div className="flex justify-center items-center h-svh auth">
      <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-16 bg-[#1E201E] rounded-xl shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-zinc-100 sm:text-2xl dark:text-white">
          Iniciar Sesion
        </div>
        <span className="justify-center text-xs text-center text-zinc-300 flex-items-center dark:text-gray-400">
          No tienes una cuenta?
          <Link to="/auth/register" className="ml-2 text-amber-400 underline">
            Registrate
          </Link>
        </span>
        <div className="p-6 mt-2">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              size="md"
              type="email"
              placeholder="you@example.com"
              errorMessage="Please enter a valid email" // errorMessage
              // isInvalid
              startContent={
                <Mail01Icon size={18} color="#000" variant="stroke" />
              }
            />
            <Input
              size="md"
              type="password"
              placeholder="contrasena"
              errorMessage="Please enter a valid email" // errorMessage
              // isInvalid
              startContent={
                <Passport01Icon size={18} color="#000" variant="stroke" />
              }
            />

            <Button className="bg-amber-400 text-white shadow-lg">
              Iniciar Sesion
            </Button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageAuth;
