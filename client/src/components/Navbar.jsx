import React from 'react';

function Navbar() {
  return (
    <div className="px-24 py-8 text-zinc-500 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-zinc-600">
        edu<strong className="text-amber-400">Track</strong>
      </h1>
      <nav className="flex gap-8 justify-center">
        <li className="inline-block">
          <a href="/">Inicio</a>
        </li>
        <li className="inline-block">
          <a href="/">Suscripción</a>
        </li>
        <li className="inline-block">
          <a href="/">Recursos</a>
        </li>
        <li className="inline-block">
          <a href="/">Acerca de nosotros</a>
        </li>
      </nav>
      <button
        type="button"
        className="text-zinc-800 border-2 border-zinc-800 font-bold px-4 py-2 rounded-lg"
      >
        Crea tu cuenta
      </button>
    </div>
  );
}

export default Navbar;
