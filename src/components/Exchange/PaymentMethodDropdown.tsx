import React from 'react';
import { PaymentMethodButton } from './PaymentMethodButton';
import { PaymentMethodList } from './PaymentMethodList';
import { usePaymentMethod } from '../../hooks/usePaymentMethod';
import type { PaymentMethod } from '../../constants/paymentMethods';

interface PaymentMethodDropdownProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodDropdown: React.FC<PaymentMethodDropdownProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const { isOpen, toggleDropdown, closeDropdown } = usePaymentMethod();

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Payment Method
      </label>
      <PaymentMethodButton
        selectedMethod={selectedMethod}
        isOpen={isOpen}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <PaymentMethodList
          selectedMethod={selectedMethod}
          onSelect={(method) => {
            onSelect(method);
            closeDropdown();
          }}
        />
      )}
    </div>
  );
};