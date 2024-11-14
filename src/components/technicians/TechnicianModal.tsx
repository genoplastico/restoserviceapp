import React from 'react';
import { X } from 'lucide-react';
import { Technician, Specialty } from '../../types/technician';
import { TechnicianForm } from './TechnicianForm';

interface TechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  technician?: Technician;
  mode: 'create' | 'edit';
}

export const TechnicianModal: React.FC<TechnicianModalProps> = ({
  isOpen,
  onClose,
  technician,
  mode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg w-full max-w-2xl mx-auto shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Nuevo Técnico' : 'Editar Técnico'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <TechnicianForm
              technician={technician}
              onSubmit={(data) => {
                console.log('Form submitted:', data);
                onClose();
              }}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};