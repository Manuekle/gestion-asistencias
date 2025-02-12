/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { StudentCardIcon } from 'hugeicons-react';
import { useNavigate, useParams } from 'react-router-dom';
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
import CodeQR from '../../components/GenerateCodeQR';
import Cancel from '../../components/CancelClass';

function Classes() {
  const classShow = useSelector((state) => state.classShow);
  const { show } = classShow;

  const classSignature = useSelector((state) => state.classSignature);
  const { signature } = classSignature;

  const { name, id } = useParams(); // Obtiene los parámetros de la URL

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formatearHoraMilitar(fecha) {
    const date = new Date(fecha);

    // Verifica si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const hora = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    // const segundos = date.getSeconds().toString().padStart(2, '0');

    return `${hora}:${minutos}`;
  }

  function formatearFecha(fechaISO, formato) {
    const fecha = new Date(fechaISO);

    const opciones = {
      year: 'numeric',
      month: '2-digit', // 'numeric', 'long', 'short', 'narrow'
      day: '2-digit' // 'numeric'
      // hour: '2-digit',  // Para incluir la hora
      // minute: '2-digit',// Para incluir los minutos
      // second: '2-digit' // Para incluir los segundos
    };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones); // 'es-ES' para español

    // Formatos personalizados (opcional)
    if (formato === 'DD/MM/YYYY') {
      const [month, day, year] = fechaFormateada.split('/');
      return `${day}/${month}/${year}`;
    }
    if (formato === 'YYYY-MM-DD') {
      const [month, day, year] = fechaFormateada.split('/');
      return `${year}-${month}-${day}`;
    }

    return fechaFormateada;
  }

  useEffect(() => {
    if (signature.clas_estado === 'finalizada') {
      navigate(-1);
    }
    if (name && id) {
      dispatch(showClass(name, id));
      dispatch(showClassSignature(name, id));
    }
  }, [dispatch, navigate]);
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

        {signature.clas_estado === 'activa' && (
          <div className="flex flex-col gap-4 w-full">
            <CodeQR value={signature.asig_nombre} name={name} id={id} />
            <Cancel value={signature.asig_nombre} name={name} id={id} />
          </div>
        )}
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
                  <TableHead className="font-bold">Fecha</TableHead>
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
                      {formatearFecha(obj.asis_fecha)}
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
