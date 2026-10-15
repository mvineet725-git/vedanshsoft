import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useAuth } from "../../lib/AuthContext";
import "./AdminLayout.css";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/enquiries", label: "Enquiries", end: false },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Logo variant="light" />
        </div>
        <nav aria-label="Admin">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? "admin-nav-link is-active" : "admin-nav-link")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <span className="text-muted">Signed in as {user?.displayName || user?.email}</span>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            Log Out
          </button>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
