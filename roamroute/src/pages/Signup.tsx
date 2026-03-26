import "../assets/styles/pages/signup.css"
import { useState, type SyntheticEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"
import { register } from "../services/auth"
import { useAuth } from "../context/AuthContext"

export default function Signup() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const trimmedUserName = userName.trim()
  const isValidUsernameLength = trimmedUserName.length >= 6
  const isWithinMaxLength = trimmedUserName.length <= 20
  const hasNoWhitespace = !/\s/.test(trimmedUserName)
  const canSubmit = Boolean(trimmedUserName && email.trim() && password.trim()) && isValidUsernameLength && isWithinMaxLength && hasNoWhitespace && !loading

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!trimmedUserName || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    if (trimmedUserName.length < 6) {
      setError("Username must be at least 6 characters.")
      return
    }

    if (trimmedUserName.length > 20) {
      setError("Username cannot be longer than 20 characters.")
      return
    }

    if (/\s/.test(trimmedUserName)) {
      setError("Username cannot contain spaces.")
      return
    }

    try {
      setLoading(true)
      const user = await register({ userName: trimmedUserName, email, password })
      signIn(user)
      navigate("/profile")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="signup">
      <div className="signup__text">
        <h1>Create an Account</h1>
        <p>Sign up to start planning your travel adventures.</p>
      </div>

      {/* Signup form */}
      <form className="signup__form" onSubmit={handleSubmit}>
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
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value)
                if (error) setError("")
              }}
              minLength={6}
              maxLength={20}
              pattern={"^\\S+$"}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        {error ? <p className="signup__error" role="alert">{error}</p> : null}
        <button className="btn" type="submit" disabled={!canSubmit}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {/* Additional links */}
      <div className="signup__login">
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </main>
  )
} 
