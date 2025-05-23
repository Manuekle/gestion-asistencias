import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format, isAfter, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
// import { BellIcon } from 'hugeicons-react';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

function Recordatorios() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [loading, setLoading] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      fetchRecordatorios();
    }
  }, [userInfo]);

  const fetchRecordatorios = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${dev}/recordatorio/estudiante/${userInfo.user.user_id}`
      );

      // Filtrar recordatorios por fecha
      const now = new Date();
      const recordatoriosFiltrados = data.filter((recordatorio) => {
        const fechaInicio = new Date(recordatorio.reco_fecha_inicio);
        const fechaFin = new Date(recordatorio.reco_fecha_fin);
        return isAfter(fechaFin, now) && isBefore(fechaInicio, now);
      });

      setRecordatorios(recordatoriosFiltrados);
    } catch (error) {
      console.error('Error al cargar recordatorios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (recordatorios.length === 0) {
    return (
      <div className="text-center py-8">
        {/* <BellIcon size={48} className="mx-auto text-gray-400" /> */}
        <p className="mt-2 text-gray-500">No hay recordatorios activos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recordatorios.map((recordatorio) => (
        <div
          key={recordatorio.reco_id}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">
                {recordatorio.reco_titulo}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {recordatorio.reco_descripcion}
              </p>
            </div>
            <span className="text-xs text-gray-500">
              {format(new Date(recordatorio.reco_fecha_fin), "d 'de' MMMM", {
                locale: es
              })}
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {recordatorio.asig_nombre} - {recordatorio.asig_grupo}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recordatorios;
