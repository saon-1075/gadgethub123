import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch ALL products from Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*'); // Select all columns

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching shop items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      <div className="bg-slate-950 py-12 border-b-4 border-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-green-400 mb-4" style={{ textShadow: '4px 4px #000' }}>
            The Armory
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse our full collection of elite gaming hardware.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex justify-between items-center mb-12 flex-col md:flex-row gap-4">
          <p className="text-gray-400">{filteredProducts.length} Items Found</p>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search gear..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border-2 border-gray-600 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
            />
            <Search className="absolute left-3 top-3.5 text-gray-500 h-5 w-5" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 border-2 border-dashed border-gray-700">
                <p className="text-xl">No products found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;