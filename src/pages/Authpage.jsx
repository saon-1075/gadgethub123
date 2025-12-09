import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../supabase'; // Import Supabase
import { motion } from 'framer-motion';

const Authpage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      // LOGIN LOGIC
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        toast.success('Logged in successfully!');
        navigate('/'); 
      } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.message);
      }
    } else {
      // SIGN UP LOGIC
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) throw error;
        
        // Optional: Insert into a 'users' table if you want to store extra profile data
        // You must create a 'users' table in Supabase first for this to work
        if (data.user) {
          const { error: dbError } = await supabase
            .from('users') // Ensure you create this table
            .insert([
              { id: data.user.id, email: email, created_at: new Date() }
            ]);
            
          if (dbError) console.error("DB Error:", dbError);
        }

        toast.success('Account created! Check email for verification.');
        navigate('/');
      } catch (error) {
        console.error("Sign Up Error:", error);
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full p-8 bg-gray-800 text-white rounded-lg shadow-lg border-2 border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-press-start text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 font-press-start text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 font-press-start text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e7b400] text-black font-press-start p-4 rounded-md border-b-4 border-black hover:bg-yellow-500 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </motion.button>
        </form>
        
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-gray-400 font-press-start text-xs mt-6 hover:text-white"
        >
          {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
        </button>
      </motion.div>
    </div>
  );
};

export default Authpage;