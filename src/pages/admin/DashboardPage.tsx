import React, { useEffect } from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { 
  ClipboardList, 
  Clock, 
  Wrench, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Home
} from 'lucide-react';
import { OrderStatus, ServiceType, ApplianceType } from '../../types/order';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { orders, fetchOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => ['diagnosed', 'in_repair', 'waiting_parts'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'completed').length,
    urgent: orders.filter(o => o.priority === 'high').length,
  };

  const StatCard = ({ title, value, icon: Icon, color }: { 
    title: string; 
    value: number; 
    icon: React.ElementType; 
    color: string;
  }) => (
    <div className={`bg-white rounded-lg shadow p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold mt-2">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Órdenes"
          value={stats.total}
          icon={ClipboardList}
          color="border-l-4 border-blue-500"
        />
        <StatCard
          title="Pendientes"
          value={stats.pending}
          icon={Clock}
          color="border-l-4 border-yellow-500"
        />
        <StatCard
          title="En Progreso"
          value={stats.inProgress}
          icon={Wrench}
          color="border-l-4 border-indigo-500"
        />
        <StatCard
          title="Completadas"
          value={stats.completed}
          icon={CheckCircle}
          color="border-l-4 border-green-500"
        />
      </div>

      {stats.urgent > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <p className="text-red-700">
              Hay {stats.urgent} órdenes de alta prioridad que requieren atención inmediata
            </p>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Órdenes Recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-500">
                      {order.serviceType === 'home' ? (
                        <Home className="h-5 w-5 mr-2" />
                      ) : (
                        <Wrench className="h-5 w-5 mr-2" />
                      )}
                      <span>{order.serviceType === 'home' ? 'Domicilio' : 'Taller'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};