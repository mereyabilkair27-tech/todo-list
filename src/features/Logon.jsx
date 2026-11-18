import { useState } from "react";

function Logon({ onSetEmail, onSetToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleLogon(event) {
    event.preventDefault();
    setAuthError("");
    setIsLoggingOn(true);

    try {
      const response = await fetch("/api/users/logon", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.email || !data.csrfToken) {
        throw new Error(data.message || "Unable to log in.");
      }

      onSetEmail(data.email);
      onSetToken(data.csrfToken);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <main>
      <h1>Log In</h1>

      {authError && <p role="alert">{authError}</p>}

      <form onSubmit={handleLogon}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in..." : "Log On"}
        </button>
      </form>
    </main>
  );
}

export default Logon;
