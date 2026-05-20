import "../assets/styles/pages/login.css";
import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import FormField from "../components/forms/FormField";
import IconInput from "../components/forms/IconInput";
import { requestPasswordReset } from "../services/auth";

/**
 * Renders the password reset request form.
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      await requestPasswordReset({ email: email.trim() });
      setMessage("If an account exists for this email, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      const nextMessage = err instanceof Error ? err.message : "Could not request password reset. Please try again.";
      setError(nextMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login">
      <div className="login__hero-bg" aria-hidden="true" />
      <div className="login__text">
        <h1>Forgot password</h1>
        <p>Enter your email address and we’ll send you a reset link.</p>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <FormField id="forgot-email" label="Email address" className="login__field" labelClassName="login__label">
          <IconInput
            id="forgot-email"
            className="login__input"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            icon={EnvelopeIcon}
            wrapperClassName="login__input-wrap"
            iconClassName="login__icon"
          />
        </FormField>

        {error ? <p role="alert">{error}</p> : null}
        {message ? <p role="status">{message}</p> : null}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Sending link..." : "Send reset link"}
        </button>
      </form>

      <div className="login__signup">
        <p>
          Remembered it? <Link to="/login">Back to Sign In</Link>
        </p>
      </div>
    </main>
  );
}
