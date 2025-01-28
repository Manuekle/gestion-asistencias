import React from 'react';

function HomePageDashboard() {
  return (
    <div className="grid gap-6">
      <section className="col-span-3 flex flex-col rounded-xl bg-white border shadow-sm px-6 py-4">
        <h1 className="text-md font-bold">
          ¡Hola, [Nombre]! Hoy es [fecha actual]. Aquí tienes un resumen de tu
          actividad
        </h1>
      </section>
    </div>
  );
}

export default HomePageDashboard;
