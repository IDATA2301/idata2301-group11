import "../assets/styles/pages/login.css"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"

export default function LoginPage() {
  return (
    <main className="login">
      <div className="login__text">
        <h1>Welcome back</h1>
        <p>Sign in to manage your travel plan and explore new destinations.</p>
      </div>

      {/* Login form */}
      <form className="login__form">
        <div className="login__field">
          <label className="login__label" htmlFor="login-email">
          Email address
          </label>
          <div className="login__input-wrap">
            <EnvelopeIcon className="login__icon" aria-hidden="true" />
            <input
              id="login-email"
              className="login__input"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="login__field">
          <label className="login__label" htmlFor="login-password">
            Password
          </label>
          <div className="login__input-wrap">
            <LockClosedIcon className="login__icon" aria-hidden="true" />
            <input
              id="login-password"
              className="login__input"
              type="password"
              placeholder="*********"
              autoComplete="current-password"
            />
          </div>
        </div>
        <div className="login__forgot">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className="btn">Sign In</button>
      </form>

      {/* Additional links */}
      <div className="login__signup">
        <p>
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </main>
  )
}
