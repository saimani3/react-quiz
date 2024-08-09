// src/Navbar.js

import React, { useState } from 'react';
import './Navbar.css';  // Import the CSS file for styling

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className="navbar__logo">Quiz App</div>
      <ul className={`navbar__links ${isOpen ? 'show' : ''}`}>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      <div className="navbar__menu-icon" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
