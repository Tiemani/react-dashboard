import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Monitored Search System</div>
      <ul className="navbar-links">
        <li><a href="#map">Map</a></li>
        <li><a href="#reports">Reports</a></li>
        <li><a href="#incidents">Incidents</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;