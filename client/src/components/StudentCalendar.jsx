import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';

const dev = import.meta.env.VITE_REACT_APP_API_DEVELOPMENT;

function StudentCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">
          {format(selectedDate, 'MMMM yyyy', { locale: es })}
        </h2>
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
          const isToday =
            format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          const isCurrentMonth = day.getMonth() === selectedDate.getMonth();

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border rounded-lg ${
                !isCurrentMonth ? 'bg-gray-50' : ''
              } ${isToday ? 'border-blue-500' : ''}`}
            >
              <div className="text-sm font-medium mb-2">{format(day, 'd')}</div>
              <div className="space-y-1">
                {dayClasses.map((clase) => (
                  <div
                    key={clase.clas_id}
                    className="text-xs p-1 bg-blue-50 rounded text-blue-700"
                  >
                    <div className="font-medium">{clase.asig_nombre}</div>
                    <div className="text-blue-600">
                      {clase.clas_hora_inicio} - {clase.clas_hora_fin}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentCalendar;
