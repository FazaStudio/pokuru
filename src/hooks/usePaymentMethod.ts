import { useState } from 'react';

export function usePaymentMethod() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
  };
}