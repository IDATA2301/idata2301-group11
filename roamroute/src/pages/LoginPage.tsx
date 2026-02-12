import "./styling/LoginPage.css"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"

export default function LoginPage() {
  return (
    <>
      <div className="login-text">
        <h1>Welcome back</h1>
        <p>Sign in to manage your travel plan and explore new destinations.</p>
      </div>

      {/* Login form */}
      <form className="login-form">
        <label className="email-label" htmlFor="login-email">
          Email address
        </label>
        <div className="input-with-icon">
          <EnvelopeIcon className="login-icon" aria-hidden="true" />
          <input 
            id="login-email"
            type="email" 
            placeholder="name@example.com"
          />
        </div>
        <label className="password-label" htmlFor="login-password">
          Password
        </label>
        <div className="input-with-icon">
          <LockClosedIcon className="login-icon" aria-hidden="true" />
          <input 
            id="login-password"
            type="password" 
            placeholder="*********"
          />
        </div>
        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit">Sign In</button>
      </form>

      {/* Additional links */}
      <div className="signup-link">
        <p>
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </>
  )
}