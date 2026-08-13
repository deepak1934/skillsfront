import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <circle cx="11" cy="11" r="9" fill="none" stroke="var(--trail)" strokeWidth="1.4" />
          <path d="M14 8 L9.5 12.5 L8 14 L11.5 10.5 Z" fill="var(--trail)" />
        </svg>
        <span>LearnPath</span>
      </NavLink>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Explore
        </NavLink>
        <NavLink to="/shortest-path" className={({ isActive }) => (isActive ? "active" : "")}>
          Shortest path
        </NavLink>
      </nav>
    </header>
  );
}
