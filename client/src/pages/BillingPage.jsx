import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext"; // Adjust path if needed
import { useState, useEffect } from "react";

export default function BillingPage() {
  const { state } = useLocation();
  const { cart, clearCart } = useCart(); // Added clearCart to clear cart after order
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(8);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculate total price from cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.rate * item.quantity,
    0
  );

  // Timer effect for QR modal and navigation after payment success
  useEffect(() => {
    if (!showModal) return;

    if (timer === 0) {
      setShowModal(false);
      setPaymentSuccess(true);

      // Clear the cart
      clearCart();

      // Redirect after 2 seconds with order details
      setTimeout(() => {
        navigate("/orders", {
          state: {
            order: {
              fullName: state?.userData?.fullName,
              cart,
              total: totalPrice,
              paymentMode,
            },
          },
        });
      }, 2000);
      return;
    }

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showModal, navigate, state, cart, totalPrice, paymentMode, clearCart]);

  // Handle Pay button click
  const handlePayClick = () => {
    if (!paymentMode) {
      alert("Please select a payment mode first.");
      return;
    }
    setTimer(8);
    setShowModal(true);
    setPaymentSuccess(false);
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-8 mt-10 bg-white shadow-xl rounded-lg relative z-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Billing Page</h2>

        <p className="mb-5 text-gray-700">
          <span className="font-semibold">Buyer Name:</span>{" "}
          {state?.userData?.fullName || "N/A"}
        </p>

        <div className="mb-6">
          <span className="font-semibold text-gray-700">Products:</span>
          {cart.length === 0 ? (
            <p className="mt-2 text-gray-500 italic">No products in cart.</p>
          ) : (
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              {cart.map((item) => (
                <li key={item.id}>
                  <span className="font-medium">{item.name}</span> — Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mb-8 text-lg font-semibold text-gray-900">
          Total: ₹{totalPrice.toFixed(2)}
        </p>

        <div className="mb-6">
          <label htmlFor="paymentMode" className="block font-semibold mb-2 text-gray-700">
            Mode of Payment:
          </label>
          <select
            id="paymentMode"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full max-w-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select payment mode</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="upi">UPI</option>
            <option value="net_banking">Net Banking</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
          </select>
        </div>

        <button
          onClick={handlePayClick}
          disabled={showModal}
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300 ${showModal ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Pay Now
        </button>

        {paymentSuccess && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded text-center font-semibold">
            Payment Successful! Redirecting to Orders...
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Backdrop with blur */}
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-80 max-w-full shadow-xl text-center relative">
              <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
              {/* Placeholder QR code image */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PayNow"
                alt="QR Code"
                className="mx-auto mb-4"
              />
              <p className="text-gray-700 mb-2">
                Please scan the QR code with your payment app.
              </p>
              <p className="text-gray-600 font-mono text-lg">
                Time left: <span className="font-bold">{timer}s</span>
              </p>
              {/* Optional Cancel button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
