import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link
        to="/auth/administrador/register"
        className="bg-zinc-900 text-white shadow-lg font-normal text-sm px-6 py-2 rounded-lg"
      >
        Crea tu cuenta
      </Link>
    </div>
  );
}

export default Navbar;
