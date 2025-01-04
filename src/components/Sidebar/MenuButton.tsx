import React from 'react';

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <div className="menu-btn" onClick={onClick}>
      <i className="fas fa-bars"></i>
    </div>
  );
};

export default MenuButton;