export type TechnicianStatus = 'available' | 'busy' | 'off_duty';
export type Specialty = 'refrigeration' | 'washing' | 'cooking' | 'air_conditioning' | 'general';

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: TechnicianStatus;
  specialties: Specialty[];
  rating: number;
  activeOrders: number;
  totalCompletedOrders: number;
  joinedAt: Date;
  schedule?: {
    start: string;
    end: string;
    daysOff: number[];
  };
}