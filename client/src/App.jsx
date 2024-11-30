/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import React from 'react';
// Supports weights 100-900
import '@fontsource-variable/inter';
import {
  Calendar1,
  LifeBuoy,
  NotebookPen,
  School2,
  Settings,
  Users
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar, { SidebarItem } from './component/Sidebar';

// pages
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="flex flex-row w-full bg-[#1c1d1e]">
      <Router>
        <Sidebar>
          <SidebarItem
            icon={<School2 size={20} />}
            text="Inicio"
            active
            to="/"
            alert
          />
          <SidebarItem icon={<NotebookPen size={20} />} text="Reportes" />
          <SidebarItem icon={<Users size={20} />} text="Clases" />
          <SidebarItem icon={<Calendar1 size={20} />} text="Horarios" />
          <hr className="my-3 border-1 border-zinc-800" />
          <SidebarItem icon={<Settings size={20} />} text="Configuracion" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Ayuda" />
        </Sidebar>
        <section className="p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
