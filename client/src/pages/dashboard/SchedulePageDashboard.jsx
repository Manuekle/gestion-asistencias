/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import StudentCalendar from '../../components/StudentCalendar';
import Recordatorios from '../../components/Recordatorios';

function SchedulePageDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <section className="col-span-1 lg:col-span-3">
        <StudentCalendar />
      </section>
      <section className="col-span-1 space-y-6">
        <div className="rounded-xl bg-white border shadow-sm p-4">
          <h2 className="text-lg font-bold mb-4">Próximas Clases</h2>
          <div className="space-y-4">
            {/* Aquí se pueden agregar las próximas clases */}
          </div>
        </div>

        <div className="rounded-xl bg-white border shadow-sm p-4">
          <h2 className="text-lg font-bold mb-4">Recordatorios</h2>
          <Recordatorios />
        </div>
      </section>
    </div>
  );
}

export default SchedulePageDashboard;
