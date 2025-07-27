import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-green-800 font-bold"
      : "text-white hover:text-green-800";

  return (
    <nav className="bg-green-400 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-white">🌿 EcoChamp - "Be a waste warrior—put trash in the right bin!" 🌎✨

</div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav Links for Desktop */}
        <ul className="hidden md:flex gap-10 text-lg">
          <li><NavLink to="/" className={navLinkClass}>Game</NavLink></li>
          {/* <li><NavLink to="/FindItem" className={navLinkClass}>FindYourBin</NavLink></li>
          <li><NavLink to="/EcoPlanner" className={navLinkClass}>EcoPlanner</NavLink></li> */}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden px-6 pb-4 flex flex-col gap-4">
          <li><NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Game</NavLink></li>
          <li><NavLink to="/FindItem" className={navLinkClass} onClick={() => setIsOpen(false)}>FindYourBin</NavLink></li>
          <li><NavLink to="/EcoPlanner" className={navLinkClass} onClick={() => setIsOpen(false)}>EcoPlanner</NavLink></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
