import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartcontext";
import { AuthContext } from "../context/authcontext";
import { supabase } from "../supabase"; // Import Supabase
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Assuming AuthContext is updated to use Supabase user
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const handleCheckout = async () => {
    if (!user) return alert("Please login to place an order.");
    if (cart.length === 0) return alert("Cart is empty.");
    if (!address) return alert("Enter a delivery address.");

    try {
      // SUPABASE: Insert into 'orders' table
      const { data, error } = await supabase
        .from('orders')
        .insert([
          { 
            user_id: user.id, // Supabase users have an 'id', not 'uid'
            items: cart,      // Ensure your 'orders' table has a JSONB column named 'items'
            total: total,
            address: address,
            created_at: new Date()
          }
        ]);

      if (error) throw error;

      await clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border w-full p-3 rounded mb-4"
      />

      <h3 className="text-lg mb-3 font-semibold">Order Summary</h3>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}

      <div className="text-right font-bold mt-4 text-lg">
        Total: ₹{total}
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;