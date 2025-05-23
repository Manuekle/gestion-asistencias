import React from 'react';
import StudentCalendar from '../../components/StudentCalendar';

function StudentSchedulePage() {
  return (
    <div className="grid gap-6">
      <section className="col-span-3 rounded-xl bg-white border shadow-sm px-6 py-4">
        <h1 className="font-bold text-lg">Horarios</h1>
        <div className="mt-4">
          <StudentCalendar />
        </div>
      </section>
    </div>
  );
}

export default StudentSchedulePage;
