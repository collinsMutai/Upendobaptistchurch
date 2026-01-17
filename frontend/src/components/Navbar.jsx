import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
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

      {/* Slide Menu */}
      <ul className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
        <li><NavLink to="/events" onClick={closeMenu}>Events</NavLink></li>
        <li><NavLink to="/sermons" onClick={closeMenu}>Sermons</NavLink></li>
        <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
        <li><NavLink to="/give" onClick={closeMenu}>Give</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
      </ul>
    </nav>
  );
}
