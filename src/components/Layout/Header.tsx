import React from 'react';
import { WalletDropdown } from '../Exchange/WalletDropdown';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/icons/logo.svg" 
              alt="Pokuru" 
              className="h-8 w-auto sm:h-10 md:h-12 transition-all" 
            />
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-['Audiowide']">
              POKURU
            </span>
          </div>
          <div className="w-[140px]">
            <WalletDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};