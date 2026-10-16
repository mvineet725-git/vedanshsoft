import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { track } from "../lib/analytics";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/solutions", label: "Our Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="site-header-logo" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
                  onClick={() => setMenuOpen(false)}
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact?demo=true"
            className="btn btn-primary site-header-cta"
            onClick={() => {
              setMenuOpen(false);
              track("demo_cta_click", { page: "header" });
            }}
          >
            Request a Demo
          </Link>
        </nav>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
