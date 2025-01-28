/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ArrowRight01Icon, ArrowLeft01Icon, Door01Icon } from 'hugeicons-react';
import { useContext, createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip.tsx';

import { getUserDetails, logout } from '../actions/userActions';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  // console.log(user);

  const logoutHandler = () => {
    dispatch(logout());
    if (userInfo) {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/auth/login');
    } else {
      dispatch(getUserDetails(userInfo.user.usua_id));
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <aside className="h-screen">
      <nav className="h-full inline-flex flex-col bg-[#1c1d1d] shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[#323332] border border-zinc-700"
          >
            {expanded ? (
              <ArrowLeft01Icon size={20} color="#ffffff" variant="stroke" />
            ) : (
              <ArrowRight01Icon size={20} color="#ffffff" variant="stroke" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 pt-6">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex items-center p-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user.usua_nombre}/?background=f0e9e9&color=000&bold=true`}
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
              <h4 className="font-semibold capitalize text-sm text-gray-100">
                {user.usua_nombre}
              </h4>
              <span className="text-xs text-gray-200">{user.usua_correo}</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    type="button"
                    onClick={logoutHandler}
                    className="p-1.5 rounded-lg bg-[#323332] border border-zinc-700"
                  >
                    <Door01Icon size={20} color="#ffffff" variant="stroke" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 bg-[#323332] text-zinc-100 border-none">
                  <p className="text-xs">Cerrar sesion</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
        relative flex items-center py-2 px-3 my-3
        font-medium rounded-xl cursor-pointer
        transition-colors group z-40
        ${
          active
            ? 'bg-[#323332] text-zinc-100 border border-zinc-700'
            : 'hover:bg-[#323332] text-zinc-400'
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
          absolute left-full rounded-md px-3 py-1 ml-6
          bg-[#323332] text-zinc-100 text-xs
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
