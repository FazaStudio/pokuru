import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="head">
      <div className="user-img">
        <img src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg" alt="user" />
      </div>
      <div className="user-details">
        <p className="title">Web Developer</p>
        <p className="name">John Doe</p>
      </div>
    </div>
  );
};

export default UserProfile;