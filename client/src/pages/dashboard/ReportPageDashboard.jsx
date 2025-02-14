/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */

'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar01Icon } from 'hugeicons-react';
import { Link } from 'react-router-dom';
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select.tsx';

function ReportPageDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState(() =>
    new Date().getFullYear().toString()
  );

  const dispatch = useDispatch();

  const classAll = useSelector((state) => state.classAll);
  const { all } = classAll;

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

  const handleGenerateReport = () => {
    dispatch(
      createReport(
        selectedMonth,
        selectedYear,
        userInfo.user.user_id,
        userInfo.user.user_correo
      )
    );
  };

  useEffect(() => {
    dispatch(showClassAll(userInfo));
  }, [dispatch, userInfo]);

  const getDaysInMonth = (month, year) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(start);
    return eachDayOfInterval({ start, end }).filter(
      (date) => date.getDay() !== 0 && date.getDay() !== 6
    );
  };

  const daysInMonth = getDaysInMonth(
    Number.parseInt(selectedMonth),
    Number.parseInt(selectedYear)
  );

  const getClassesForDay = (day) =>
    all.find((d) => isSameDay(parseISO(d.fecha), day))?.clases || [];

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
                  key={index}
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
        <button
          type="button"
          onClick={handleGenerateReport}
          className="px-6 py-2 bg-zinc-900 shadow-sm hover:shadow-md rounded-md"
        >
          <h1 className="text-xs font-bold text-white">generar reporte</h1>
        </button>
      </section>

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
                {classes.map((cls, clsIndex) => (
                  <Link
                    key={clsIndex}
                    to="/"
                    className="flex flex-col gap-1 bg-[#FAFBFD] rounded-lg p-2 border"
                  >
                    <h1 className="font-bold text-xs text-zinc-800">
                      {cls.asignatura}
                    </h1>
                    <h1 className="font-bold text-xs text-zinc-400">
                      {cls.fecha_inicio} - {cls.fecha_fin}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReportPageDashboard;
