import React from 'react';
import { Input, Skeleton } from '@heroui/react';
import { Search01Icon, BookOpen02Icon } from 'hugeicons-react';
import { Link } from 'react-router';

function ClassPageDashboard() {
  return (
    <div className="grid gap-6">
      <section className="col-span-3 rounded-xl bg-white px-6 py-4">
        <h1 className="font-bold text-lg">Mis clases</h1>
      </section>
      <section className="col-span-3 flex flex-col gap-6 rounded-xl bg-white px-6 py-4">
        <Input
          className="w-64"
          isClearable
          placeholder="Buscar clase"
          size="md"
          startContent={
            <Search01Icon size={18} color="#7a7a70" variant="stroke" />
          }
        />
        <button
          type="button"
          className="bg-yellow-200/60 text-white py-2 px-4 w-56 gap-1 rounded-lg flex flex-col items-start"
        >
          <BookOpen02Icon size={24} color="#FBBF24" variant="stroke" />
          <h1 className="font-bold text-sm text-amber-400 tracking-wide">
            Crear clase
          </h1>
        </button>
        <div className="grid grid-cols-4 gap-8">
          <Link
            to="clase"
            className="col-span-1 flex flex-col gap-3 border rounded-lg px-2.5 py-3 hover:shadow-md"
          >
            <div className="flex flex-col">
              <h1 className="font-bold text-xs text-zinc-800">
                Introducción a la programación
              </h1>
              <h1 className="font-bold text-xs text-zinc-400">
                Ingeniería de Sistemas
              </h1>
            </div>
            <Skeleton className="rounded-lg ">
              <div className="h-40 rounded-lg bg-default-300" />
            </Skeleton>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ClassPageDashboard;
