import "../assets/styles/pages/login.css"
import { useState, type SyntheticEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { login } from "../services/auth"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    try {
      setLoading(true)
      const user = await login({ email, password })
      signIn(user)
      navigate("/profile")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login">
      <div className="login__text">
        <h1>Welcome back</h1>
        <p>Sign in to manage your travel plan and explore new destinations.</p>
      </div>

      {/* Login form */}
      <form className="login__form" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        {error ? <p role="alert">{error}</p> : null}
        <div className="login__forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Additional links */}
      <div className="login__signup">
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  )
}
