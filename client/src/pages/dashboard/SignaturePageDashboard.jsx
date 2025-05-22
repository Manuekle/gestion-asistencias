import React from 'react';

function SignaturePageDashboard() {
  return (
    <div className="grid gap-6">
      <section className="col-span-3 flex flex-col gap-6 rounded-xl bg-white border shadow-sm px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-bold text-zinc-800">Firmas</h1>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            {/* Aquí irá el contenido de firmas */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignaturePageDashboard;
