
import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/auth/login";


function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="brand-logo">CT</div>

      <div className="brand-copy">
        <h2>CT UNIVERSITY</h2>
        <p>
          Learn <span>·</span> Grow <span>·</span> Excel
        </p>
      </div>

      {compact && (
        <img
          src="/ct-university-logo.jpg"
          alt="CT University, Punjab, India"
          className="login-header-logo"
        />
      )}
    </div>
  );
}


function Feature({ type, title, description, onFeatureClick, active }) {
  const icons = {
    cap: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m1 9 11-6 11 6-11 6L1 9Z" />
        <path d="M5 12v5c4 3 10 3 14 0v-5M22 10v7" />
      </svg>
    ),
    record: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v6h5M9 13h8M9 17h8" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2 9 4v6c0 5-4 8-9 10-5-2-9-5-9-10V6l9-4Z" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    ),
  };

  return (
    <article
      className={`feature-item ${active ? "feature-active" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={() => onFeatureClick(title)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onFeatureClick(title);
        }
      }}
    >
      <div className="feature-icon">{icons[type]}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function App() {
  const [email, setEmail] = useState(
    sessionStorage.getItem("rememberedEmail") || ""
  );


  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    Boolean(sessionStorage.getItem("rememberedEmail"))
  );

  const [formHighlighted, setFormHighlighted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFeatureClick() {
  setFormHighlighted(true);

  window.setTimeout(() => {
    setFormHighlighted(false);
  }, 250);
}

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      if (!data.token) {
        throw new Error(
          "The server did not return an authentication token."
        );
      }

      sessionStorage.setItem("token", data.token);

      if (rememberMe) {
        sessionStorage.setItem("rememberedEmail", email.trim());
      } else {
        sessionStorage.removeItem("rememberedEmail");
      }

      setPassword("");
      setError("");

      alert(
        "Login successful! Authentication is complete. Your dashboard can be connected next."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="exam-login">
      {/* LEFT: UNIVERSITY CAMPUS */}
      <section className="hero-panel">
        <div className="hero-background" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <Brand />

          <div className="hero-message">
            <p className="hero-eyebrow">
              CT UNIVERSITY EXAMINATION PORTAL
            </p>

            <span className="gold-accent" />

            <h1>
              Your Performance
              <br />
              <span>Our Priority</span>
            </h1>

            <p className="hero-description">
              Access your examination results, academic records
              and important updates — all in one place.
            </p>
          </div>

          {/* CLICKABLE FEATURE CARDS */}
          <div className="feature-list">
            <Feature
              type="cap"
              title="View Results"
              description={
                <>
                  Get your results
                  <br />
                  instantly
                </>
              }
              onFeatureClick={handleFeatureClick}
            />

            <Feature
              type="record"
              title="Academic Records"
              description={
                <>
                  Track your
                  <br />
                  progress
                </>
              }
              onFeatureClick={handleFeatureClick}
            />

            <Feature
              type="shield"
              title="Secure & Reliable"
              description={
                <>
                  Your data,
                  <br />
                  our responsibility
                </>
              }
              onFeatureClick={handleFeatureClick}
            />
          </div>

          <div className="hero-bottom">
            <div className="campus-location">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-8 8-13a8 8 0 1 0-16 0c0 5 8 13 8 13Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>

              <div>
                <strong>CT University</strong>
                <span>Ludhiana, Punjab, India</span>
              </div>
            </div>

            <div className="education-tagline">
              <span>Excellence in Education</span>
              <i />
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT: SINGLE LOGIN FORM */}
      <section className="form-panel">
  <div
    className={`login-card ${formHighlighted ? "form-highlighted" : ""}`}
  >
          <Brand compact />

          <div className="login-heading">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

      

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5c0-3-4-5.5-9-5.5Z" />
                </svg>
                Email / Username
              </label>

              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your university email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="12" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                Password
              </label>

              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="5" y="10" width="14" height="12" rx="3" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 3 21 21M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A11 11 0 0 1 12 5c5 0 9 5 10 7-.5 1-1.5 2.3-3 3.5M6.2 6.2C3.9 7.7 2.5 9.6 2 12c1 2 5 7 10 7 1 0 2-.2 2.9-.6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setError(
                    "Please contact your university administrator to reset your password."
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="sign-in-button"
              disabled={loading}
            >
              <span>{loading ? "Logging in..." : "Login"}</span>

              {!loading && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>

          <p className="contact-admin">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() =>
                setError(
                  "Please contact your university administrator for account assistance."
                )
              }
            >
              Contact your administrator
            </button>
          </p>

          <div className="security-note">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="10" width="16" height="12" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <span>Secure access for authorized users</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
