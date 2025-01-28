/* eslint-disable import/extensions */
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import {
  Home07Icon,
  UserGroupIcon,
  NoteIcon,
  Calendar03Icon,
  Settings03Icon,
  CustomerService01Icon
} from 'hugeicons-react';

import Sidebar, { SidebarItem } from '../components/Sidebar';

// pages
import HomePageDashboard from '../pages/dashboard/HomePageDashboard';
import SchedulePageDashboard from '../pages/dashboard/SchedulePageDashboard';
import ClassPageDashboard from '../pages/dashboard/ClassPageDashboard';
import ReportPageDashboard from '../pages/dashboard/ReportPageDashboard';
import ConfigPageDashboard from '../pages/dashboard/ConfigPageDashboard';
// items
import Classes from '../pages/dashboardItems/Classes';

function Dashboard() {
  const params = useParams();
  const urlActive = params['*'];

  return (
    <div className="flex flex-row w-full bg-[#FAFBFD]">
      <Sidebar>
        <SidebarItem
          icon={<Home07Icon size={20} color="#ffffff" variant="stroke" />}
          text="Inicio"
          active={!!(urlActive === 'dashboard' || urlActive === '')}
          to="/dashboard"
          // alert
        />
        <SidebarItem
          icon={<Calendar03Icon size={20} color="#ffffff" variant="stroke" />}
          text="Horarios"
          active={!!(urlActive === 'schedule')}
          to="/dashboard/schedule"
        />
        <SidebarItem
          icon={<UserGroupIcon size={20} color="#ffffff" variant="stroke" />}
          text="Clases"
          active={!!(urlActive === 'class')}
          to="/dashboard/class"
        />
        <SidebarItem
          icon={<NoteIcon size={20} color="#ffffff" variant="stroke" />}
          text="Reportes"
          active={!!(urlActive === 'report')}
          to="/dashboard/report"
        />
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
          <Route path="/" element={<HomePageDashboard />} />
          <Route path="schedule" element={<SchedulePageDashboard />} />
          <Route path="schedule/:id" element={<Classes />} />
          <Route path="class" element={<ClassPageDashboard />} />
          <Route path="class/:id" element={<Classes />} />
          <Route path="report" element={<ReportPageDashboard />} />
          <Route path="settings" element={<ConfigPageDashboard />} />
        </Routes>
      </section>
    </div>
  );
}

export default Dashboard;
