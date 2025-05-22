import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasesPorDocente } from '../actions/classActions';

function DashboardAssigments() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const classDay = useSelector((state) => state.classDay);
  const { loading, error, clases } = classDay;

  useEffect(() => {
    if (userInfo) {
      dispatch(getClasesPorDocente(userInfo.user.user_id));
    }
  }, [dispatch, userInfo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!clases || clases.length === 0) {
    return (
      <div className="text-center text-zinc-500">
        <p className="text-sm">No hay clases programadas</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {clases.map((clase) => (
        <span
          key={clase.clas_id}
          className="bg-[#FAFBFD] rounded-lg flex justify-between items-center gap-3 flex-row py-2 px-4"
        >
          <div className="flex flex-col gap-0">
            <h1 className="font-bold text-xs text-zinc-800">
              {clase.asig_nombre}
            </h1>
            <h1 className="font-bold text-xs text-zinc-400">
              {new Date(clase.clas_fecha).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long'
              })}
              , {clase.clas_hora_inicio}
            </h1>
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="font-bold text-xs text-zinc-400">Duracion</h1>
            <h1 className="font-bold text-xs text-zinc-800">
              {clase.clas_hora_fin}
            </h1>
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="font-bold text-xs text-zinc-400">Estudiantes</h1>
            <h1 className="font-bold text-xs text-zinc-800">
              {clase.asig_grupo} estudiantes
            </h1>
          </div>
          <div className="flex flex-col gap-0">
            <h1
              className={`font-bold text-xs ${
                clase.clas_estado === 'finalizada'
                  ? 'text-[#C25269]'
                  : 'text-green-500'
              }`}
            >
              {clase.clas_estado === 'finalizada' ? 'Finalizada' : 'Activa'}
            </h1>
          </div>
        </span>
      ))}
    </div>
  );
}

export default DashboardAssigments;
