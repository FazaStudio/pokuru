import React from 'react';

interface ButtonProps {
  onClick: () => void;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  icon, 
  children, 
  className = "bg-primary-600 hover:bg-primary-500",
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg text-white transition-all duration-200 ${
        disabled 
          ? 'bg-dark-600 cursor-not-allowed opacity-50' 
          : `${className} shadow-lg hover:shadow-primary-500/25`
      }`}
    >
      {icon && <img src={icon} alt="icon" className="w-6 h-6" />}
      {children}
    </button>
  );
};