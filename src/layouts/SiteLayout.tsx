import React from 'react';
import { Outlet } from 'react-router-dom';

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default SiteLayout;
