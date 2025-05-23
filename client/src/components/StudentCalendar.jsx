import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth
} from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';
import { Calendar01Icon } from 'hugeicons-react';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

function StudentCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      fetchClasses();
    }
  }, [userInfo, selectedDate]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${dev}/clase/estudiante/${userInfo.user.user_id}?mes=${
          selectedDate.getMonth() + 1
        }&anio=${selectedDate.getFullYear()}`
      );
      setClasses(data);
    } catch (error) {
      console.error('Error al cargar clases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(start);
    return eachDayOfInterval({ start, end });
  };

  const getClassesForDay = (day) => {
    return classes.filter(
      (clase) =>
        format(new Date(clase.clas_fecha), 'yyyy-MM-dd') ===
        format(day, 'yyyy-MM-dd')
    );
  };

  const days = getDaysInMonth();

  const formatTime = (time) => {
    return time.substring(0, 5);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Calendar01Icon size={24} color="#27272A" variant="stroke" />
          <h2 className="text-lg font-bold">
            {format(selectedDate, 'MMMM yyyy', { locale: es })}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1
                )
              )
            }
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1
                )
              )
            }
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dayClasses = getClassesForDay(day);
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border rounded-lg ${
                !isCurrentMonth ? 'bg-gray-50' : ''
              } ${isCurrentDay ? 'border-blue-500' : ''}`}
            >
              <div
                className={`text-sm font-medium mb-2 ${
                  isCurrentDay ? 'text-blue-600' : ''
                }`}
              >
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayClasses.map((clase) => (
                  <div
                    key={clase.clas_id}
                    onClick={() => setSelectedClass(clase)}
                    className={`text-xs p-1 rounded cursor-pointer ${
                      clase.clas_estado === 'finalizada'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    <div className="font-medium truncate">
                      {clase.asig_nombre}
                    </div>
                    <div className="text-xs">
                      {formatTime(clase.clas_hora_inicio)} -{' '}
                      {formatTime(clase.clas_hora_fin)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedClass && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            {selectedClass.asig_nombre}
          </h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Fecha:</span>{' '}
              {format(new Date(selectedClass.clas_fecha), 'dd/MM/yyyy')}
            </p>
            <p className="text-sm">
              <span className="font-medium">Horario:</span>{' '}
              {formatTime(selectedClass.clas_hora_inicio)} -{' '}
              {formatTime(selectedClass.clas_hora_fin)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Docente:</span>{' '}
              {selectedClass.docente_nombre}
            </p>
            <p className="text-sm">
              <span className="font-medium">Estado:</span>{' '}
              <span
                className={`${
                  selectedClass.clas_estado === 'finalizada'
                    ? 'text-green-600'
                    : 'text-blue-600'
                }`}
              >
                {selectedClass.clas_estado === 'finalizada'
                  ? 'Finalizada'
                  : 'Pendiente'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCalendar;
