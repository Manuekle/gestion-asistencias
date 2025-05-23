import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Calendar03Icon,
  Settings03Icon,
  CustomerService01Icon,
  Door01Icon,
  //   HomeIcon,
  BookOpen01Icon
} from 'hugeicons-react';
import { Button } from '@heroui/react';

import Sidebar, { SidebarItem } from '../components/Sidebar';
import ProtectedRoute from '../components/ProtectedRoute';

// pages
import TeacherHomePage from '../pages/teacher/TeacherHomePage';
import TeacherSchedulePage from '../pages/teacher/TeacherSchedulePage';
import TeacherConfigPage from '../pages/teacher/TeacherConfigPage';
import TeacherClassPage from '../pages/teacher/TeacherClassPage';

function TeacherLayout() {
  const params = useParams();
  const urlActive = params['*'];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/', { replace: true });
      return;
    }

    const userRole = userInfo.user.user_rol;
    if (userRole !== 'docente') {
      navigate('/', { replace: true });
      return;
    }

    setIsLoading(false);
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    setFormData(true);
    localStorage.removeItem('userInfo');
    navigate('/auth/profesor/login', { replace: true });
  };

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
        <SidebarItem
          icon={<HomeIcon size={20} color="#ffffff" variant="stroke" />}
          text="Inicio"
          active={!!(urlActive === '')}
          to="/teacher"
        />
        <SidebarItem
          icon={<Calendar03Icon size={20} color="#ffffff" variant="stroke" />}
          text="Horarios"
          active={!!(urlActive === 'schedule')}
          to="/teacher/schedule"
        />
        <SidebarItem
          icon={<BookOpen01Icon size={20} color="#ffffff" variant="stroke" />}
          text="Mis Clases"
          active={!!(urlActive === 'classes')}
          to="/teacher/classes"
        />
        <hr className="my-3 border-1 border-zinc-800" />
        <SidebarItem
          icon={<Settings03Icon size={20} color="#ffffff" variant="stroke" />}
          text="Configuración"
          active={!!(urlActive === 'settings')}
          to="/teacher/settings"
        />
        <SidebarItem
          icon={
            <CustomerService01Icon size={20} color="#ffffff" variant="stroke" />
          }
          text="Ayuda"
        />
        <hr className="my-3 border-1 border-zinc-800" />
        <Button
          type="button"
          size="sm"
          className="bg-zinc-900 text-white rounded-lg px-6 py-2 text-xs font-bold shadow-sm hover:shadow-md flex items-center gap-2 w-full"
          onPress={logoutHandler}
          isLoading={formData}
        >
          <Door01Icon size={18} color="#ffffff" variant="stroke" />
          Cerrar Sesión
        </Button>
      </Sidebar>
      <section className="p-8 w-full bg-[#FAFBFD]">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                role={userInfo?.user?.user_rol}
                allowedRoles={['docente']}
              >
                <TeacherHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute
                role={userInfo?.user?.user_rol}
                allowedRoles={['docente']}
              >
                <TeacherSchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <ProtectedRoute
                role={userInfo?.user?.user_rol}
                allowedRoles={['docente']}
              >
                <TeacherClassPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                role={userInfo?.user?.user_rol}
                allowedRoles={['docente']}
              >
                <TeacherConfigPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default TeacherLayout;
