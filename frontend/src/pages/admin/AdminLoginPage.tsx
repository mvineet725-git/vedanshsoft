import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useAuth, ApiError } from "../../lib/AuthContext";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to sign in right now. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <Logo />
        </div>
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Admin Sign In</h1>
        <p className="text-muted" style={{ marginTop: "var(--space-2)", marginBottom: "var(--space-6)" }}>
          Sign in to manage enquiries and view the dashboard.
        </p>

        {error && (
          <div className="alert alert-error" role="alert" style={{ marginBottom: "var(--space-5)" }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
