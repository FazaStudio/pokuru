import React from 'react';

interface MenuItemProps {
  icon: string;
  text: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, active }) => {
  return (
    <li className={active ? 'active' : ''}>
      <i className={icon}></i>
      <span>{text}</span>
    </li>
  );
};

export default MenuItem;