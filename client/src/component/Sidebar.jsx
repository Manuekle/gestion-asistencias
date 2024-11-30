/* eslint-disable react/jsx-no-constructed-context-values */
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import { useContext, createContext, useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full inline-flex flex-col bg-[#1b1b1d] shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
            alt=""
          />
          <button
            type="button"
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[#252429] hover:bg-[#1e1d21]"
          >
            {expanded ? (
              <ChevronFirst color="#fff" />
            ) : (
              <ChevronLast color="#fff" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Manuel+Erazo/?background=f0e9e9&color=000&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-100">Manuel</h4>
              <span className="text-xs text-gray-200">manuel@gmail.com</span>
            </div>
            <MoreVertical size={20} color="#fff" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link
      to={to}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-[#252429] text-amber-300'
            : 'hover:bg-[#1e1d21] text-gray-100'
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-amber-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
