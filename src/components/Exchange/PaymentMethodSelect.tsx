import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../../constants/paymentMethods';

interface PaymentMethodSelectProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedPaymentMethod = PAYMENT_METHODS.find(method => method.id === selectedMethod);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Payment Method
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
      >
        <div className="flex items-center gap-2">
          <img 
            src={selectedPaymentMethod?.icon} 
            alt={selectedPaymentMethod?.name} 
            className="w-6 h-6"
          />
          <span className="text-sm text-white">{selectedPaymentMethod?.name}</span>
        </div>
        <svg 
          className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                onSelect(method.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 p-3 hover:bg-gray-700 transition-colors ${
                selectedMethod === method.id ? 'bg-gray-700' : ''
              }`}
            >
              <img src={method.icon} alt={method.name} className="w-6 h-6" />
              <span className="text-sm text-white">{method.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};