/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  GlassesIcon,
  Mortarboard02Icon,
  QrCodeIcon,
  Timer02Icon,
  UserGroupIcon
} from 'hugeicons-react';
import { Button } from '@heroui/react';
import SvgQr from '../components/svg/SvgQr';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HomePage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  return (
    <div className="w-full bg-[#FAFBFD] auth">
      <Navbar />
      <section className="w-full flex flex-col gap-10 justify-center items-center pt-10 pb-32">
        <span className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-bold text-zinc-600 bg-[#FAFBFD] px-5">
            <strong className="text-zinc-800">Bienvenido a</strong> edu
            <strong className="text-amber-400">Track</strong>
          </h1>
          <p className="text-zinc-800 text-sm tracking-wide text-center py-2 bg-[#FAFBFD] px-8">
            Simplifica el registro de asistencia con tecnología QR.
            <br /> Diseñado para instituciones educativas modernas.
          </p>
        </span>
        <span className="flex flex-row gap-8 items-center justify-center">
          <button
            type="button"
            className="bg-zinc-800 flex flex-row items-center justify-center gap-2 text-white text-sm rounded-lg hover:shadow-lg shadow-md px-6 py-2"
          >
            <GlassesIcon size={18} color="#eee" variant="stroke" />
            Iniciar sesion como docente
          </button>
          <button
            type="button"
            className="bg-zinc-50 flex flex-row items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg hover:shadow-lg shadow-md px-6 py-2"
          >
            <Mortarboard02Icon size={18} color="#000" variant="stroke" />
            Iniciar sesion como estudiante
          </button>
        </span>
      </section>
      <section className="w-full flex flex-col gap-10 justify-center items-center pt-10 pb-32">
        <span className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-bold text-zinc-800 bg-[#FAFBFD] px-5">
            Características Principales
          </h1>
          <p className="text-zinc-800 text-sm tracking-wide text-center py-2 bg-[#FAFBFD] px-8">
            Todo lo que necesitas para una gestión de asistencia eficiente
          </p>
        </span>
        <span className="flex flex-row gap-8 items-center justify-center">
          <div className="w-80 h-48 border bg-zinc-50 flex flex-col items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg shadow-md px-6 py-6">
            <span className="border p-2 rounded-full">
              <QrCodeIcon size={18} color="#000" variant="stroke" />
            </span>
            <h1 className="font-bold text-sm">Registro con QR</h1>
            <text className="text-zinc-500 text-center">
              Escanea y registra asistencia en segundos con códigos QR dinámicos
            </text>
          </div>
          <div className="w-80 h-48 border bg-zinc-50 flex flex-col items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg shadow-md px-6 py-6">
            <span className="border p-2 rounded-full">
              <Timer02Icon size={18} color="#000" variant="stroke" />
            </span>
            <h1 className="font-bold text-sm">Reportes en Tiempo Real</h1>
            <text className="text-zinc-500 text-center">
              Visualiza y analiza los datos de asistencia al instante
            </text>
          </div>
          <div className="w-80 h-48 border bg-zinc-50 flex flex-col items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg shadow-md px-6 py-6">
            <span className="border p-2 rounded-full">
              <UserGroupIcon size={18} color="#000" variant="stroke" />
            </span>
            <h1 className="font-bold text-sm">Gestión de Grupos</h1>
            <text className="text-zinc-500 text-center">
              Administra múltiples clases y grupos de estudiantes fácilmente
            </text>
          </div>
        </span>
      </section>
      <section className="bg-zinc-900 px-48 flex flex-row items-center py-32">
        <span className="w-full">
          <h1 className="text-white font-bold text-4xl">Cómo Funciona</h1>
          <p className="text-zinc-300 text-sm">
            Un proceso simple y eficiente para el registro de asistencia
          </p>
          <div className="space-y-6 my-4">
            {[
              {
                title: 'Genera el código QR',
                description:
                  'El docente genera un código QR único para la clase'
              },
              {
                title: 'Estudiantes escanean',
                description:
                  'Los estudiantes escanean el código con sus dispositivos'
              },
              {
                title: 'Registro automático',
                description:
                  'La asistencia se registra instantáneamente en el sistema'
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full font-bold bg-amber-400 text-white flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">{step.title}</h3>
                  <p className="text-zinc-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </span>
        {/* <span className="flex justify-center items-center w-full">
          <Image
            isBlurred
            isZoomed
            alt="Qr animation"
            src={LandindGif}
            width={240}
          />
        </span> */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-zinc-100 rounded-2xl transform rotate-6" />
          <div className="relative bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-full flex justify-center">
              <SvgQr />
            </div>
            <div className="p-4 w-full flex flex-col gap-2 bg-zinc-900 rounded-lg">
              <div className="w-full flex flex-col py-4">
                <h1 className="self-center text-sm font-bold text-zinc-100">
                  Confirmar Asistencia
                </h1>
                <span className="flex items-center justify-center px-6">
                  <p className="text-center text-xs text-zinc-300">
                    ¿Vas a la clase de{' '}
                    <strong>Inteligencia Artificial - G1</strong> ¡Confirma tu
                    presencia!
                  </p>
                </span>
              </div>
              <Button
                size="md"
                className="bg-amber-400 text-white shadow-lg text-xs w-full"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="h-96 px-48 py-32">a</section> */}
      <Footer />
    </div>
  );
}

export default HomePage;
