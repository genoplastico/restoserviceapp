import { create } from 'zustand';
import { RepairOrder, OrderFilters } from '../types/order';

interface OrderState {
  orders: RepairOrder[];
  filters: OrderFilters;
  loading: boolean;
  error: string | null;
  setFilters: (filters: OrderFilters) => void;
  fetchOrders: () => Promise<void>;
  fetchTechnicianOrders: (technicianId: string) => Promise<RepairOrder[]>;
  createOrder: (order: Omit<RepairOrder, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateOrder: (id: string, updates: Partial<RepairOrder>) => Promise<void>;
  getOrderByNumber: (orderNumber: string) => Promise<RepairOrder | null>;
}

// Simulación de órdenes de ejemplo
const mockOrders: RepairOrder[] = [
  {
    id: '1',
    orderNumber: 'REP-2024-001',
    clientName: 'Juan Pérez',
    clientPhone: '555-0123',
    clientEmail: 'juan@example.com',
    address: 'Calle Principal 123',
    applianceType: 'refrigerator',
    brand: 'Samsung',
    model: 'RT38K5982SL',
    problem: 'No enfría correctamente',
    status: 'completed',
    priority: 'medium',
    serviceType: 'workshop',
    technicianId: '1', // Carlos Rodríguez
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-17'),
    completedAt: new Date('2024-01-17'),
    diagnosisNotes: 'Fuga de refrigerante, se realizó recarga y sellado',
    budget: {
      amount: 250,
      details: 'Recarga de gas refrigerante y reparación de fuga',
      createdAt: new Date('2024-01-15'),
      approvedAt: new Date('2024-01-16')
    },
    photos: [],
    rating: 5,
    review: 'Excelente servicio, muy profesional'
  },
  {
    id: '2',
    orderNumber: 'REP-2024-002',
    clientName: 'María González',
    clientPhone: '555-0124',
    clientEmail: 'maria@example.com',
    address: 'Av. Libertad 456',
    applianceType: 'washer',
    brand: 'LG',
    model: 'WM3400CW',
    problem: 'No drena el agua',
    status: 'in_repair',
    priority: 'high',
    serviceType: 'workshop',
    technicianId: '2', // Ana Martínez
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-11'),
    diagnosisNotes: 'Bomba de drenaje obstruida',
    photos: [],
  },
  {
    id: '3',
    orderNumber: 'REP-2024-003',
    clientName: 'Roberto Sánchez',
    clientPhone: '555-0125',
    clientEmail: 'roberto@example.com',
    address: 'Plaza Central 789',
    applianceType: 'refrigerator',
    brand: 'Whirlpool',
    model: 'WRX735SDHZ',
    problem: 'Hace ruido excesivo',
    status: 'completed',
    priority: 'medium',
    serviceType: 'home',
    technicianId: '1', // Carlos Rodríguez
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-22'),
    completedAt: new Date('2024-02-22'),
    diagnosisNotes: 'Ventilador del condensador dañado, se reemplazó',
    budget: {
      amount: 180,
      details: 'Reemplazo de ventilador y servicio a domicilio',
      createdAt: new Date('2024-02-20'),
      approvedAt: new Date('2024-02-21')
    },
    photos: [],
    rating: 4,
    review: 'Buen servicio, resolvieron el problema rápidamente'
  },
  {
    id: '4',
    orderNumber: 'REP-2024-004',
    clientName: 'Laura Torres',
    clientPhone: '555-0126',
    clientEmail: 'laura@example.com',
    address: 'Calle Norte 321',
    applianceType: 'oven',
    brand: 'GE',
    model: 'JB655YKFS',
    problem: 'No calienta uniformemente',
    status: 'diagnosed',
    priority: 'low',
    serviceType: 'workshop',
    technicianId: '2', // Ana Martínez
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-16'),
    diagnosisNotes: 'Elemento calefactor inferior defectuoso',
    photos: [],
    budget: {
      amount: 200,
      details: 'Reemplazo de elemento calefactor',
      createdAt: new Date('2024-03-16')
    }
  },
  {
    id: '5',
    orderNumber: 'REP-2024-005',
    clientName: 'Pedro Ramírez',
    clientPhone: '555-0127',
    clientEmail: 'pedro@example.com',
    address: 'Av. Sur 654',
    applianceType: 'washing',
    brand: 'Samsung',
    model: 'WF45T6000AW',
    problem: 'No inicia el ciclo de lavado',
    status: 'in_repair',
    priority: 'medium',
    serviceType: 'workshop',
    technicianId: '3', // Miguel Sánchez
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-19'),
    diagnosisNotes: 'Tarjeta de control defectuosa',
    photos: [],
    budget: {
      amount: 300,
      details: 'Reemplazo de tarjeta de control',
      createdAt: new Date('2024-03-19'),
      approvedAt: new Date('2024-03-19')
    }
  }
];

export const useOrderStore = create<OrderState>()((set, get) => ({
  orders: [],
  filters: {},
  loading: false,
  error: null,

  setFilters: (filters) => set({ filters }),

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ orders: mockOrders, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar las órdenes', loading: false });
    }
  },

  fetchTechnicianOrders: async (technicianId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockOrders.filter(order => order.technicianId === technicianId);
    } catch (error) {
      console.error('Error al cargar las órdenes del técnico:', error);
      return [];
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newOrder: RepairOrder = {
        ...orderData,
        id: String(Date.now()),
        orderNumber: `REP-${new Date().getFullYear()}-${String(mockOrders.length + 1).padStart(3, '0')}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      set(state => ({
        orders: [...state.orders, newOrder],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al crear la orden', loading: false });
    }
  },

  updateOrder: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        orders: state.orders.map(order =>
          order.id === id ? { ...order, ...updates, updatedAt: new Date() } : order
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al actualizar la orden', loading: false });
    }
  },

  getOrderByNumber: async (orderNumber) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockOrders.find(order => order.orderNumber === orderNumber) || null;
    } catch (error) {
      return null;
    }
  }
}));