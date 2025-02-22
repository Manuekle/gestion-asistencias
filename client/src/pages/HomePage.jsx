/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  GlassesIcon,
  Mortarboard02Icon,
  QrCodeIcon,
  Timer02Icon,
  UserGroupIcon,
  GraduationScrollIcon,
  GithubIcon,
  Knowledge01Icon
} from 'hugeicons-react';
import { Button } from '@heroui/react';
import { Image } from '@heroui/image';
import FUP from '../../public/fup.jpg';
import SvgQr from '../components/svg/SvgQr';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// icons
import SvgNode from '../components/svg/SvgNode';
import SvgReact from '../components/svg/SvgReact';
import SvgTailwind from '../components/svg/SvgTailwind';
import SvgTurso from '../components/svg/SvgTurso';

function HomePage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {}, [navigate, userInfo]);

  return (
    <div className="w-full bg-[#FAFBFD] auth">
      <Navbar />
      <section className="w-full flex flex-col gap-10 justify-center items-center pt-10 pb-32">
        <span className="flex flex-col items-center gap-2">
          <h1 className="text-5xl md:text-6xl text-center font-bold text-zinc-600 bg-[#FAFBFD] px-5">
            <strong className="text-zinc-800">Bienvenido a</strong> edu
            <strong className="text-amber-400">Track</strong>
          </h1>
          <p className="text-zinc-800 text-xs md:text-sm tracking-wide text-center py-2 bg-[#FAFBFD] px-8">
            Simplifica el registro de asistencia con tecnología QR.
            <br /> Diseñado para instituciones educativas modernas.
          </p>
        </span>
        <span className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
          <Link
            to="/auth/docente/login"
            className="bg-zinc-800 flex flex-row items-center justify-center gap-2 text-white text-sm rounded-lg hover:shadow-lg shadow-md px-6 py-2"
          >
            <Knowledge01Icon size={18} color="#eee" variant="stroke" />
            <h1 className="text-white text-sm">Iniciar sesion como docente</h1>
          </Link>
          <Link
            to="/auth/estudiante/login"
            className="bg-zinc-50 flex flex-row items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg hover:shadow-lg shadow-md px-6 py-2"
          >
            <Mortarboard02Icon size={18} color="#000" variant="stroke" />
            <h1 className="text-zinc-800 text-sm">
              Iniciar sesion como estudiante
            </h1>
          </Link>
        </span>
      </section>
      <section className="w-full flex flex-col gap-10 justify-center items-center pt-2 md:pt-10 pb-12 md:pb-32">
        <span className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-6xl text-center font-bold text-zinc-800 bg-[#FAFBFD] px-5">
            Características Principales
          </h1>
          <p className="text-zinc-800 text-sm tracking-wide text-center py-2 bg-[#FAFBFD] px-8">
            Todo lo que necesitas para una gestión de asistencia eficiente
          </p>
        </span>
        <span className="px-2 md:px-20 xl:px-48 2xl:px-64 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center w-full">
          <div className="col-span-1 w-80 h-48 border bg-zinc-50 flex flex-col items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg shadow-md px-6 py-6">
            <span className="border p-2 rounded-full">
              <QrCodeIcon size={18} color="#000" variant="stroke" />
            </span>
            <h1 className="font-bold text-sm">Registro con QR</h1>
            <text className="text-zinc-500 text-center">
              Escanea y registra asistencia en segundos con códigos QR dinámicos
            </text>
          </div>
          <div className="col-span-1 w-80 h-48 border bg-zinc-50 flex flex-col items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg shadow-md px-6 py-6">
            <span className="border p-2 rounded-full">
              <Timer02Icon size={18} color="#000" variant="stroke" />
            </span>
            <h1 className="font-bold text-sm">Reportes en Tiempo Real</h1>
            <text className="text-zinc-500 text-center">
              Visualiza y analiza los datos de asistencia al instante
            </text>
          </div>
          <div className="md:col-span-2 md:justify-self-center xl:col-span-1 xl:justify-self-auto w-80 h-48 border bg-zinc-50 flex flex-col items-center justify-center gap-2 text-zinc-800 text-sm rounded-lg shadow-md px-6 py-6">
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
      <section className="bg-zinc-900 px-8 md:px-20 lg:px-40 xl:px-48 flex flex-col lg:flex-row justify-center items-center gap-16 xl:gap-0 py-20 md:py-32">
        <span className="w-full">
          <h1 className="text-white font-bold text-2xl md:text-4xl">
            Cómo Funciona
          </h1>
          <p className="text-zinc-300 text-xs md:text-sm">
            Un proceso simple y eficiente para el registro de asistencia
          </p>
          <div className="space-y-6 my-8 md:my-4">
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
                <div className="md:w-8 w-6 md:h-8 h-6 text-xs md:text-sm rounded-full font-bold bg-amber-400 text-white flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-xs md:text-sm">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </span>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-zinc-100 rounded-2xl transform rotate-6" />
          <div className="relative bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-full flex justify-center py-8">
              <SvgQr className="w-32 h-32 md:w-56 md:h-56" />
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
      <section className="px-8 md:px-20 xl:px-48 py-32">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-2 md:space-y-2 xl:space-y-8">
            <h1 className="text-zinc-900 font-bold text-4xl md:text-5xl xl:text-6xl">
              El Proyecto
            </h1>
            <span className="flex flex-col gap-2 py-4 bg-[#FAFBFD]">
              <p className="text-sm md:text-md text-wrap">
                <strong className="text-gray-500">edu</strong>
                <strong className="text-amber-400">Track</strong> nació como un
                proyecto universitario en la Fundacion Universitaria de Popayan
                , con el objetivo de modernizar y simplificar el proceso de
                registro de asistencia en entornos educativos. Nuestra visión es
                transformar la manera en que se gestiona la asistencia,
                haciéndola más eficiente y confiable.
              </p>
              <p className="text-sm md:text-md text-wrap">
                Este proyecto fue desarrollado como parte de nuestro trabajo de
                grado, buscando resolver problemas reales en la educación
                mediante el uso de tecnologías modernas. La implementación de
                códigos QR no solo agiliza el proceso, sino que también
                proporciona datos precisos para el seguimiento académico.
              </p>
            </span>
            <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                  <GraduationScrollIcon
                    size={18}
                    color="#000"
                    variant="stroke"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Proyecto de Grado</h4>
                  <p className="text-sm text-zinc-500">
                    Fundacion Universitaria de Popayan - 2025
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                  <UserGroupIcon size={18} color="#000" variant="stroke" />
                </div>
                <div>
                  <h4 className="font-semibold">Impacto Esperado</h4>
                  <p className="text-sm text-zinc-500">
                    +50 docentes beneficiados
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-zinc-100 rounded-2xl transform rotate-3" />
            <Image isZoomed isBlurred alt="Sede San Jose" src={FUP} />
          </div>
        </div>
      </section>
      {/* responsive 👌 */}
      <section className="bg-zinc-900 w-full flex flex-col gap-10 justify-center items-center py-20 xl:py-32">
        <span className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-5">
            Nuestro Equipo
          </h1>
          <p className="text-zinc-300 text-xs md:text-sm tracking-wide text-center py-2 px-8">
            Conoce a los estudiantes y docentes detrás de{' '}
            <strong className="text-gray-300">edu</strong>
            <strong className="text-amber-400">Track</strong>
          </p>
        </span>
        <span className="flex flex-col md:flex-row gap-12 md:gap-32 items-center justify-center py-10 xl:px-0">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-lg pb-6 md:pb-12 text-left w-full font-bold">
              Estudiantes
            </h1>
            <span className="flex flex-col gap-8">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="md:w-20 w-10 h-10 md:h-20 overflow-hidden rounded-full bg-gray-800">
                  <Image
                    isBlurred
                    alt="Sede San Jose"
                    src="https://avatars.githubusercontent.com/u/30373425?v=4"
                  />
                </div>
                <div>
                  <h4 className="text-md md:text-lg font-semibold text-white">
                    Manuel Esteban Erazo Medina
                  </h4>
                  <p className="text-zinc-300 font-bold text-xs md:text-sm">
                    Desarrollador Principal
                  </p>
                  <p className="text-xs text-zinc-300">
                    Ingenieria de Sistemas
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="md:w-20 w-10 h-10 md:h-20 overflow-hidden rounded-full bg-gray-800">
                  <Image
                    isBlurred
                    alt="Sede San Jose"
                    src="https://avatars.githubusercontent.com/u/30373425?v=4"
                  />
                </div>
                <div>
                  <h4 className="text-md md:text-lg font-semibold text-white">
                    Manuel Esteban Erazo Medina
                  </h4>
                  <p className="text-zinc-300 font-bold text-xs md:text-sm">
                    Desarrollador Principal
                  </p>
                  <p className="text-xs text-zinc-300">
                    Ingenieria de Sistemas
                  </p>
                </div>
              </div>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-lg pb-6 md:pb-12 text-right w-full font-bold">
              Docentes
            </h1>
            <span className="flex flex-col gap-8">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div>
                  <h4 className="text-md md:text-lg text-right font-semibold text-white">
                    Manuel Esteban Erazo Medina
                  </h4>
                  <p className="text-zinc-300 text-right font-bold text-xs md:text-sm">
                    Director del Proyecto
                  </p>
                  <p className="text-xs text-right text-zinc-300">
                    Ingenieria de Sistemas
                  </p>
                </div>
                <div className="md:w-20 w-10 h-10 md:h-20 overflow-hidden rounded-full bg-gray-800">
                  <Image
                    isBlurred
                    alt="Sede San Jose"
                    src="https://avatars.githubusercontent.com/u/30373425?v=4"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <div>
                  <h4 className="text-md md:text-lg text-right font-semibold text-white">
                    Manuel Esteban Erazo Medina
                  </h4>
                  <p className="text-zinc-300 text-right font-bold text-xs md:text-sm">
                    Director del Proyecto
                  </p>
                  <p className="text-xs text-right text-zinc-300">
                    Ingenieria de Sistemas
                  </p>
                </div>
                <div className="md:w-20 w-10 h-10 md:h-20 overflow-hidden rounded-full bg-gray-800">
                  <Image
                    isBlurred
                    alt="Sede San Jose"
                    src="https://avatars.githubusercontent.com/u/30373425?v=4"
                  />
                </div>
              </div>
            </span>
          </div>
        </span>
      </section>
      <section className="px-20 md:px-48 py-32">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-zinc-800 bg-[#FAFBFD] px-5">
            Stack Tecnologico
          </h1>
          <p className="text-zinc-800 text-xs md:text-sm tracking-wide text-center py-2 bg-[#FAFBFD]">
            Un stack pensado para eficiencia, seguridad y una mejor experiencia
            de usuario
          </p>
        </div>
        <div className="flex justify-center flex-row gap-6 md:gap-12 py-6">
          <div className="flex flex-col gap-1 justify-center items-center">
            <button
              type="button"
              className="border bg-white shadow-md p-3 rounded-full"
            >
              <SvgNode className="w-6 h-6" />
            </button>
            <h1 className="text-zinc-800 font-bold text-sm bg-[#FAFBFD]">
              nodejs
            </h1>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <button
              type="button"
              className="border bg-white shadow-md p-3 rounded-full"
            >
              <SvgReact className="w-6 h-6" />
            </button>
            <h1 className="text-zinc-800 font-bold text-sm bg-[#FAFBFD]">
              reactjs
            </h1>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <button
              type="button"
              className="border bg-white shadow-md p-3 rounded-full"
            >
              <SvgTailwind className="w-6 h-6" />
            </button>
            <h1 className="text-zinc-800 font-bold text-sm bg-[#FAFBFD]">
              tailwindcss
            </h1>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <button
              type="button"
              className="border bg-white shadow-md p-3 rounded-full"
            >
              <SvgTurso className="w-6 h-6" />
            </button>
            <h1 className="text-zinc-800 font-bold text-sm bg-[#FAFBFD]">
              turso
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center py-6">
          <a
            href="https://github.com/Manuekle/gestion-asistencias"
            target="_blank"
            className="bg-zinc-900 px-8 py-2 rounded-lg shadow-md hover:shadow-lg flex flex-row gap-4 items-center justify-center"
            rel="noreferrer"
          >
            <GithubIcon size={18} color="#eee" variant="stroke" />
            <h1 className="text-white text-sm">repositorio de github</h1>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
