/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog.tsx';
import { Label } from '../../components/ui/label.tsx';
import { Input } from '@heroui/react';
import { Button } from '@heroui/react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils.ts';
import { Calendar } from '../../components/ui/calendar.tsx';
import { Button as ButtonS } from '../../components/ui/button.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../components/ui/popover.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select.tsx';
import { Calendar01Icon } from 'hugeicons-react';
// actions
import { showClass, showClassSignature } from '../../actions/classActions';
import { createReminder } from '../../actions/reminderActions';

// component
import CodeQR from '../../components/GenerateCodeQR';
import Cancel from '../../components/CancelClass';

function Classes() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(false);
  const [recordatorioData, setRecordatorioData] = useState({
    titulo: '',
    descripcion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    prioridad: ''
  });

  const classShow = useSelector((state) => state.classShow);
  const { show, loading: showLoading, error: showError } = classShow;

  const classSignature = useSelector((state) => state.classSignature);
  const {
    signature,
    loading: signatureLoading,
    error: signatureError
  } = classSignature;

  const { name, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para deshabilitar días específicos
  const disabledDays = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Deshabilitar días anteriores a hoy
    if (day < today) {
      return true;
    }

    // Deshabilitar sábados (6) y domingos (0)
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }

    return false;
  };

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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (signature.clas_estado === 'finalizada') {
          navigate(-1);
          return;
        }

        if (name && id) {
          await Promise.all([
            dispatch(showClass(name, id)),
            dispatch(showClassSignature(name, id))
          ]);
        }
      } catch (err) {
        setError('Error al cargar los datos de la clase');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate, name, id, signature.clas_estado]);

  const handleCreateRecordatorio = async () => {
    try {
      setFormData(true);

      // Validar que todos los campos estén llenos
      if (
        !recordatorioData.titulo ||
        !recordatorioData.descripcion ||
        !recordatorioData.prioridad
      ) {
        throw new Error('Por favor complete todos los campos requeridos');
      }

      // Validar que la fecha de fin no sea anterior a la fecha de inicio
      if (recordatorioData.fechaFin < recordatorioData.fechaInicio) {
        throw new Error(
          'La fecha de fin no puede ser anterior a la fecha de inicio'
        );
      }

      const reminderData = {
        remi_titulo: recordatorioData.titulo,
        remi_descripcion: recordatorioData.descripcion,
        remi_fecha_inicio: format(recordatorioData.fechaInicio, 'yyyy-MM-dd'),
        remi_fecha_fin: format(recordatorioData.fechaFin, 'yyyy-MM-dd'),
        remi_prioridad: recordatorioData.prioridad,
        clas_id: id // ID de la clase actual
      };

      await dispatch(createReminder(reminderData));

      // Limpiar el formulario
      setRecordatorioData({
        titulo: '',
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        prioridad: ''
      });

      // Cerrar el diálogo
      // document.querySelector('[data-dialog-close]')?.click();

      // Mostrar mensaje de éxito

      // Removido: Recargar la página después de un breve delay
      // setTimeout(() => {
      setFormData(false);
      // }, 2000);
    } catch (error) {
      console.error('Error al crear el recordatorio:', error);
      alert(error.message || 'Error al crear el recordatorio');
      setFormData(false);
    }
  };

  if (isLoading || showLoading || signatureLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || showError || signatureError) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-red-500 text-center">
          <p className="font-bold">Error al cargar los datos</p>
          <p className="text-sm">{error || showError || signatureError}</p>
        </div>
      </div>
    );
  }

  if (!signature || !show) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-gray-500 text-center">
          <p className="font-bold">No se encontraron datos</p>
          <p className="text-sm">La clase o la firma no están disponibles</p>
        </div>
      </div>
    );
  }

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

        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="bg-zinc-800 py-2 px-4 gap-1 rounded-lg flex flex-row items-center hover:shadow-md">
              <h1 className="font-bold text-xs text-white">
                Crear Recordatorio
              </h1>
            </DialogTrigger>
            <DialogContent className="space-y-4 w-[90vw] sm:w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Nuevo Recordatorio</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">
                  Complete el siguiente formulario para crear un nuevo
                  recordatorio. Asegúrese de llenar todos los campos requeridos
                  antes de enviar.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    placeholder="Ingrese el título del recordatorio"
                    className="bg-white hover:bg-gray-50/90 rounded-2xl text-sm"
                    value={recordatorioData.titulo}
                    onChange={(e) =>
                      setRecordatorioData({
                        ...recordatorioData,
                        titulo: e.target.value
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <textarea
                    id="descripcion"
                    placeholder="Ingrese la descripción del recordatorio"
                    className="w-full min-h-[100px] p-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50/90 text-sm resize-none"
                    value={recordatorioData.descripcion}
                    onChange={(e) =>
                      setRecordatorioData({
                        ...recordatorioData,
                        descripcion: e.target.value
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <ButtonS
                        variant="outline"
                        className={cn(
                          'w-full border justify-start gap-4 text-left text-sm font-normal bg-white hover:bg-gray-50/90 rounded-2xl',
                          !recordatorioData.fechaInicio && 'text-black'
                        )}
                      >
                        <Calendar01Icon
                          size={18}
                          color="#7a7a70"
                          variant="stroke"
                        />
                        {recordatorioData.fechaInicio ? (
                          format(recordatorioData.fechaInicio, 'PPP')
                        ) : (
                          <span>Seleccionar fecha inicio</span>
                        )}
                      </ButtonS>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={recordatorioData.fechaInicio}
                        onSelect={(date) =>
                          setRecordatorioData({
                            ...recordatorioData,
                            fechaInicio: date
                          })
                        }
                        disabled={disabledDays}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha de Fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <ButtonS
                        variant="outline"
                        className={cn(
                          'w-full border justify-start gap-4 text-left text-sm font-normal bg-white hover:bg-gray-50/90 rounded-2xl',
                          !recordatorioData.fechaFin && 'text-black'
                        )}
                      >
                        <Calendar01Icon
                          size={18}
                          color="#7a7a70"
                          variant="stroke"
                        />
                        {recordatorioData.fechaFin ? (
                          format(recordatorioData.fechaFin, 'PPP')
                        ) : (
                          <span>Seleccionar fecha fin</span>
                        )}
                      </ButtonS>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={recordatorioData.fechaFin}
                        onSelect={(date) =>
                          setRecordatorioData({
                            ...recordatorioData,
                            fechaFin: date
                          })
                        }
                        disabled={disabledDays}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <Select
                    value={recordatorioData.prioridad}
                    onValueChange={(value) =>
                      setRecordatorioData({
                        ...recordatorioData,
                        prioridad: value
                      })
                    }
                  >
                    <SelectTrigger
                      id="prioridad"
                      className="bg-white hover:bg-gray-50/90 rounded-2xl text-sm"
                    >
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {!formData ? (
                  <Button
                    onPress={handleCreateRecordatorio}
                    className="w-full bg-amber-400 text-white shadow-lg text-sm hover:bg-amber-500"
                  >
                    Crear Recordatorio
                  </Button>
                ) : (
                  <Button
                    isLoading
                    className="w-full bg-amber-400 text-white shadow-lg"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Creando...
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
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
