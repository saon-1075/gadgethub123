import React, { useContext } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react'; // Import Plus/Minus icons
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CartContext } from '../context/cartcontext';

const ProductCard = ({ product }) => {
  // Get both addToCart and decreaseQuantity
  const { addToCart, decreaseQuantity, cart } = useContext(CartContext);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
    if (quantity === 0) toast.success(`${product.name} added!`);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

  return (
    <motion.div
      className="bg-gray-800 text-white rounded-none shadow-lg overflow-hidden flex flex-col border-2 border-gray-700 hover:border-green-400 transition-all duration-300"
      whileHover={{ y: -6, boxShadow: '6px 6px 0px rgba(0,0,0,0.5)' }}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-900 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          style={{ imageRendering: 'pixelated' }}
          onError={(e) => { e.target.src = 'https://placehold.co/400x300/222/4ade80?text=No+Image'; }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-grow bg-slate-900">
        <h3 className="text-lg font-bold font-mono text-white uppercase tracking-tight line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <div className="flex justify-between items-end mt-6">
          <div>
            <p className="text-xs text-gray-400 font-mono mb-1">PRICE</p>
            <span className="text-2xl font-black font-mono text-green-400">
              ₹{product.price}
            </span>
          </div>

          {/* DYNAMIC BUTTON LOGIC */}
          {quantity > 0 ? (
            <div className="flex items-center bg-yellow-500 text-black font-mono rounded-none shadow-[2px_2px_0px_#000]">
              <button 
                onClick={handleDecrease}
                className="px-3 py-2 hover:bg-yellow-600 transition-colors border-r border-black/20"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="px-3 font-bold text-sm min-w-[30px] text-center">
                {quantity}
              </span>

              <button 
                onClick={handleAddToCart}
                className="px-3 py-2 hover:bg-yellow-600 transition-colors border-l border-black/20"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-black font-mono text-sm font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-colors uppercase tracking-wider flex items-center shadow-[2px_2px_0px_#000] active:shadow-none active:translate-y-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;