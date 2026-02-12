import "./styling/Signup.css"
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"

export default function Signup() {
  return (
    <>
      <div className="signup-text">
        <h1>Create an Account</h1>
        <p>Sign up to start planning your travel adventures.</p>
      </div>

      {/* Signup form */}
      <form className="signup-form">
        <div className="form-field">
          <label htmlFor="full-name" className="form-label-name">
            Full name
          </label>
          <div className="input-with-icon">
            <UserIcon className="signup-icon" aria-hidden="true" />
            <input
              type="text"
              id="full-name"
              className="form-input"
              placeholder="Full name"
              name="fullName"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label-email">
            E-mail
          </label>
          <div className="input-with-icon">
            <EnvelopeIcon className="signup-icon" aria-hidden="true" />
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="name@example.com"
              name="email"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label-password">
            Password
          </label>
          <div className="input-with-icon">
            <LockClosedIcon className="signup-icon" aria-hidden="true" />
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="*********"
              name="password"
              required
            />
          </div>
        </div>
        <button className="submit" type="submit">Sign Up</button>
      </form>

      {/* Additional links */}
      <div className="login-link">
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </>
  )
} 