import "../assets/styles/pages/login.css"

export default function LoginPage() {
  return (
    <main className="login">
      <div className="login__text">
        <h1>Welcome back</h1>
        <p>Sign in to manage your travel plan and explore new destinations.</p>
      </div>

      {/* Login form */}
      <form className="login__form">
        <input 
        type="text" 
        placeholder="name@example.com" />
        <input 
        type="password" 
        placeholder="*********" />
        <button type="submit">Sign In</button>
      </form>

      {/* Additional links */}
      <div className="login__forgot">
        <a href="/forgot-password">Forgot password?</a>
      </div>

      <div className="login__signup">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </main>
  )
}
