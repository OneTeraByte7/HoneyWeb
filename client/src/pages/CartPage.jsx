import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <section className="min-h-screen px-8 py-20 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-yellow-400">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-lg">
          🛒 Your cart is empty.{" "}
          <Link to="/" className="text-yellow-500 underline">Go shopping</Link>.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white/10 p-4 rounded-lg border border-yellow-700">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="h-20 w-20 object-cover rounded" />
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300">
                    {item.name} <span className="text-sm text-white/60">x {item.quantity}</span>
                  </h4>
                  <p className="text-sm text-white/80">
                    {item.content} | {item.volume} | ₹{item.rate} each
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold text-yellow-300">
              Total: ₹{cart.reduce((sum, item) => sum + item.rate * item.quantity, 0)}
            </p>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
