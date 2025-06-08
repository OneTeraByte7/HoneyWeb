import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Orders() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Redirect if no order data
  useEffect(() => {
    if (!state?.order) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.order) {
    return null; // Or you can return a spinner/loading component here
  }

  const { order } = state;

  // Format payment mode nicely (capitalize words)
  const formatPaymentMode = (mode) =>
    mode
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Order Confirmation</h2>

      <p className="mb-4">
        <strong>Buyer Name:</strong> {order.fullName || "N/A"}
      </p>

      <div className="mb-6">
        <strong>Ordered Products:</strong>
        {order.cart && order.cart.length > 0 ? (
          <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
            {order.cart.map((item) => (
              <li key={item.id || item.name}>
                <span className="font-medium">{item.name}</span> — Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-2">No products found in order.</p>
        )}
      </div>

      <p className="mb-4 font-semibold text-lg">
        Total Paid: ₹{order.total ? order.total.toFixed(2) : "0.00"}
      </p>

      <p className="mb-4">
        <strong>Payment Mode:</strong> {order.paymentMode ? formatPaymentMode(order.paymentMode) : "N/A"}
      </p>

      <p className="text-green-700 font-semibold text-lg mt-8">
        Thank you for your purchase! Your order has been placed successfully.
      </p>
    </div>
  );
}
