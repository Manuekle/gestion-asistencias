import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Calendar03Icon,
  Settings03Icon,
  CustomerService01Icon,
  Door01Icon,
  Home01Icon
} from 'hugeicons-react';
import { Button } from '@heroui/react';

import Sidebar, { SidebarItem } from '../components/Sidebar';
import ProtectedRoute from '../components/ProtectedRoute';

// pages
import StudentHomePage from '../pages/student/StudentHomePage';
import StudentSchedulePage from '../pages/student/StudentSchedulePage';
import StudentConfigPage from '../pages/student/StudentConfigPage';

function StudentLayout() {
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
    if (userRole !== 'estudiante') {
      navigate('/', { replace: true });
      return;
    }

    setIsLoading(false);
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    setFormData(true);
    localStorage.removeItem('userInfo');
    navigate('/auth/estudiante/login', { replace: true });
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
          icon={<Home01Icon size={20} color="#ffffff" variant="stroke" />}
          text="Inicio"
          active={!!(urlActive === '')}
          to="/student"
        />
        <SidebarItem
          icon={<Calendar03Icon size={20} color="#ffffff" variant="stroke" />}
          text="Horarios"
          active={!!(urlActive === 'schedule')}
          to="/student/schedule"
        />
        <hr className="my-3 border-1 border-zinc-800" />
        <SidebarItem
          icon={<Settings03Icon size={20} color="#ffffff" variant="stroke" />}
          text="Configuración"
          active={!!(urlActive === 'settings')}
          to="/student/settings"
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
                role={userInfo?.user?.user_rol}
                allowedRoles={['estudiante']}
              >
                <StudentHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute
                role={userInfo?.user?.user_rol}
                allowedRoles={['estudiante']}
              >
                <StudentSchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                role={userInfo?.user?.user_rol}
                allowedRoles={['estudiante']}
              >
                <StudentConfigPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default StudentLayout;
