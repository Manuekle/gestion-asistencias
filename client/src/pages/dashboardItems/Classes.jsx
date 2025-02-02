import React from 'react';
// import { StudentCardIcon } from 'hugeicons-react';
import { Separator } from '../../components/ui/separator.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table.tsx';

function Classes() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-xl bg-white border shadow-sm px-6 py-4">
        {/* <span className="flex flex-row gap-3 items-center">
          <StudentCardIcon size={30} color="#3F3F46" variant="stroke" />
          <h1 className="font-bold text-zinc-700 text-xl">Docente</h1>
        </span> */}
        <article className="flex flex-row gap-2 items-center">
          <img
            src="https://ui-avatars.com/api/?name=carlosduitanma/?background=f0e9e9&color=000&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <span className="flex flex-col items-start justify-between h-full">
            <h1 className="font-bold text-lg">carlos duitanma</h1>
            <h1 className="font-bold text-zinc-500 text-xs">
              carlos@gmail.com
            </h1>
          </span>
        </article>
        <div className="flex h-5 items-center space-x-4">
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Programa</h1>
            <h1 className="font-bold text-xs">ingenieria de sistemas</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Curso</h1>
            <h1 className="font-bold text-xs">Inteligencia Artificial</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Grupo</h1>
            <h1 className="font-bold text-xs">G1</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Horario</h1>
            <h1 className="font-bold text-xs">Diurno</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Semestre</h1>
            <h1 className="font-bold text-xs">9</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button
            type="button"
            className="text-xs border shadow-sm font-bold text-zinc-800 px-4 py-2 rounded-md"
          >
            Generar codigo
          </button>
          {/* <button
            type="button"
            className="text-xs bg-[#FEF2F2] hover:bg-[#FEF2F2]/90 font-bold text-[#C25269] px-4 py-2 rounded-md"
          >
            Cancelar clase
          </button> */}
        </div>
        <div className="pt-2">
          <span className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-sm">Lista de Estudiantes</h1>
            <h1 className="font-bold text-xs">Estudiantes presentes: 1</h1>
          </span>
          <div className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Nombre</TableHead>
                  <TableHead className="font-bold">
                    Código estudiantil
                  </TableHead>
                  <TableHead className="font-bold">Hora entrada</TableHead>
                  <TableHead className="font-bold text-right">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-sm flex flex-row items-center gap-4">
                    <img
                      src="https://ui-avatars.com/api/?name=carlosduitanma/?background=f0e9e9&color=000&bold=true"
                      alt=""
                      className="w-8 h-8 rounded-md"
                    />
                    <h1>Manuel Esteban Erazo Medina</h1>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    12421414123
                  </TableCell>
                  <TableCell className="font-medium text-sm">2:00 pm</TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs font-bold text-[#C25269] rounded-full px-4 py-1 justify-center items-center bg-[#FEF2F2]">
                      Ausente
                    </span>

                    <span className="text-xs font-bold text-[#319C78] rounded-full px-4 py-1 justify-center items-center bg-[#E7FFF6]">
                      Presente
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Classes;
