import { create } from 'zustand';
import { Technician, TechnicianStatus, Specialty } from '../types/technician';

interface TechnicianState {
  technicians: Technician[];
  loading: boolean;
  error: string | null;
  selectedTechnician: Technician | null;
  fetchTechnicians: () => Promise<void>;
  addTechnician: (technician: Omit<Technician, 'id' | 'joinedAt' | 'activeOrders' | 'totalCompletedOrders' | 'rating'>) => Promise<void>;
  updateTechnician: (id: string, updates: Partial<Technician>) => Promise<void>;
  deleteTechnician: (id: string) => Promise<void>;
  selectTechnician: (technician: Technician | null) => void;
}

// Datos de ejemplo
const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    email: 'carlos@restoservice.com',
    phone: '555-0101',
    status: 'available',
    specialties: ['refrigeration', 'air_conditioning'],
    rating: 4.8,
    activeOrders: 2,
    totalCompletedOrders: 145,
    joinedAt: new Date('2023-01-15'),
    schedule: {
      start: '09:00',
      end: '18:00',
      daysOff: [0, 6]
    }
  },
  {
    id: '2',
    name: 'Ana Martínez',
    email: 'ana@restoservice.com',
    phone: '555-0102',
    status: 'busy',
    specialties: ['washing', 'cooking'],
    rating: 4.9,
    activeOrders: 3,
    totalCompletedOrders: 167,
    joinedAt: new Date('2023-03-20'),
    schedule: {
      start: '08:00',
      end: '17:00',
      daysOff: [0, 6]
    }
  },
  {
    id: '3',
    name: 'Miguel Sánchez',
    email: 'miguel@restoservice.com',
    phone: '555-0103',
    status: 'available',
    specialties: ['refrigeration', 'washing', 'general'],
    rating: 4.7,
    activeOrders: 1,
    totalCompletedOrders: 98,
    joinedAt: new Date('2023-06-10'),
    schedule: {
      start: '10:00',
      end: '19:00',
      daysOff: [0, 6]
    }
  }
];

export const useTechnicianStore = create<TechnicianState>()((set) => ({
  technicians: [],
  loading: false,
  error: null,
  selectedTechnician: null,

  fetchTechnicians: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ technicians: mockTechnicians, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar los técnicos', loading: false });
    }
  },

  addTechnician: async (technicianData) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newTechnician: Technician = {
        ...technicianData,
        id: String(Date.now()),
        joinedAt: new Date(),
        activeOrders: 0,
        totalCompletedOrders: 0,
        rating: 0
      };
      set(state => ({
        technicians: [...state.technicians, newTechnician],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al agregar el técnico', loading: false });
    }
  },

  updateTechnician: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        technicians: state.technicians.map(tech =>
          tech.id === id ? { ...tech, ...updates } : tech
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al actualizar el técnico', loading: false });
    }
  },

  deleteTechnician: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        technicians: state.technicians.filter(tech => tech.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al eliminar el técnico', loading: false });
    }
  },

  selectTechnician: (technician) => {
    set({ selectedTechnician: technician });
  }
}));