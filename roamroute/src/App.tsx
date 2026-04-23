import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Trips from "./pages/Trips";
import TourDetails from "./pages/TourDetails";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetails from "./pages/AdminUserDetails";
import Profile from "./pages/Profile";
import React from "react";

function AppLayout() {
  const { pathname } = useLocation();
  const hideFooter = pathname.startsWith("/admin");

  return (
    <PageLayout hideFooter={hideFooter}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/:id" element={<AdminUserDetails />} />
      </Routes>
    </PageLayout>
  );
}

function App() {
  return (
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  </React.StrictMode>
  );
}

export default App;
