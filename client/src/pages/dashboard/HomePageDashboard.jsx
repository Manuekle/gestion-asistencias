import React from 'react';
// import ChartRadialText from '../../components/ChartRadialText';
// import ChartRadialPercentage from '../../components/ChartRadialPercentage';
import { AddCircleIcon, Delete02Icon } from 'hugeicons-react';
import DashboardCard from '../../components/DashboardCard';
import DashboardCalendar from '../../components/DashboardCalendar';

function HomePageDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <section className="col-span-3 flex flex-col rounded-xl bg-white border shadow-sm px-6 py-4">
        <h1 className="text-md font-bold">
          ¡Hola, [Nombre]! Hoy es [fecha actual]. Aquí tienes un resumen de tu
          actividad
        </h1>
      </section>
      <div className="grid grid-cols-5 grid-rows-3 gap-4">
        <DashboardCard
          title="Clases Programadas"
          value="3"
          subtitle="2 clases finalizadas, 1 pendiente"
        />
        <DashboardCard
          title="Ausencias Críticas"
          value="5"
          subtitle="3 estudiantes en riesgo académico"
          // className="bg-[#FEF2F2]"
        />
        <DashboardCard
          title="Última Clase"
          value="Matemáticas"
          subtitle="Hace 15 min"
          // className="bg-[#E7FFF6]"
        />
        <div className="col-span-2 row-span-2 rounded-xl bg-white border shadow-sm px-6 py-4">
          <DashboardCalendar />
        </div>
        <div className="col-span-3 row-span-2 row-start-2 rounded-xl bg-white border shadow-sm px-6 py-4">
          <h1 className="text-md font-bold">Mis Materias</h1>
          <div className="flex flex-col py-2 gap-3">
            <span className="bg-[#FAFBFD] rounded-lg flex justify-between items-center gap-3 flex-row py-2 px-4">
              <div className="flex flex-col gap-0">
                <h1 className="font-bold text-xs text-zinc-800">Matematicas</h1>
                <h1 className="font-bold text-xs text-zinc-400">
                  24 febrero, 10:30
                </h1>
              </div>
              <div className="flex flex-col gap-0">
                <h1 className="font-bold text-xs text-zinc-400">Duracion</h1>
                <h1 className="font-bold text-xs text-zinc-800">02 h 24 m</h1>
              </div>
              <div className="flex flex-col gap-0">
                <h1 className="font-bold text-xs text-zinc-400">Estudiantes</h1>
                <h1 className="font-bold text-xs text-zinc-800">12/20</h1>
              </div>
              <div className="flex flex-col gap-0">
                <h1 className="font-bold text-xs text-[#319C78]">En curso</h1>
                <h1 className="font-bold text-xs text-[#C25269]">Finalizada</h1>
              </div>
            </span>
            <button
              type="button"
              className="bg-white flex justify-center items-center border-dashed border-2 rounded-lg gap-3 flex-row p-4"
            >
              <AddCircleIcon size={18} color="#333" variant="stroke" />
              <h1 className="text-xs font-bold">agregar nuevas materias</h1>
            </button>
          </div>
        </div>
        <div className="col-span-2 col-start-4 row-start-3 rounded-xl bg-white border shadow-sm px-6 py-4">
          <span className="flex justify-between items-center">
            <h1 className="text-sm font-bold">Notificaciones</h1>
            <button type="button" className="flex flex-row gap-2">
              <Delete02Icon size={14} color="#52525B" variant="stroke" />
              <h1 className="text-xs text-zinc-600">limpiar</h1>
            </button>
          </span>
          <div className="flex flex-col gap-4 py-2">
            <span className="bg-[#FAFBFD] rounded-lg flex gap-3 flex-col py-2 px-4">
              <h1 className="text-xs">Evento</h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageDashboard;
