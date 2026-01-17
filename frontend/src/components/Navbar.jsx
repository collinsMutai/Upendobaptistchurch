// Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
        {/* Top Info Bar */}
      <div className="top-nav">
        <div className="top-nav__left">
          {/* Location */}
          <span className="icon">{/* Location SVG */} 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829"/>
              <path d="M8 7l0 .01"/>
              <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829"/>
              <path d="M16 15l0 .01"/>
            </svg>
          </span>
          <span>123 Church St, Springfield</span>
          <span className="divider">|</span>
          {/* Time */}
          <span className="icon">{/* Clock SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
              <path d="M12 7v5"/>
              <path d="M12 12l2 -3"/>
            </svg>
          </span>
          <span>Sundays 9:00 & 11:00 AM</span>
        </div>

        <div className="top-nav__right">
          {/* Social Icons */}
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8"/>
              <path d="M10 9l5 3l-5 3l0 -6"/>
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/>
              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/>
            </svg>
          </a>
        </div>
      </div>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar__logo">
          <NavLink to="/" onClick={closeMenu}>
            MyChurch
          </NavLink>
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </div>
{/* Overlay */}
<div
  className={`menu-overlay ${isOpen ? "show" : ""}`}
  onClick={() => setIsOpen(false)}
></div>
        {/* Slide Menu */}
        <ul className={`mobile-menu ${isOpen ? "show" : ""}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/events" onClick={closeMenu}>Events</NavLink></li>
          <li><NavLink to="/sermons" onClick={closeMenu}>Sermons</NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
          <li><NavLink to="/give" onClick={closeMenu}>Give</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>

          {/* Mobile Social Icons */}
          <li className="mobile-social">
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" /><path d="M10 9l5 3l-5 3l0 -6" /></svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
