import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PageLayout from "./components/layout/PageLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Trips from "./pages/Trips";
import TourDetails from "./pages/TourDetails";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetails from "./pages/AdminUserDetails";
import AdminTrips from "./pages/AdminTrips";
import AdminTripEdit from "./pages/AdminTripEdit";
import AdminTripCreate from "./pages/AdminTripCreate";
import AdminFlights from "./pages/AdminFlights";
import AdminAccommodations from "./pages/AdminAccommodations";
import AdminDestinations from "./pages/AdminDestinations";
import AdminMessages from "./pages/AdminMessages";
import Profile from "./pages/Profile";
import PurchasedTrips from "./pages/PurchasedTrips";
import PurchasedTripDetails from "./pages/PurchasedTripDetails";
import PaymentReceipt from "./pages/PaymentReceipt";
import React from "react";


function AppLayout() {
  return (
    <PageLayout>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route path="/admin/trips" element={<AdminTrips />} />
          <Route path="/admin/trips/create" element={<AdminTripCreate />} />
          <Route path="/admin/trips/:id/edit" element={<AdminTripEdit />} />
          <Route path="/admin/flights" element={<AdminFlights />} />
          <Route path="/admin/accommodations" element={<AdminAccommodations />} />
          <Route path="/admin/destinations" element={<AdminDestinations />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
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
