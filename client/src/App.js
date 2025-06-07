import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Land from "./pages/Land";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartProvider from "./pages/CartContext";

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
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
