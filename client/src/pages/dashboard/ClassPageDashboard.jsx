/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Skeleton, Button } from '@heroui/react';
import {
  Search01Icon,
  GitbookIcon,
  Clock04Icon,
  Calendar01Icon
} from 'hugeicons-react';
import { Link } from 'react-router';
import { format } from 'date-fns';

// actions
import { detailsClass, createClass } from '../../actions/classActions';
import { detailsAssigment } from '../../actions/assigmentActions';

// componentes
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog.tsx';
import { Label } from '../../components/ui/label.tsx';

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

function ClassPageDashboard() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(false);

  const classDetails = useSelector((state) => state.classDetails);
  const { clases } = classDetails;

  const assigmentDetails = useSelector((state) => state.assigmentDetails);
  const { asignatura } = assigmentDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Función para deshabilitar días específicos
  const disabledDays = useCallback((day) => {
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
  }, []);

  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleSubmit = async () => {
    setFormData(true);
    dispatch(createClass(subject, date, startTime, endTime));
    await setTimeout(() => {
      setFormData(false);
      window.location.reload();
    }, 2000);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 7; i <= 22; i++) {
      options.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Clase común para los triggers de Select y Button
  const commonInputClasses = 'bg-white hover:bg-gray-50/90 rounded-2xl text-sm';

  const diasSemana = [
    { nombre: 'Lunes', valor: 1 },
    { nombre: 'Martes', valor: 2 },
    { nombre: 'Miércoles', valor: 3 },
    { nombre: 'Jueves', valor: 4 },
    { nombre: 'Viernes', valor: 5 }
  ];

  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const clasesFiltradas = clases.filter((clase) => {
    const fechaClase = new Date(clase.clas_fecha);
    const diaCoincide =
      diaSeleccionado === null || fechaClase.getDay() === diaSeleccionado;
    const busquedaCoincide =
      clase.asig_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.asig_programa.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.asig_grupo.toLowerCase().includes(busqueda.toLowerCase());

    return diaCoincide && busquedaCoincide;
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsClass(userInfo.user.user_id));
      dispatch(detailsAssigment(userInfo.user.user_id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="space-y-6">
      <section className="col-span-3 flex flex-col gap-6 rounded-xl bg-white border shadow-sm px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <Input
              className="w-full sm:w-64"
              placeholder="Buscar clase"
              size="md"
              onChange={(e) => setBusqueda(e.target.value)}
              startContent={
                <Search01Icon size={18} color="#7a7a70" variant="stroke" />
              }
            />
            <div className="flex flex-wrap gap-2">
              {diasSemana.map((dia) => (
                <button
                  key={dia.valor}
                  type="button"
                  className={`border rounded-md px-3 sm:px-4 py-2 text-xs font-bold text-black ${
                    diaSeleccionado === dia.valor
                      ? 'shadow-md text-black'
                      : 'bg-white'
                  }`}
                  onClick={() => setDiaSeleccionado(dia.valor)}
                >
                  {dia.nombre}
                </button>
              ))}
              <button
                type="button"
                className={`border rounded-md px-3 sm:px-4 py-2 text-xs font-bold text-black ${
                  diaSeleccionado === null ? 'shadow-md text-black' : 'bg-white'
                }`}
                onClick={() => setDiaSeleccionado(null)}
              >
                Todos
              </button>
            </div>
          </div>
          <Dialog>
            <DialogTrigger className="bg-zinc-800 py-2 px-4 gap-1 rounded-lg flex flex-row items-center hover:shadow-md w-full sm:w-auto justify-center">
              <h1 className="font-bold text-xs text-white">Crear Clase</h1>
            </DialogTrigger>
            <DialogContent className="space-y-0 w-[90vw] sm:w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Nueva Clase</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">
                  Complete el siguiente formulario para crear una nueva clase.
                  Asegúrese de llenar todos los campos requeridos antes de
                  enviar.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Label htmlFor="asignatura" className="text-right">
                  Asignatura
                </Label>
                <Select onValueChange={setSubject}>
                  <SelectTrigger id="asignatura" className={commonInputClasses}>
                    <div className="flex flex-row items-center gap-4">
                      <GitbookIcon size={18} color="#7a7a70" variant="stroke" />
                      <SelectValue placeholder="Seleccionar asignatura" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {asignatura.map((subj) => (
                      <SelectItem
                        key={subj.asig_id}
                        value={subj.asig_id}
                        className="text-sm"
                      >
                        {subj.asig_nombre} - {subj.asig_grupo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha" className="text-right">
                  Fecha
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonS
                      variant="outline"
                      className={cn(
                        'w-full border justify-start gap-4 text-left text-sm font-normal bg-white hover:bg-gray-50/90 rounded-2xl',
                        !date && 'text-black'
                      )}
                    >
                      <Calendar01Icon
                        size={18}
                        color="#7a7a70"
                        variant="stroke"
                      />
                      {date ? (
                        format(date, 'PPP')
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </ButtonS>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={disabledDays}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora inicio</Label>
                <Select onValueChange={setStartTime}>
                  <SelectTrigger id="startTime" className={commonInputClasses}>
                    <div className="flex flex-row items-center gap-4">
                      <Clock04Icon size={18} color="#7a7a70" variant="stroke" />
                      <SelectValue placeholder="Seleccionar hora inicio" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Hora fin</Label>
                <Select onValueChange={setEndTime}>
                  <SelectTrigger id="endTime" className={commonInputClasses}>
                    <div className="flex flex-row items-center gap-4">
                      <Clock04Icon size={18} color="#7a7a70" variant="stroke" />
                      <SelectValue placeholder="Seleccionar hora fin" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!formData ? (
                <Button
                  onPress={handleSubmit}
                  className="bg-amber-400 text-white shadow-lg text-sm"
                >
                  Crear clase
                </Button>
              ) : (
                <Button
                  isLoading
                  className="bg-amber-400 text-white shadow-lg"
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
                  Cargando
                </Button>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {clasesFiltradas.length > 0 ? (
            clasesFiltradas.map((clase) => (
              <Link
                key={clase.clas_id}
                to={`${clase.asig_slug}/${clase.clas_id}`}
                className="col-span-1 flex flex-col gap-3 border rounded-lg px-2.5 py-3 hover:shadow-md"
              >
                <div className="flex flex-col">
                  <h1 className="font-bold text-sm text-zinc-800">
                    {clase.clas_hora_inicio} - {clase.clas_hora_fin}
                  </h1>
                  <h1 className="font-bold text-xs text-zinc-800">
                    {clase.asig_nombre}
                  </h1>
                  <h1 className="font-bold text-xs text-zinc-400">
                    {clase.asig_programa}
                  </h1>
                </div>
                <Skeleton className="rounded-lg ">
                  <div className="h-40 rounded-lg bg-default-300" />
                </Skeleton>
              </Link>
            ))
          ) : (
            <p className="font-bold text-gray-500 w-full h-56 col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center">
              No hay clases que coincidan con la búsqueda.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ClassPageDashboard;
