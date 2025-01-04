import React from 'react';
import MenuItem from './MenuItem';

const Navigation: React.FC = () => {
  const menuItems = [
    { icon: 'fas fa-tachometer-alt', text: 'Dashboard', active: true },
    { icon: 'fas fa-chart-bar', text: 'Analytics' },
    { icon: 'fas fa-chart-pie', text: 'Charts' }
  ];

  return (
    <div className="nav">
      <div className="menu">
        <p className="title">Main</p>
        <ul>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.active}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;