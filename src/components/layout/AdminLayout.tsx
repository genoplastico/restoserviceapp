import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  ClipboardList, 
  Users, 
  Calendar,
  LogOut,
  BarChart
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const AdminLayout: React.FC = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-800">
        <div className="flex items-center h-16 px-4 bg-blue-900">
          <Wrench className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-bold text-white">RestoService</span>
        </div>
        <nav className="mt-5 px-2">
          <Link to="/admin" className="group flex items-center px-2 py-2 text-white hover:bg-blue-700 rounded-md">
            <ClipboardList className="mr-3 h-6 w-6" />
            Órdenes
          </Link>
          <Link to="/admin/appointments" className="group flex items-center px-2 py-2 text-white hover:bg-blue-700 rounded-md">
            <Calendar className="mr-3 h-6 w-6" />
            Citas
          </Link>
          <Link to="/admin/technicians" className="group flex items-center px-2 py-2 text-white hover:bg-blue-700 rounded-md">
            <Users className="mr-3 h-6 w-6" />
            Técnicos
          </Link>
          <Link to="/admin/reports" className="group flex items-center px-2 py-2 text-white hover:bg-blue-700 rounded-md">
            <BarChart className="mr-3 h-6 w-6" />
            Reportes
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Panel de Administración</h1>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Salir
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};