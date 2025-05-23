import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
// import { BellIcon } from 'hugeicons-react';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

function CrearRecordatorio({ claseId, onRecordatorioCreado }) {
  const [formData, setFormData] = useState({
    reco_titulo: '',
    reco_descripcion: '',
    reco_fecha_inicio: '',
    reco_fecha_fin: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(`${dev}/recordatorio/create`, {
        ...formData,
        reco_clas_id: claseId
      });

      setFormData({
        reco_titulo: '',
        reco_descripcion: '',
        reco_fecha_inicio: '',
        reco_fecha_fin: ''
      });

      if (onRecordatorioCreado) {
        onRecordatorioCreado(data);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Error al crear el recordatorio'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="reco_titulo"
          className="block text-sm font-medium text-gray-700"
        >
          Título
        </label>
        <input
          type="text"
          id="reco_titulo"
          name="reco_titulo"
          value={formData.reco_titulo}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="reco_descripcion"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="reco_descripcion"
          name="reco_descripcion"
          value={formData.reco_descripcion}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="reco_fecha_inicio"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de inicio
          </label>
          <input
            type="datetime-local"
            id="reco_fecha_inicio"
            name="reco_fecha_inicio"
            value={formData.reco_fecha_inicio}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="reco_fecha_fin"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de fin
          </label>
          <input
            type="datetime-local"
            id="reco_fecha_fin"
            name="reco_fecha_fin"
            value={formData.reco_fecha_fin}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Creando...' : 'Crear Recordatorio'}
      </button>
    </form>
  );
}

export default CrearRecordatorio;
