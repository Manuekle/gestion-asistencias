/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Delete02Icon } from 'hugeicons-react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from '../../components/DashboardCard';
import DashboardCalendar from '../../components/DashboardCalendar';
import DashboardAssigments from '../../components/DashboardAssigments';
import { getDashboardResumen } from '../../actions/dashboardActions';

function HomePageDashboard() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dashboardResumen = useSelector((state) => state.dashboardResumen) || {
    loading: false,
    resumen: null,
    error: null
  };
  const { loading, resumen, error } = dashboardResumen;

  const fechaActual = new Date();
  const opciones = { day: 'numeric', month: 'long' };
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);

  useEffect(() => {
    if (userInfo) {
      dispatch(getDashboardResumen(userInfo.user.user_id));
    }
  }, [dispatch, userInfo]);

  const calcularTiempoProximaClase = (fecha, hora) => {
    if (!fecha || !hora) return 'No hay clases programadas';

    const fechaClase = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diferencia = fechaClase - ahora;

    const minutos = Math.floor(diferencia / 60000);
    if (minutos < 0) return 'Clase en progreso';
    if (minutos < 60) return `En ${minutos} min`;
    return `En ${Math.floor(minutos / 60)} horas`;
  };

  const calcularTiempoUltimaClase = (fecha, hora) => {
    if (!fecha || !hora) return 'No hay clases recientes';

    const fechaClase = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diferencia = ahora - fechaClase;

    const minutos = Math.floor(diferencia / 60000);
    if (minutos < 60) return `Hace ${minutos} min`;
    return `Hace ${Math.floor(minutos / 60)} horas`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-red-500 text-center">
          <p className="font-bold">Error al cargar los datos</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="col-span-3 flex flex-col rounded-xl bg-white border shadow-sm px-4 sm:px-6 py-4">
        <h1 className="text-sm sm:text-md font-medium">
          ¡Hola,{' '}
          <span className="capitalize">
            {userInfo && userInfo.user.user_nombre}
          </span>
          ! Hoy es {fechaFormateada}. Aquí tienes un resumen de tu actividad
        </h1>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Cards superiores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 col-span-1 sm:col-span-2 lg:col-span-3">
          <DashboardCard
            title="Clases Programadas"
            value={resumen?.clasesProgramadas?.total || '0'}
            subtitle={`${
              resumen?.clasesProgramadas?.finalizadas || '0'
            } clases finalizadas, ${
              resumen?.clasesProgramadas?.pendientes || '0'
            } pendientes`}
          />
          <DashboardCard
            title="Próxima Clase"
            value={resumen?.proximaClase?.asig_nombre || 'No hay clases'}
            subtitle={calcularTiempoProximaClase(
              resumen?.proximaClase?.clas_fecha,
              resumen?.proximaClase?.clas_hora_inicio
            )}
          />
          <DashboardCard
            title="Última Clase"
            value={resumen?.ultimaClase?.asig_nombre || 'No hay clases'}
            subtitle={calcularTiempoUltimaClase(
              resumen?.ultimaClase?.clas_fecha,
              resumen?.ultimaClase?.clas_hora_fin
            )}
          />
        </div>

        {/* Calendario */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 rounded-xl bg-white border shadow-sm px-4 sm:px-6 py-4">
          <DashboardCalendar />
        </div>

        {/* Reportes */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 rounded-xl bg-white border shadow-sm px-4 sm:px-6 py-4">
          <h1 className="text-sm sm:text-md font-bold">Mis Reportes</h1>
          <div className="flex flex-col py-2 gap-4">
            <DashboardAssigments />
          </div>
        </div>

        {/* Notificaciones */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 rounded-xl bg-white border shadow-sm px-4 sm:px-6 py-4">
          <span className="flex justify-between items-center">
            <h1 className="text-sm font-bold">Notificaciones</h1>
            <button
              type="button"
              className="flex flex-row gap-2 hover:opacity-70 transition-opacity"
            >
              <Delete02Icon size={14} color="#52525B" variant="stroke" />
              <h1 className="text-xs text-zinc-600">limpiar</h1>
            </button>
          </span>
          <div className="flex flex-col gap-4 py-2">
            <span className="flex justify-center items-center h-40">
              <h1 className="text-xs text-bold text-zinc-500">
                No tienes notificaciones
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageDashboard;
