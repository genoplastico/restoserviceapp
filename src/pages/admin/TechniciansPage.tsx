import React, { useEffect, useState } from 'react';
import { useTechnicianStore } from '../../stores/technicianStore';
import { Technician, TechnicianStatus, Specialty } from '../../types/technician';
import { Plus, Star, UserCheck, Clock, Search } from 'lucide-react';
import { TechnicianModal } from '../../components/technicians/TechnicianModal';

export const TechniciansPage: React.FC = () => {
  const { 
    technicians, 
    loading, 
    fetchTechnicians,
    selectedTechnician,
    selectTechnician
  } = useTechnicianStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  const handleOpenModal = (mode: 'create' | 'edit', technician?: Technician) => {
    setModalMode(mode);
    if (mode === 'edit' && technician) {
      selectTechnician(technician);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    selectTechnician(null);
  };

  const statusColors: Record<TechnicianStatus, string> = {
    available: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    off_duty: 'bg-gray-100 text-gray-800'
  };

  const statusLabels: Record<TechnicianStatus, string> = {
    available: 'Disponible',
    busy: 'Ocupado',
    off_duty: 'Fuera de servicio'
  };

  const specialtyLabels: Record<Specialty, string> = {
    refrigeration: 'Refrigeración',
    washing: 'Lavado',
    cooking: 'Cocina',
    air_conditioning: 'Aire Acondicionado',
    general: 'General'
  };

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Técnicos</h2>
          <button 
            onClick={() => handleOpenModal('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Técnico
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnicians.map((technician) => (
              <div
                key={technician.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleOpenModal('edit', technician)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{technician.name}</h3>
                    <p className="text-sm text-gray-500">{technician.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[technician.status]}`}>
                    {statusLabels[technician.status]}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <span>{technician.rating.toFixed(1)} ({technician.totalCompletedOrders} órdenes)</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <UserCheck className="h-4 w-4 text-blue-500 mr-2" />
                    <span>{technician.activeOrders} órdenes activas</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{technician.schedule?.start} - {technician.schedule?.end}</span>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-2">
                      {technician.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {specialtyLabels[specialty]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TechnicianModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        technician={selectedTechnician || undefined}
        mode={modalMode}
      />
    </>
  );
};