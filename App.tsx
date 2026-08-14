import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './src/layouts/SiteLayout';
import ProtectedRoute from './src/routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<div className="p-8 font-sans">Welcome to Sachin Ghimire Site</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
