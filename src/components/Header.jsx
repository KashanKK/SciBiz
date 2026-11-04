import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

function linkClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          SciBiz
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/science" className={linkClass}>
            Science
          </NavLink>
          <NavLink to="/business" className={linkClass}>
            Business
          </NavLink>
          <NavLink to="/register" className={linkClass}>
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
