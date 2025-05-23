'use client';

import React, { useState, useMemo } from 'react';

const OptimizedTable = ({
  data = [],
  columns = [],
  pagination = true,
  pageSize = 10,
  sortable = true,
  loading = false,
  emptyMessage = 'No hay datos disponibles'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, sortConfig, sortable]);

  // Paginar datos
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  // Calcular número total de páginas
  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize, pagination]);

  // Manejar clic en encabezado para ordenar
  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }

      return { key, direction: 'asc' };
    });
  };

  // Renderizar indicador de ordenamiento
  const renderSortIndicator = (key) => {
    if (!sortable || sortConfig.key !== key) return null;

    return (
      <span className="ml-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
    );
  };

  // Renderizar controles de paginación
  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    return (
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {(currentPage - 1) * pageSize + 1} a{' '}
          {Math.min(currentPage * pageSize, data.length)} de {data.length}{' '}
          registros
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            «
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            ‹
          </button>

          <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            ›
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            »
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data.length) {
    return <div className="text-center p-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
              >
                {column.header}
                {renderSortIndicator(column.key)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {renderPagination()}
    </div>
  );
};

export default React.memo(OptimizedTable);
