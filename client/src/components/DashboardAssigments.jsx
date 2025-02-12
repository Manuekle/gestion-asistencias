import React from 'react';

function DashboardAssigments() {
  return (
    <span className="bg-[#FAFBFD] rounded-lg flex justify-between items-center gap-3 flex-row py-2 px-4">
      <div className="flex flex-col gap-0">
        <h1 className="font-bold text-xs text-zinc-800">Matematicas</h1>
        <h1 className="font-bold text-xs text-zinc-400">24 febrero, 10:30</h1>
      </div>
      <div className="flex flex-col gap-0">
        <h1 className="font-bold text-xs text-zinc-400">Duracion</h1>
        <h1 className="font-bold text-xs text-zinc-800">02 h 24 m</h1>
      </div>
      <div className="flex flex-col gap-0">
        <h1 className="font-bold text-xs text-zinc-400">Estudiantes</h1>
        <h1 className="font-bold text-xs text-zinc-800">12 asistentes</h1>
      </div>
      <div className="flex flex-col gap-0">
        <h1 className="font-bold text-xs text-[#C25269]">Finalizada</h1>
      </div>
    </span>
  );
}

export default DashboardAssigments;
