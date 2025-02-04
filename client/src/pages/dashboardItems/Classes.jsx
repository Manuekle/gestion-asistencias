/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { StudentCardIcon } from 'hugeicons-react';
import { useParams } from 'react-router-dom';
import { Separator } from '../../components/ui/separator.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '../../components/ui/table.tsx';

// actions
import { showClass, showClassSignature } from '../../actions/classActions';

// component
import CodeQR from '../../components/codeQR';

function Classes() {
  const classShow = useSelector((state) => state.classShow);
  const { show } = classShow;

  const classSignature = useSelector((state) => state.classSignature);
  const { signature } = classSignature;

  const { name, id } = useParams(); // Obtiene los parámetros de la URL

  const dispatch = useDispatch();

  function formatearHoraMilitar(fecha) {
    const date = new Date(fecha);

    // Verifica si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const hora = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');

    return `${hora}:${minutos}:${segundos}`;
  }

  useEffect(() => {
    if (name && id) {
      dispatch(showClass(name, id));
      dispatch(showClassSignature(name, id));
    }
  }, [dispatch]);
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-xl bg-white border shadow-sm px-6 py-4">
        <article className="flex flex-row gap-2 items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${signature.docente_nombre}/?background=f0e9e9&color=000&bold=true`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <span className="flex flex-col items-start justify-between h-full">
            <h1 className="font-bold text-lg">{signature.docente_nombre}</h1>
            <h1 className="font-bold text-zinc-500 text-xs">
              {signature.docente_correo}
            </h1>
          </span>
        </article>
        <div className="flex h-5 items-center space-x-4">
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Programa</h1>
            <h1 className="font-bold text-xs">{signature.asig_programa}</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Asignatura</h1>
            <h1 className="font-bold text-xs">{signature.asig_nombre}</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Grupo</h1>
            <h1 className="font-bold text-xs">{signature.asig_grupo}</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Horario</h1>
            <h1 className="font-bold text-xs">
              {signature.clas_hora_inicio && signature.clas_hora_fin
                ? `${signature.clas_hora_inicio} - ${
                    signature.clas_hora_fin
                  } (${
                    parseInt(signature.clas_hora_inicio) < 18
                      ? 'Diurno'
                      : 'Nocturno'
                  })`
                : 'Horario no disponible'}
            </h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xs text-zinc-500">Semestre</h1>
            <h1 className="font-bold text-xs">{signature.asig_semestre}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* <button
            type="button"
            className="text-xs border shadow-sm font-bold text-zinc-800 px-4 py-2 rounded-md"
          >
            Generar codigo
          </button> */}
          <CodeQR value={signature.asig_nombre} name={name} id={id} />
          <button
            type="button"
            className="text-xs bg-[#FEF2F2] hover:bg-[#FEF2F2]/90 font-bold text-[#C25269] px-4 py-2 rounded-md"
          >
            Cancelar clase
          </button>
        </div>
        <div className="pt-2">
          <span className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-sm">Lista de Estudiantes</h1>
            <h1 className="font-bold text-xs">
              Estudiantes presentes:{' '}
              {
                show.filter((student) => student.asis_estado === 'presente')
                  .length
              }
            </h1>
          </span>
          <div className="pt-4">
            <Table>
              {show.length === 0 ? (
                <TableCaption className="font-bold py-20">
                  No hay estudiantes registrados en la asistencia para esta
                  clase
                </TableCaption>
              ) : null}
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
                {show.map((obj) => (
                  <TableRow key={obj.estudiante_nombre}>
                    <TableCell className="font-medium text-sm flex flex-row items-center gap-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${obj.estudiante_nombre}/?background=f0e9e9&color=000&bold=true`}
                        alt=""
                        className="w-8 h-8 rounded-md"
                      />
                      <h1 className="capitalize">{obj.estudiante_nombre}</h1>
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      12421414123
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {formatearHoraMilitar(obj.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-xs font-bold rounded-full px-4 py-1 justify-center items-center ${
                          obj.asis_estado === 'presente'
                            ? 'text-[#319C78] bg-[#E7FFF6]'
                            : 'text-[#C25269] bg-[#FEF2F2]'
                        }`}
                      >
                        {obj.asis_estado === 'presente'
                          ? 'presente'
                          : 'ausente'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Classes;
