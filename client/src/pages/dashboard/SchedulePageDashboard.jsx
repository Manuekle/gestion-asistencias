/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from "react";

import CardsDate from "../../components/CardsDate";
import { Calendar } from "../../components/ui/calendar";
import NextClass from "../../components/NextClass";
import Clases from "../../services/clases.json";

function SchedulePageDashboard() {
  const [date, setDate] = useState(new Date());
  // fecha de hoy espa:ol
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const dateToday = today.toLocaleDateString("es-ES", options);

  return (
    <div className="grid grid-cols-4 gap-6">
      <section className="col-span-3 rounded-xl bg-white border shadow-sm px-6 py-4">
        <h1 className="font-bold text-zinc-800 text-xl">{dateToday}</h1>
        <article className="py-8 flex flex-col gap-8">
          {Clases.map((clase) => (
            <CardsDate {...clase} />
          ))}
        </article>
      </section>
      <section className="col-span-1 rounded-xl bg-white border shadow-sm flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md pt-8"
        />
        {/* <hr className="border border-zinc-100" /> */}
        <div className="flex flex-col gap-4 w-full px-6 py-8">
          <NextClass />
          <NextClass />
          <NextClass />
        </div>
      </section>
    </div>
  );
}

export default SchedulePageDashboard;
