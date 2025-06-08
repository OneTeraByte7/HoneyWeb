import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Orders() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.order) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.order) return null;

  const { order } = state;

  const formatPaymentMode = (mode) =>
    mode
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 text-white">
      <div className="max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl text-white">
        <h2 className="text-3xl font-semibold mb-6">Order Confirmation</h2>

        <p className="mb-4">
          <span className="font-semibold">Buyer Name:</span> {order.fullName || "N/A"}
        </p>

        <div className="mb-6">
          <p className="font-semibold mb-2">Ordered Products:</p>
          {order.cart && order.cart.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-white/90">
              {order.cart.map((item) => (
                <li key={item.id || item.name}>
                  <span className="font-medium">{item.name}</span> — Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-white/70">No products found in order.</p>
          )}
        </div>

        <p className="mb-4 font-semibold text-lg">
          Total Paid: ₹{order.total ? order.total.toFixed(2) : "0.00"}
        </p>

        <p className="mb-4">
          <span className="font-semibold">Payment Mode:</span>{" "}
          {order.paymentMode ? formatPaymentMode(order.paymentMode) : "N/A"}
        </p>

        <p className="text-green-400 font-bold text-lg mt-8 mb-6">
          ✅ Thank you for your purchase! Your order has been placed successfully.
        </p>

        {/* Button to go back to Landing Page */}
        <button
          onClick={() => navigate("/landing")}
          className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
        >
          Back to Landing Page
        </button>
      </div>
    </div>
  );
}
