import React from 'react';

interface WalletSectionProps {
  title: string;
  children: React.ReactNode;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-gray-400">{title} wallet</h3>
      {children}
    </div>
  );
};