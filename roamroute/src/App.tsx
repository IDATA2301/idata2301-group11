import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

import Header from "./components/header/header.tsx"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {
  return (
    <Router>
      <Header />

      <div style={{ padding: "20px", marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
