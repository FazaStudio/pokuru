import React from 'react';
import { PAYMENT_METHODS } from '../../constants/paymentMethods';
import type { PaymentMethod } from '../../constants/paymentMethods';

interface PaymentMethodListProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  selectedMethod,
  onSelect,
}) => {
  return (
    <div className="absolute z-10 w-full mt-1.5 sm:mt-2 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`w-full flex items-center gap-2 p-2.5 sm:p-3 hover:bg-gray-700 transition-colors ${
            selectedMethod === method.id ? 'bg-gray-700' : ''
          }`}
        >
          <img src={method.icon} alt={method.name} className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm text-white">{method.name}</span>
        </button>
      ))}
    </div>
  );
};