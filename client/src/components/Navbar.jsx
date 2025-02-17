import React from "react";
// import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="px-24 py-12 text-zinc-500 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-zinc-600">
        edu<strong className="text-amber-400">Track</strong>
      </h1>
      <nav className="flex gap-8 justify-center text-xs font-bold text-zinc-600">
        <li className="inline-block">
          <a href="/">Acerca de nosotros</a>
        </li>
        <li className="inline-block">
          <a href="/">Repositorio</a>
        </li>
        <li className="inline-block">
          <a href="/">Contacto</a>
        </li>
      </nav>
    </div>
  );
}

export default Navbar;
