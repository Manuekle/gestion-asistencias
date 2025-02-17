/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { MoreHorizontalIcon, EyeIcon } from "hugeicons-react";
import { Link } from "react-router-dom";
import { showClassDay } from "../actions/classActions";

function ClassDay() {
  const classDay = useSelector((state) => state.classDay);
  const { day } = classDay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const fecha = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  function determinarTiempo(horaInicio, horaFin) {
    const ahora = currentDate.getHours() * 60 + currentDate.getMinutes(); // Hora actual en minutos
    const inicio =
      parseInt(horaInicio.split(":")[0]) * 60 +
      parseInt(horaInicio.split(":")[1]); // Hora de inicio en minutos
    const fin =
      parseInt(horaFin.split(":")[0]) * 60 + parseInt(horaFin.split(":")[1]); // Hora de fin en minutos

    if (ahora >= inicio && ahora <= fin) {
      const diferenciaInicio = ahora - inicio;
      if (diferenciaInicio >= 60) {
        return `Hace ${Math.floor(diferenciaInicio / 60)} hora(s)`;
      }
      if (diferenciaInicio > 0) {
        return `Hace ${diferenciaInicio} minutos`;
      }
      return "Es la hora de inicio";
    }
    if (ahora < inicio) {
      const diferenciaInicio = inicio - ahora;
      if (diferenciaInicio >= 60) {
        return `En ${Math.floor(diferenciaInicio / 60)} hora(s)`;
      }
      return `En ${diferenciaInicio} minutos`;
    }
    const diferenciaFin = ahora - fin;
    if (diferenciaFin >= 60) {
      return `Hace ${Math.floor(diferenciaFin / 60)} hora(s)`;
    }
    if (diferenciaFin > 0) {
      return `Hace ${diferenciaFin} minutos`;
    }
    return "Es la hora de fin";
  }

  // Ejemplo de uso:
  const horaInicio = "17:00";
  const horaFin = "16:00";
  const resultado = determinarTiempo(horaInicio, horaFin);

  useEffect(() => {
    if (fecha) dispatch(showClassDay(fecha, userInfo));
  }, [dispatch]);

  return (
    <>
      {day.map((clase) => (
        <div className="w-full">
          <span className="flex flex-row items-center w-full">
            <h1 className="font-bold text-xs text-zinc-900 w-28">
              {clase.clas_hora_inicio} - {clase.clas_hora_fin}
            </h1>
            <hr className="border-dashed border-zinc-600 w-full" />
          </span>
          <article className="flex flex-row justify-between py-2">
            <span>
              <h1 className="text-xs">{clase.asig_nombre}</h1>
              <h1 className="text-xs text-zinc-400">
                {determinarTiempo(clase.clas_hora_inicio, clase.clas_hora_fin)}
              </h1>
            </span>
            <span>
              <Dropdown>
                <DropdownTrigger>
                  <button
                    type="button"
                    className="flex flex-row gap-2 items-center"
                  >
                    <MoreHorizontalIcon
                      size={20}
                      color="#000"
                      variant="stroke"
                    />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown menu with shortcut"
                  variant="flat"
                >
                  <DropdownItem key="nuevo">
                    <Link
                      to={`class/${clase.asig_slug}/${clase.clas_id}`}
                      className="flex justify-between items-center"
                    >
                      <h1 className="font-bold text-zinc-800">Ver clase</h1>
                      <EyeIcon size={16} color="#27272A" variant="stroke" />
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          </article>
        </div>
      ))}
    </>
  );
}

export default ClassDay;
