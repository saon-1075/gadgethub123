import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../supabase';
import Hero from '../components/Hero.jsx'; 
import CategoryNavigator from '../components/Categories.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      
      try {
        // Fetch only the first 6 products for the homepage
        // If you ADDED the 'created_at' column, this sort will work.
        // If you DID NOT add it, remove the .order() line to fix the 400 error.
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(3);
          // .order('created_at', { ascending: false }); // Uncomment this ONLY after adding the column

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error loading products:", error.message);
        // Optional: toast.error("Could not load products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []); 

  return (
    <div className="bg-gray-900">
      <Hero />
      
      <div className="bg-gray-900 py-24 px-4 border-t-4 border-gray-800">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white text-center mb-16 font-mono uppercase" style={{ textShadow: '4px 4px #000' }}>
            Featured <span className="text-green-400">Gear</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {!loading && products.length === 0 && (
             <div className="text-center text-gray-500 font-mono py-10">
               No products found. Check out the Shop page or add items via Admin Panel!
             </div>
          )}
        </div>
      </div>
      <TrustBar />
      <CategoryNavigator />
    </div>
  );
};

export default Home;