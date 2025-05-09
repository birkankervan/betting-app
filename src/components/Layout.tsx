import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-primary,theme(colors.gray.100))]">
      <Navbar />
      <main className="flex-1 flex flex-col px-4 py-6 md:px-8 md:py-10 mt-6 md:mt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default React.memo(Layout);
