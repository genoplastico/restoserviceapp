import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { PublicLayout } from './components/layout/PublicLayout';
import { TrackOrder } from './pages/public/TrackOrder';
import { DashboardPage } from './pages/admin/DashboardPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { TechniciansPage } from './pages/admin/TechniciansPage';
import { AppointmentsPage } from './pages/admin/AppointmentsPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Navigate to="/track" replace />} />
          <Route path="track" element={<TrackOrder />} />
        </Route>

        {/* Ruta de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas del admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="technicians" element={<TechniciansPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;