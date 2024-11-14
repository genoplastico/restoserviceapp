import React, { useEffect, useState } from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { OrderStatus, OrderPriority, ServiceType, ApplianceType } from '../../types/order';
import { Filter, Plus, Search, Wrench, Home } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  // ... rest of the imports and component code remains the same ...

  return (
    <div className="space-y-6">
      {/* ... previous JSX remains the same until the serviceType icon ... */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-gray-500">
          {order.serviceType === 'home' ? (
            <Home className="h-5 w-5" />
          ) : (
            <Wrench className="h-5 w-5" />
          )}
          <span className="ml-2">{serviceTypeLabels[order.serviceType]}</span>
        </div>
      </td>
      {/* ... rest of the JSX remains the same ... */}
    </div>
  );
};