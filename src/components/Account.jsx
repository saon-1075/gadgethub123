import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User, ShoppingBag } from "lucide-react";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [activeTab, setActiveTab] = useState("account");
  const navigate = useNavigate();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }
      setEmail(user.email);

      let { data, error, status } = await supabase
        .from('profiles') 
        .select(`email, full_name, avatar_url`)
        .eq('id', user.id)
        .maybeSingle();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error(error);
      // Don't toast here to avoid annoying popups on first load
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const updates = {
        id: user.id,
        
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from('profiles') 
        .upsert(updates); 

      if (error) throw error;
      toast.success("Profile updated!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return (
      <div className="bg-gray-900 h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 border-2 border-gray-700 p-6 rounded">
              <h3 className="text-green-400 font-mono font-bold text-sm uppercase mb-4">Menu</h3>
              
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-3 rounded text-left font-mono text-sm transition-all ${
                  activeTab === "account"
                    ? "bg-green-500 text-black font-bold"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <User size={16} />
                My Account
              </button>
              
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left font-mono text-sm transition-all ${
                  activeTab === "orders"
                    ? "bg-green-500 text-black font-bold"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ShoppingBag size={16} />
                My Orders
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* My Account Tab */}
            {activeTab === "account" && (
              <div className="bg-gray-800 border-2 border-gray-700 p-8 rounded shadow-[8px_8px_0px_0px_rgba(74,222,128,0.2)]">
                <h2 className="text-3xl font-mono font-black text-green-400 mb-8 uppercase tracking-widest">
                  User <span className="text-white">Profile</span>
                </h2>

                <form onSubmit={updateProfile} className="space-y-6">
                  <div>
                    <label className="block text-green-400 font-mono text-xs mb-2 uppercase">System Email</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-gray-900 border border-gray-600 text-gray-500 p-3 font-mono cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-green-400 font-mono text-xs mb-2 uppercase">Pilot Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 text-white p-3 font-mono focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-green-400 font-mono text-xs mb-2 uppercase">Avatar Source (URL)</label>
                    <input
                      type="url"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 text-white p-3 font-mono focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-green-500 text-black font-bold font-mono py-3 mt-4 hover:bg-green-400 hover:scale-[1.02] transition-all transform border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
                  >
                    {loading ? 'SAVING DATA...' : 'SAVE CHANGES'}
                  </button>
                </form>
              </div>
            )}

            {/* My Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-gray-800 border-2 border-gray-700 p-8 rounded shadow-[8px_8px_0px_0px_rgba(74,222,128,0.2)]">
                <h2 className="text-3xl font-mono font-black text-green-400 mb-8 uppercase tracking-widest">
                  My <span className="text-white">Orders</span>
                </h2>

                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 font-mono">No orders yet.</p>
                  <p className="text-gray-500 font-mono text-sm mt-2">Start shopping to see your orders here!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;