/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import ClassDay from './ClassDay';

const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function DashboardCalendar({ user }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Actualiza cada minuto para mantener la precisión

    return () => clearInterval(timer);
  }, []);

  const getDayStyle = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString()
      ? 'text-white bg-amber-400 rounded-lg px-3 py-1'
      : 'text-zinc-800 font-bold rounded-lg py-1';
  };

  const generateWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1;
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

    return Array.from({ length: 7 }, (_, index) => {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + index);
      return current;
    });
  };

  const weekDates = generateWeekDates(currentDate);

  return (
    <div>
      <h1 className="text-md font-normal">
        {currentDate.toLocaleDateString('es-ES', { month: 'long' })}{' '}
        {currentDate.getFullYear()}
      </h1>
      <div className="flex items-center justify-between py-4">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="text-xs font-medium text-zinc-400 flex flex-col items-center"
          >
            {day}
            <div className={`mt-2 ${getDayStyle(weekDates[index])}`}>
              {weekDates[index].getDate()}
            </div>
          </div>
        ))}
      </div>
      <ClassDay />
    </div>
  );
}

export default DashboardCalendar;
