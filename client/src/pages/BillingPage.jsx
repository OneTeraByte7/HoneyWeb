import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { useState, useEffect } from "react";

export default function BillingPage() {
  const { state } = useLocation();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(8);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.rate * item.quantity,
    0
  );

  useEffect(() => {
    if (!showModal) return;

    if (timer === 0) {
      setShowModal(false);
      setPaymentSuccess(true);
      clearCart();

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 text-white">
      <div className="max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 relative z-10 text-white">
        <h2 className="text-3xl font-semibold mb-6 text-white">Billing Page</h2>

        <p className="mb-5">
          <span className="font-semibold">Buyer Name:</span>{" "}
          {state?.userData?.fullName || "N/A"}
        </p>

        <div className="mb-6">
          <span className="font-semibold">Products:</span>
          {cart.length === 0 ? (
            <p className="mt-2 italic text-gray-300">No products in cart.</p>
          ) : (
            <ul className="list-disc list-inside mt-3 space-y-1">
              {cart.map((item) => (
                <li key={item.id}>
                  <span className="font-medium">{item.name}</span> — Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mb-8 text-lg font-semibold">
          Total: ₹{totalPrice.toFixed(2)}
        </p>

        <div className="mb-6">
          <label htmlFor="paymentMode" className="block font-semibold mb-2">
            Mode of Payment:
          </label>

          {/* Custom-styled dropdown */}
          <div className="relative max-w-xs">
            <select
              id="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="billing-select appearance-none w-full rounded p-3 pr-10
                         bg-white/10 backdrop-blur-md border border-white/20
                         text-white focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select payment mode</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="net_banking">Net Banking</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>

            {/* Dropdown arrow */}
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          onClick={handlePayClick}
          disabled={showModal}
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 ${
            showModal ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Pay Now
        </button>

        {paymentSuccess && (
          <div className="mt-6 p-4 bg-green-600/10 text-green-300 rounded text-center font-semibold">
            Payment Successful! Redirecting to Orders...
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-80 max-w-full border border-white/20 shadow-2xl text-center relative text-white">
            <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PayNow"
              alt="QR Code"
              className="mx-auto mb-4 rounded-lg"
            />
            <p className="mb-2">Please scan the QR code with your payment app.</p>
            <p className="font-mono text-lg">
              Time left: <span className="font-bold">{timer}s</span>
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
