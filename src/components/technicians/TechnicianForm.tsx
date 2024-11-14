import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Technician, Specialty, TechnicianStatus } from '../../types/technician';

const specialtyOptions: { value: Specialty; label: string }[] = [
  { value: 'refrigeration', label: 'Refrigeración' },
  { value: 'washing', label: 'Lavado' },
  { value: 'cooking', label: 'Cocina' },
  { value: 'air_conditioning', label: 'Aire Acondicionado' },
  { value: 'general', label: 'General' },
];

const technicianSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  status: z.enum(['available', 'busy', 'off_duty']),
  specialties: z.array(z.enum(['refrigeration', 'washing', 'cooking', 'air_conditioning', 'general']))
    .min(1, 'Seleccione al menos una especialidad'),
  schedule: z.object({
    start: z.string(),
    end: z.string(),
    daysOff: z.array(z.number())
  })
});

type TechnicianFormData = z.infer<typeof technicianSchema>;

interface TechnicianFormProps {
  technician?: Technician;
  onSubmit: (data: TechnicianFormData) => void;
  onCancel: () => void;
}

export const TechnicianForm: React.FC<TechnicianFormProps> = ({
  technician,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<TechnicianFormData>({
    resolver: zodResolver(technicianSchema),
    defaultValues: technician || {
      status: 'available',
      specialties: [],
      schedule: {
        start: '09:00',
        end: '18:00',
        daysOff: [0, 6]
      }
    }
  });

  const watchSpecialties = watch('specialties');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="available">Disponible</option>
          <option value="busy">Ocupado</option>
          <option value="off_duty">Fuera de servicio</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Especialidades
        </label>
        <div className="space-y-2">
          {specialtyOptions.map((specialty) => (
            <label key={specialty.value} className="flex items-center">
              <input
                type="checkbox"
                value={specialty.value}
                checked={watchSpecialties?.includes(specialty.value)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const currentSpecialties = watchSpecialties || [];
                  setValue(
                    'specialties',
                    checked
                      ? [...currentSpecialties, specialty.value]
                      : currentSpecialties.filter((s) => s !== specialty.value)
                  );
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{specialty.label}</span>
            </label>
          ))}
        </div>
        {errors.specialties && (
          <p className="mt-1 text-sm text-red-600">{errors.specialties.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hora de inicio
          </label>
          <input
            type="time"
            {...register('schedule.start')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hora de fin
          </label>
          <input
            type="time"
            {...register('schedule.end')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};