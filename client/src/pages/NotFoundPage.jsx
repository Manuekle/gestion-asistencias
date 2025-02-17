import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="w-full h-screen bg-[#FAFBFD] auth flex gap-8 flex-col justify-center items-center">
      <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-16 bg-[#1E201E] rounded-xl shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <h1 className="self-center mb-2 text-lg font-light text-zinc-100">
          Ooops...
        </h1>
        <h1 className="self-center mb-2 font-bold text-6xl text-zinc-100">
          404
        </h1>
        <h1 className="self-center mb-2 font-bold text-xl text-zinc-100">
          Pagina no encontrada
        </h1>
        <Link to="/" className="text-xs self-center underline text-amber-400">
          volver a inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
