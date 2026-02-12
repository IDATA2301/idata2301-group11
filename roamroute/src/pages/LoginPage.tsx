import "../assets/styles/pages/login.css"

export default function LoginPage() {
  return (
    <>
      <div className="login-text">
        <h1>Welcome back</h1>
        <p>Sign in to manage your travel plan and explore new destinations.</p>
      </div>

      {/* Login form */}
      <form className="login-form">
        <input 
        type="text" 
        placeholder="name@example.com" />
        <input 
        type="password" 
        placeholder="*********" />
        <button type="submit">Sign In</button>
      </form>

      {/* Additional links */}
      <div className="forgot-password">
        <a href="/forgot-password">Forgot password?</a>
      </div>

      <div className="signup-link">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </>
  )
}
