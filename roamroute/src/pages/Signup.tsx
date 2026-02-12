import "../assets/styles/pages/signup.css"
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"

export default function Signup() {
  return (
    <main className="signup">
      <div className="signup__text">
        <h1>Create an Account</h1>
        <p>Sign up to start planning your travel adventures.</p>
      </div>

      {/* Signup form */}
      <form className="signup__form">
        <div className="signup__field">
          <label htmlFor="signup-full-name" className="signup__label">
            Full name
          </label>
          <div className="signup__input-wrap">
            <UserIcon className="signup__icon" aria-hidden="true" />
            <input
              type="text"
              id="signup-full-name"
              className="signup__input"
              placeholder="Full name"
              name="fullName"
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className="signup__field">
          <label htmlFor="signup-email" className="signup__label">
            E-mail
          </label>
          <div className="signup__input-wrap">
            <EnvelopeIcon className="signup__icon" aria-hidden="true" />
            <input
              type="email"
              id="signup-email"
              className="signup__input"
              placeholder="name@example.com"
              name="email"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="signup__field">
          <label htmlFor="signup-password" className="signup__label">
            Password
          </label>
          <div className="signup__input-wrap">
            <LockClosedIcon className="signup__icon" aria-hidden="true" />
            <input
              type="password"
              id="signup-password"
              className="signup__input"
              placeholder="*********"
              name="password"
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <button className="btn" type="submit">Sign Up</button>
      </form>

      {/* Additional links */}
      <div className="signup__login">
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </main>
  )
} 
