/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import {
  Home07Icon,
  UserGroupIcon,
  NoteIcon,
  Calendar03Icon,
  Settings03Icon,
  LibrariesIcon,
  CustomerService01Icon
} from 'hugeicons-react';
import { useSelector } from 'react-redux';

import Sidebar, { SidebarItem } from '../components/Sidebar';

import ProtectedRoute from '../components/ProtectedRoute'; // El componente que creamos
// pages
import HomePageDashboard from '../pages/dashboard/HomePageDashboard';
import ClassPageDashboard from '../pages/dashboard/ClassPageDashboard';
import ReportPageDashboard from '../pages/dashboard/ReportPageDashboard';
import ConfigPageDashboard from '../pages/dashboard/ConfigPageDashboard';
// items
import Classes from '../pages/dashboardItems/Classes';

function Dashboard() {
  const params = useParams();
  const urlActive = params['*'];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (userInfo.user.rol === 'estudiante') {
      navigate('/');
      return;
    }

    setIsLoading(false);
  }, [userInfo, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full bg-[#FAFBFD]">
      <Sidebar>
        {/* admin & docente */}
        {(userInfo && userInfo.user.rol === 'administrador') ||
        (userInfo && userInfo.user.rol === 'docente') ? (
          <>
            <SidebarItem
              icon={<Home07Icon size={20} color="#ffffff" variant="stroke" />}
              text="Inicio"
              active={!!(urlActive === 'dashboard' || urlActive === '')}
              to="/dashboard/home"
            />
            <SidebarItem
              icon={
                <UserGroupIcon size={20} color="#ffffff" variant="stroke" />
              }
              text="Clases"
              active={!!(urlActive === 'class')}
              to="/dashboard/class"
            />
            {/* <SidebarItem
              icon={
                <LibrariesIcon size={20} color="#ffffff" variant="stroke" />
              }
              text="Asignaturas"
              active={!!(urlActive === 'signature')}
              to="/dashboard/signature"
            /> */}
            <SidebarItem
              icon={<NoteIcon size={20} color="#ffffff" variant="stroke" />}
              text="Reportes"
              active={!!(urlActive === 'report')}
              to="/dashboard/report"
            />
          </>
        ) : null}

        {/* estudiante */}
        {userInfo && userInfo.user.rol === 'estudiante' ? (
          <SidebarItem
            icon={<Calendar03Icon size={20} color="#ffffff" variant="stroke" />}
            text="Horarios"
            active={!!(urlActive === 'schedule')}
            to="/dashboard/schedule"
          />
        ) : null}

        {/* all */}
        <hr className="my-3 border-1 border-zinc-800" />
        <SidebarItem
          icon={<Settings03Icon size={20} color="#ffffff" variant="stroke" />}
          text="Configuración"
          active={!!(urlActive === 'settings')}
          to="/dashboard/settings"
        />
        <SidebarItem
          icon={
            <CustomerService01Icon size={20} color="#ffffff" variant="stroke" />
          }
          text="Ayuda"
        />
      </Sidebar>
      <section className="p-8 w-full bg-[#FAFBFD]">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <HomePageDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <HomePageDashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/schedule"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'estudiante']}
              >
                <SchedulePageDashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/class"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <ClassPageDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:name/:id"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <Classes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <ReportPageDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente', 'estudiante']}
              >
                <ConfigPageDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default Dashboard;
