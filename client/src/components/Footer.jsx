import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#FAFBFD] flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2025 <strong className="text-gray-500">edu</strong>
        <strong className="text-amber-400">Track</strong>. Todos los derechos
        reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs font-bold text-zinc-500" href="#terms">
          Términos de Servicio
        </Link>
        <Link className="text-xs font-bold text-zinc-500" href="#privacy">
          Política de Privacidad
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
