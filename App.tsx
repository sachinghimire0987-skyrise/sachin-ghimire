import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from '@/layouts/SiteLayout';
import Index from '@/pages/Index'; // वा तपाईंको Landing Page Component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
