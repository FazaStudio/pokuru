import React from 'react';
import UserProfile from './UserProfile';
import Navigation from './Navigation';
import MenuButton from './MenuButton';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <nav className={`sidebar ${isOpen ? 'active' : ''}`}>
      <MenuButton onClick={onToggle} />
      <UserProfile />
      <Navigation />
    </nav>
  );
};

export default Sidebar;