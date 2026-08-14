import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from '@/layouts/SiteLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';

// Pages
import Landing from '@/pages/Landing';
import Projects from '@/pages/Projects';
import Articles from '@/pages/Articles';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

// Admin Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminOverview from '@/pages/admin/AdminOverview';
import AdminArticles from '@/pages/admin/AdminArticles';
import AdminArticleEditor from '@/pages/admin/AdminArticleEditor';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminProjectEditor from '@/pages/admin/AdminProjectEditor';
import AdminMessages from '@/pages/admin/AdminMessages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<Landing />} />
          <Route path="projects" element={<Projects />} />
          <Route path="articles" element={<Articles />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><SiteLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="articles/new" element={<AdminArticleEditor />} />
          <Route path="articles/edit/:id" element={<AdminArticleEditor />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectEditor />} />
          <Route path="projects/edit/:id" element={<AdminProjectEditor />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
