import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // --- 1. Import Icon ---
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/authcontext";
import { CartContext } from "../context/cartcontext"; // --- 2. Import CartContext ---
import { supabase } from "../supabase"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext); // --- 3. Get Cart Data ---
  const [displayName, setDisplayName] = useState("");

  // --- 4. Calculate Total Items for the Badge ---
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        setDisplayName(user.email);
        try {
          const { data } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();

          if (data && data.full_name) {
            setDisplayName(data.full_name);
          } else if (user.user_metadata?.full_name) {
            setDisplayName(user.user_metadata.full_name);
          }
        } catch (err) {
          console.error("Error fetching username:", err);
        }
      }
    };
    fetchUserName();
  }, [user]);

  return (
    <nav className="bg-[#e7b400] text-black p-4 border-b-4 border-black">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">

        <Link to="/" className="flex items-center gap-4">
          <img
            src={Logo}
            alt="GadgetHub Logo"
            className="h-10 [image-rendering:pixelated]"
          />
          <h1 className="text-2xl font-press-start">GadgetHub</h1>
        </Link>
        
        <ul className="hidden md:flex gap-6 font-press-start text-sm">
          <li>
            <Link to="/" className="hover:underline hover:scale-105 transition-transform duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:underline hover:scale-105 transition-transform duration-200">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline hover:scale-105 transition-transform duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:scale-105 transition-transform duration-200">
              Contact
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/admin" className="hover:underline hover:scale-105 transition-transform duration-200">
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 font-press-start text-sm">
          
          {/* --- 5. NEW CART BUTTON START --- */}
          <Link to="/cart" className="relative mr-2 group">
             <div className="p-2 hover:bg-black hover:text-[#e7b400] rounded transition-colors">
                <ShoppingCart className="w-5 h-5" />
                
                {/* Only show badge if items exist */}
                {totalItems > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                    {totalItems}
                  </div>
                )}
             </div>
          </Link>
          {/* --- NEW CART BUTTON END --- */}

          {user ? (
            <>
              <Link 
                to="/account" 
                className="text-black/70 hover:text-black hover:underline cursor-pointer font-bold capitalize"
              >
                {displayName}
              </Link>
              
              <button
                onClick={logout}
                className="px-4 py-2 bg-black text-[#e7b400] rounded hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-black text-[#e7b400] rounded hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;