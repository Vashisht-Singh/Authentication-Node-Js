
import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // Store the token only after a successful login.
      if (data.token) {
        sessionStorage.setItem("authToken", data.token);
      }

      // Keep the user's choice for this browser session.
      if (rememberMe) {
        sessionStorage.setItem("rememberUsername", username.trim());
      } else {
        sessionStorage.removeItem("rememberUsername");
      }

      // Temporary success message until dashboards are implemented.
      setError("");
      alert(
        `Login successful! Welcome ${
          data.user?.username || username.trim()
        }. Your dashboard will be connected in the next step.`
      );
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="campus-background" />

      <div className="login-layout">
        <section className="brand-section">
          <div className="university-brand">
            <div className="university-emblem">CT</div>
            <div>
              <h2>CT UNIVERSITY</h2>
              <p>Learn · Grow · Excel</p>
            </div>
          </div>

          <div className="brand-message">
            <span className="eyebrow">UNIVERSITY ERP PORTAL</span>
            <h1>
              Examination
              <br />
              Result Management
              <br />
              System
            </h1>
            <p>
              Streamlining academic excellence
              <br />
              through technology.
            </p>
          </div>

          <p className="brand-footer">
            A smarter way to manage academic results.
          </p>
        </section>

        <section className="login-section">
          <div className="login-card">
            <div className="mobile-brand">
              <div className="university-emblem">CT</div>
              <span>CT UNIVERSITY</span>
            </div>

            <div className="login-heading">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Email / Username</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    ♙
                  </span>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your email or username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    ♙
                  </span>
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
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
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
                <div className="error-message" role="alert">
                  {error}
                </div>
              )}

              <button className="login-button" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="contact-note">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setError(
                    "Please contact your university administrator for account access."
                  )
                }
              >
                Contact your administrator
              </button>
            </p>

            <div className="security-note">
              <span aria-hidden="true">●</span>
              Secure access for authorized users
            </div>
          </div>
        </section>
      </div>

      <footer className="page-footer">
        © {new Date().getFullYear()} CT University · Examination Result
        Management System
      </footer>
    </main>
  );
}

export default App;
