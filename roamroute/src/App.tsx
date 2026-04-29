import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PageLayout from "./components/layout/PageLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
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
import PurchasedTrips from "./pages/PurchasedTrips";
import PurchasedTripDetails from "./pages/PurchasedTripDetails";
import PaymentReceipt from "./pages/PaymentReceipt";
import React from "react";


function AppLayout() {
  const { pathname } = useLocation();
  const hideFooter = pathname.startsWith("/admin");

  return (
    <PageLayout hideFooter={hideFooter}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/tour/:id" element={<TourDetails />} />

        {/* Authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/purchased-trips" element={<PurchasedTrips />} />
          <Route path="/purchased-trips/:orderId" element={<PurchasedTripDetails />} />
          <Route path="/payment-receipt" element={<PaymentReceipt />} />
        </Route>

        {/* Admin only */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:id" element={<AdminUserDetails />} />
        </Route>
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
