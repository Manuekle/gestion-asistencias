/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */

'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar01Icon } from 'hugeicons-react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO
} from 'date-fns';
import { es } from 'date-fns/locale';
import { showClassAll } from '../../actions/classActions';
import { createReport } from '../../actions/reportActions';
import { useToast } from '../../hooks/use-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select.tsx';

function ReportPageDashboard() {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState(() =>
    new Date().getFullYear().toString()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const dispatch = useDispatch();

  const classAll = useSelector((state) => state.classAll);
  const { all = [], loading: classesLoading, error: classesError } = classAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commonInputClasses = 'bg-white hover:bg-gray-50/90 rounded-2xl text-sm';
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  // Temas predefinidos para el ejemplo (basados en la imagen)
  const temasPredefinidos = [
    'Definición, historia de la web y evolución de las aplicaciones web',
    'Diferencias entre aplicaciones web y aplicaciones de escritorio\nModelos de arquitectura web: Cliente-Servidor, Monolítica, Microservicios',
    'La arquitectura de 3 capas\nTecnologías fundamentales para el desarrollo web',
    'Repaso marcos ágiles para el desarrollo de software\nRepaso sistema control de versiones',
    'Introducción a servidores web\nFuncionamiento básico de un servidor web\nManipulación de datos y gestión de bases de datos',
    'Principios de programación en el servidor\nConfiguración ambiente de desarrollo',
    'Lenguajes de programación del lado del servidor',
    'Seguridad en el desarrollo del lado del servidor\n(Inyección SQL, XSS, CSRF)',
    'Modelos de comunicación entre cliente y servidor\nIntroducción a APIs',
    'Introducción a servicios web',
    'Formatos de intercambio de datos (JSON, XML)',
    'Estructura de una página web\nIntroducción HTML',
    'Introducción CSS',
    'Introducción JS',
    'Manejo de librerías web',
    'Manejo de DOM y eventos en el navegador\nDespliegue'
  ];

  const handleGenerateReport = useCallback(() => {
    if (!userInfo?.user?.user_id || !userInfo?.user?.user_correo) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Información de usuario no disponible'
      });
      return;
    }

    dispatch(
      createReport(
        (Number.parseInt(selectedMonth) + 1).toString(),
        selectedYear,
        userInfo.user.user_id,
        userInfo.user.user_correo
      )
    ).then((result) => {
      if (result?.error || !result) {
        toast({
          variant: 'destructive',
          title: 'Error al generar y enviar el reporte',
          description: 'No hay registros para este mes y docente.'
        });
      } else if (result.success) {
        toast({
          variant: 'default',
          title: 'Reporte enviado exitosamente',
          description: 'El reporte se ha enviado a tu correo electrónico'
        });
      }
    });
  }, [dispatch, selectedMonth, selectedYear, userInfo, toast]);

  const togglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!userInfo?.user?.user_id) {
          throw new Error('ID de usuario no disponible');
        }

        const result = await dispatch(showClassAll(userInfo));
        if (result?.error) {
          throw new Error(result.error.message || 'Error al cargar las clases');
        }
      } catch (err) {
        setError(err.message || 'Error al cargar las clases');
        console.error('Error en fetchData:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, userInfo]);

  const getDaysInMonth = useCallback((month, year) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(start);
    return eachDayOfInterval({ start, end }).filter(
      (date) => date.getDay() !== 0 && date.getDay() !== 6
    );
  }, []);

  const daysInMonth = useMemo(
    () =>
      getDaysInMonth(
        Number.parseInt(selectedMonth),
        Number.parseInt(selectedYear)
      ),
    [getDaysInMonth, selectedMonth, selectedYear]
  );

  const getClassesForDay = useCallback(
    (day) => {
      if (!Array.isArray(all)) return [];
      const dayData = all.find((d) => {
        try {
          return isSameDay(parseISO(d.fecha), day);
        } catch (err) {
          console.error('Error al parsear fecha:', err);
          return false;
        }
      });
      return dayData?.clases || [];
    },
    [all]
  );

  // Datos para la vista previa del reporte
  const previewData = useMemo(() => {
    // Generar datos de ejemplo para la vista previa
    return Array.from({ length: 16 }, (_, i) => {
      // Calcular fechas para que coincidan con la imagen
      const mes = i < 5 ? 2 : i < 9 ? 3 : i < 13 ? 4 : 5; // Meses 2, 3, 4, 5 (Feb, Mar, Abr, May)
      const dia = [5, 12, 19, 26, 5, 12, 19, 26, 2, 9, 16, 23, 30, 7, 14, 21][
        i
      ]; // Días específicos

      return {
        index: i + 1,
        dia,
        mes,
        fecha_inicio: '13:50',
        fecha_fin: '17:10',
        tema: temasPredefinidos[i],
        total_horas: 4
      };
    });
  }, [temasPredefinidos]);

  if (isLoading || classesLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || classesError) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : typeof classesError === 'string'
        ? classesError
        : 'Error al cargar los datos';

    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-red-500 text-center">
          <p className="font-bold">Error al cargar los datos</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!userInfo?.user?.user_id) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-red-500 text-center">
          <p className="font-bold">Error de autenticación</p>
          <p className="text-sm">No se encontró la información del usuario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-4">
      <section className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className={`w-[180px] ${commonInputClasses}`}>
              <div className="flex flex-row items-center gap-4">
                <Calendar01Icon size={18} color="#7a7a70" variant="stroke" />
                <SelectValue placeholder="Seleccionar mes" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem
                  key={index + 1}
                  value={index.toString()}
                  className="text-sm"
                >
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className={`w-[120px] ${commonInputClasses}`}>
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {[2023, 2024, 2025].map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="text-sm"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={togglePreview}
            className="px-6 py-2 bg-blue-600 shadow-sm hover:shadow-md rounded-md"
          >
            <h1 className="text-xs font-bold text-white">
              {showPreview ? 'Ocultar Vista Previa' : 'Ver Vista Previa'}
            </h1>
          </button>
          <button
            type="button"
            onClick={handleGenerateReport}
            className="px-6 py-2 bg-zinc-900 shadow-sm hover:shadow-md rounded-md"
          >
            <h1 className="text-xs font-bold text-white">Generar Reporte</h1>
          </button>
        </div>
      </section>

      {showPreview ? (
        <div className="bg-white rounded-xl border shadow-sm p-8 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Encabezado del reporte */}
            <div className="flex border border-black mb-4">
              <div className="w-1/5 border-r border-black p-2 text-center">
                <img src="/fup.jpg" alt="Logo" className="max-h-16 mx-auto" />
              </div>
              <div className="w-3/5 border-r border-black p-2 text-center font-bold">
                <div>DOCENCIA</div>
                <div>REGISTRO DE CLASES Y ASISTENCIA DOCENTE</div>
              </div>
              <div className="w-1/5 p-2">
                <div>Código: FO-DO-005</div>
                <div>Versión: 08</div>
                <div>Fecha: Marzo 2023</div>
              </div>
            </div>

            {/* Información del docente */}
            <div className="mb-4">
              <div className="font-bold">
                NOMBRE DEL DOCENTE:{' '}
                <span className="font-normal">
                  Luis Alfonso Viajrano Sánchez
                </span>
              </div>
              <div className="font-bold">
                PROGRAMA:{' '}
                <span className="font-normal">Ingeniería de Sistemas</span>
              </div>
              <div className="font-bold">
                ASIGNATURA:{' '}
                <span className="font-normal">Aplicaciones Web</span> AÑO:{' '}
                <span className="font-normal">2025</span> PERIODO:{' '}
                <span className="font-normal">1</span>
              </div>
            </div>

            {/* Tabla de clases */}
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th rowSpan="2" className="border border-black p-2">
                    No.
                  </th>
                  <th colSpan="2" className="border border-black p-2">
                    FECHA
                  </th>
                  <th colSpan="2" className="border border-black p-2">
                    HORA
                  </th>
                  <th rowSpan="2" className="border border-black p-2">
                    TEMA
                  </th>
                  <th rowSpan="2" className="border border-black p-2">
                    TOTAL HORAS
                  </th>
                  <th rowSpan="2" className="border border-black p-2">
                    FIRMA DOCENTE
                  </th>
                </tr>
                <tr>
                  <th className="border border-black p-2">DD</th>
                  <th className="border border-black p-2">MM</th>
                  <th className="border border-black p-2">INICIO</th>
                  <th className="border border-black p-2">FINAL</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((clase) => {
                  // Aplicar formato especial a ciertos temas (texto azul y subrayado)
                  const temaFormateado = clase.tema
                    .split('\n')
                    .map((linea) => {
                      if (
                        linea.includes('APIs') ||
                        linea.includes('servicios web') ||
                        linea.includes('JSON') ||
                        linea.includes('XML') ||
                        linea.includes('CSS') ||
                        linea.includes('JS')
                      ) {
                        return `<span class="text-blue-600 underline">${linea}</span>`;
                      }
                      return linea;
                    })
                    .join('<br>');

                  return (
                    <tr key={clase.index}>
                      <td className="border border-black p-2 text-center">
                        {clase.index}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {clase.dia}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {clase.mes}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {clase.fecha_inicio}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {clase.fecha_fin}
                      </td>
                      <td
                        className="border border-black p-2 text-left"
                        dangerouslySetInnerHTML={{ __html: temaFormateado }}
                      ></td>
                      <td className="border border-black p-2 text-center">
                        {clase.total_horas}
                      </td>
                      <td className="border border-black p-2"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="text-right mt-4">Página 1 de 1</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 bg-white rounded-xl border shadow-sm p-8">
          <div className="text-sm font-medium text-muted-foreground">LUN</div>
          <div className="text-sm font-medium text-muted-foreground">MAR</div>
          <div className="text-sm font-medium text-muted-foreground">MIÉ</div>
          <div className="text-sm font-medium text-muted-foreground">JUE</div>
          <div className="text-sm font-medium text-muted-foreground">VIE</div>

          {daysInMonth.map((day, index) => {
            const classes = getClassesForDay(day);
            return (
              <div key={index} className="bg-white border rounded-lg">
                <div className="px-4 py-3">
                  <div className="flex justify-between items-center py-1">
                    <span
                      className={`text-sm font-light ${
                        isSameDay(day, new Date())
                          ? 'h-8 w-8 rounded-full bg-amber-400 font-bold text-white flex items-center justify-center'
                          : ''
                      }`}
                    >
                      {format(day, 'd', { locale: es })}
                    </span>
                  </div>
                </div>
                <div className="p-3 pt-0 grid grid-cols-2 gap-3">
                  {classes.length > 0 ? (
                    classes.map((cls, clsIndex) => (
                      <button
                        type="button"
                        key={clsIndex}
                        className="flex flex-col gap-1 bg-[#FAFBFD] rounded-lg p-2 border"
                      >
                        <h1 className="font-bold text-xs text-zinc-800">
                          {cls.asignatura}
                        </h1>
                        <h1 className="font-bold text-xs text-zinc-400">
                          {cls.fecha_inicio} - {cls.fecha_fin}
                        </h1>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-400 text-sm py-2">
                      Sin clases
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ReportPageDashboard;
