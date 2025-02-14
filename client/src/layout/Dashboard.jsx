/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
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
import SchedulePageDashboard from '../pages/dashboard/SchedulePageDashboard';
import ClassPageDashboard from '../pages/dashboard/ClassPageDashboard';
import ReportPageDashboard from '../pages/dashboard/ReportPageDashboard';
import ConfigPageDashboard from '../pages/dashboard/ConfigPageDashboard';
import SignaturePageDashboard from '../pages/dashboard/SignaturePageDashboard';
// items
import Classes from '../pages/dashboardItems/Classes';

function Dashboard() {
  const params = useParams();
  const urlActive = params['*'];
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  useEffect(() => {
    if (!userInfo) {
      console.log('no');
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-row w-full bg-[#FAFBFD]">
      <Sidebar>
        {(userInfo && userInfo.user.rol === 'administrador') ||
        (userInfo && userInfo.user.rol === 'docente') ? (
          <>
            <SidebarItem
              icon={<Home07Icon size={20} color="#ffffff" variant="stroke" />}
              text="Inicio"
              active={!!(urlActive === 'dashboard' || urlActive === '')}
              to="/dashboard"
              // alert
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
        {userInfo && userInfo.user.rol === 'estudiante' ? (
          <SidebarItem
            icon={<Calendar03Icon size={20} color="#ffffff" variant="stroke" />}
            text="Horarios"
            active={!!(urlActive === 'schedule')}
            to="/dashboard/schedule"
          />
        ) : null}

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
                allowedRoles={['administrador', 'docente', 'estudiante']}
              >
                <HomePageDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="schedule"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'estudiante']}
              >
                <SchedulePageDashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="schedule/:id"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente', 'estudiante']}
              >
                <Classes />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="class"
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
            path="class/:name/:id"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <Classes />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="signature"
            element={
              <ProtectedRoute
                role={userInfo && userInfo.user.rol}
                allowedRoles={['administrador', 'docente']}
              >
                <SignaturePageDashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="report"
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
            path="settings"
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
