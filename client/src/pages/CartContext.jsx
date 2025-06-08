import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const CartContext = createContext();

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === productId);
      if (!exists) return prev;
      return exists.quantity === 1
        ? prev.filter((item) => item.id !== productId)
        : prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
    });
  };

  // Clear entire cart (useful after checkout)
  const clearCart = () => {
    setCart([]);
  };

  // Total items count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price (optional, if you want to use it in context)
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.rate, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
