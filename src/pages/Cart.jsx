import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

const Cart = () => {
  // 1. Get all the functions we need from our "Brain"
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 2. Calculate the correct total price
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 3. Handle Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          to="/shop" 
          className="bg-black text-[#e7b400] px-8 py-3 rounded hover:opacity-90 transition font-bold font-press-start text-xs"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <button onClick={() => navigate(-1)} className="hover:bg-gray-100 p-2 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold font-press-start">Shopping Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDE: Cart Items List */}
        <div className="flex-grow space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white border-2 border-black p-4 gap-4 shadow-[4px_4px_0px_#000]"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover border border-gray-200"
                style={{ imageRendering: "pixelated" }}
              />

              {/* Product Details */}
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-500 font-mono">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border-2 border-black bg-gray-50">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="p-2 hover:bg-gray-200 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold font-mono">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="p-2 hover:bg-gray-200 transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Subtotal for this item (Optional but nice) */}
              <div className="font-bold font-mono text-lg hidden sm:block w-24 text-right">
                ₹{item.price * item.quantity}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                title="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="lg:w-80 h-fit">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000] sticky top-24">
            <h2 className="text-xl font-bold font-press-start mb-6 border-b-2 border-gray-100 pb-4">
              Summary
            </h2>
            
            <div className="space-y-3 mb-6 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold font-mono text-black">
                  ₹{total}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#e7b400] text-black font-bold font-press-start py-4 border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all active:border-black"
            >
              CHECKOUT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
