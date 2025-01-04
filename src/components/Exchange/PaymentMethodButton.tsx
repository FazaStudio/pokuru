import React from 'react';
import { PAYMENT_METHODS } from '../../constants/paymentMethods';
import type { PaymentMethod } from '../../constants/paymentMethods';

interface PaymentMethodButtonProps {
  selectedMethod: PaymentMethod;
  isOpen: boolean;
  onClick: () => void;
}

export const PaymentMethodButton: React.FC<PaymentMethodButtonProps> = ({
  selectedMethod,
  isOpen,
  onClick,
}) => {
  const selectedPaymentMethod = PAYMENT_METHODS.find(method => method.id === selectedMethod);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
    >
      <div className="flex items-center gap-2">
        <img 
          src={selectedPaymentMethod?.icon} 
          alt={selectedPaymentMethod?.name} 
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        <span className="text-xs sm:text-sm text-white">{selectedPaymentMethod?.name}</span>
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
  );
};