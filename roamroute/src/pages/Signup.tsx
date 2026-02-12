import "../assets/styles/pages/signup.css"

export default function Signup() {
  return (
    <>
      <div className="signup-text">
        <h1>Create an Account</h1>
        <p>Sign up to start planning your travel adventures.</p>
      </div>

      {/* Signup form */}
      <form className="signup-form">
        <input 
        type="text" 
        placeholder="Full Name" />
        <input 
        type="text" 
        placeholder="name@example.com" />
        <input 
        type="password" 
        placeholder="*********" />
        <button type="submit">Sign Up</button>
      </form>

      {/* Additional links */}
      <div className="login-link">
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </>
  )
} 
