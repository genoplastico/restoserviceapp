export type OrderStatus = 
  | 'pending' // Pendiente de asignación
  | 'diagnosed' // Diagnóstico realizado
  | 'budgeted' // Presupuesto enviado
  | 'approved' // Presupuesto aprobado
  | 'in_repair' // En reparación
  | 'waiting_parts' // Esperando repuestos
  | 'completed' // Reparación completada
  | 'delivered' // Entregado al cliente
  | 'cancelled'; // Cancelado

export type OrderPriority = 'low' | 'medium' | 'high';

export type ServiceType = 'workshop' | 'home';

export type ApplianceType = 
  | 'refrigerator'
  | 'washer'
  | 'dryer'
  | 'dishwasher'
  | 'oven'
  | 'microwave'
  | 'stove'
  | 'air_conditioner'
  | 'other';

export interface RepairOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;
  applianceType: ApplianceType;
  brand: string;
  model: string;
  serialNumber?: string;
  problem: string;
  status: OrderStatus;
  priority: OrderPriority;
  serviceType: ServiceType;
  technicianId?: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
  diagnosisNotes?: string;
  completedAt?: Date;
  budget?: {
    amount: number;
    details: string;
    createdAt: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
  };
  photos: string[];
  rating?: number;
  review?: string;
  warranty?: {
    startDate: Date;
    endDate: Date;
    details: string;
  };
}