import React, { useState } from 'react';
import './MyBurger.css';

const MyBurger = ({ onClick }) => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    onClick(!isActive);
  };

  return (
    <div className={isActive ? 'burger open' : 'burger'} onClick={handleToggle}>
      <span></span>
    </div>
  );
};

export default MyBurger;
