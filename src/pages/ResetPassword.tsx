import "../assets/styles/pages/login.css";
import { useEffect, useState, type SyntheticEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import FormField from "../components/forms/FormField";
import IconInput from "../components/forms/IconInput";
import { resetPassword } from "../services/auth";

/**
 * Renders the password reset form for valid reset links.
 */
export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Missing reset token.");
    }
  }, [token]);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Missing reset token.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a new password.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({ token, password: password.trim() });
      navigate("/login", { replace: true });
    } catch (err) {
      const nextMessage = err instanceof Error ? err.message : "Could not reset password. Please try again.";
      setError(nextMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login">
      <Helmet>
        <title>Set New Password — RoamRoute</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="login__text">
        <h1>Reset password</h1>
        <p>Choose a new password for your account.</p>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <FormField id="reset-password" label="New password" className="login__field" labelClassName="login__label">
          <IconInput
            id="reset-password"
            className="login__input"
            type="password"
            placeholder="*********"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            icon={LockClosedIcon}
            wrapperClassName="login__input-wrap"
            iconClassName="login__icon"
          />
        </FormField>

        {error ? <p role="alert">{error}</p> : null}

        <button type="submit" className="btn" disabled={loading || !token}>
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>

      <div className="login__signup">
        <p>
          Need a new link? <Link to="/forgot-password">Back to Forgot Password</Link>
        </p>
      </div>
    </main>
  );
}
