import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Land from "./pages/Land";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckoutPage from "./pages/CheckoutPage";
import BillingPage from "./pages/BillingPage";
import Orders from "./pages/Orders"; // Assuming you have an Orders page
import CartProvider from "./pages/CartContext";

// PrivateRoute wrapper for protected routes
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <PrivateRoute>
                <BillingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}