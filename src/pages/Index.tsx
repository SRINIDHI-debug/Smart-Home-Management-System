
import React, { useState } from 'react';
import { SmartHomeProvider } from '@/contexts/SmartHomeContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SmartHomeProvider>
      <div className="flex h-screen bg-gray-50">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
        
        <div 
          className={`flex-1 overflow-auto pt-16 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Dashboard />
        </div>
      </div>
    </SmartHomeProvider>
  );
};

export default Index;
