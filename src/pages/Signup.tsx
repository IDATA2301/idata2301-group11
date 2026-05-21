import "../assets/styles/pages/signup.css"
import { useState, type SyntheticEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"
import { register } from "../services/auth"
import { useAuth } from "../context/useAuth"
import FormField from "../components/forms/FormField"
import IconInput from "../components/forms/IconInput"

/**
 * Renders the account creation page.
 */
export default function Signup() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const trimmedFullName = fullName.trim().replace(/\s+/g, " ")
  const isValidNameLength = trimmedFullName.length >= 2 && trimmedFullName.length <= 100
  const canSubmit = Boolean(trimmedFullName && email.trim() && password.trim()) && isValidNameLength && !loading

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!trimmedFullName || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    if (trimmedFullName.length < 2) {
      setError("Full name must be at least 2 characters.")
      return
    }

    if (trimmedFullName.length > 100) {
      setError("Full name cannot be longer than 100 characters.")
      return
    }

    try {
      setLoading(true)
      const user = await register({ fullName: trimmedFullName, email, password })
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
      <div className="signup__hero-bg" aria-hidden="true">
        <img src="/images/signup.webp" alt="Aerial view of a sunny beach with colourful umbrellas and sunbathers beside turquoise water" fetchPriority="high" className="signup__hero-bg-img" />
      </div>
      <div className="signup__text">
        <h1>Create an Account</h1>
        <p>Sign up to start planning your travel adventures.</p>
      </div>

      {/* Signup form */}
      <form className="signup__form" onSubmit={handleSubmit}>
        <FormField
          id="signup-full-name"
          label="Full name"
          className="signup__field"
          labelClassName="signup__label"
        >
          <IconInput
            id="signup-full-name"
            type="text"
            className="signup__input"
            placeholder="Full name"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value)
              if (error) setError("")
            }}
            minLength={2}
            maxLength={100}
            icon={UserIcon}
            wrapperClassName="signup__input-wrap"
            iconClassName="signup__icon"
          />
        </FormField>

        <FormField id="signup-email" label="E-mail" className="signup__field" labelClassName="signup__label">
          <IconInput
            id="signup-email"
            type="email"
            className="signup__input"
            placeholder="name@example.com"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            icon={EnvelopeIcon}
            wrapperClassName="signup__input-wrap"
            iconClassName="signup__icon"
          />
        </FormField>

        <FormField
          id="signup-password"
          label="Password"
          className="signup__field"
          labelClassName="signup__label"
        >
          <IconInput
            id="signup-password"
            type="password"
            className="signup__input"
            placeholder="*********"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            icon={LockClosedIcon}
            wrapperClassName="signup__input-wrap"
            iconClassName="signup__icon"
          />
        </FormField>
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
