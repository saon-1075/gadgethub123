import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { supabase } from "../supabase";
import toast from "react-hot-toast";
import { Trash2, Edit2 } from "lucide-react";

const ADMIN_PASSWORD = "gadgethub123";

const Adminpanel = () => {
  const { user } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
      toast.success("Admin panel unlocked!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    setLoading(false);
    if (error) {
      console.error(error);
      toast.error("Failed to fetch products");
      return;
    }
    setProducts(data || []);
  };

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = {
      name: form.name,
      price: parseFloat(form.price) || 0,
      description: form.description,
      image: form.image,
    };

    let result;
    if (editingId) {
      result = await supabase.from("products").update(product).eq("id", editingId);
    } else {
      result = await supabase.from("products").insert([product]);
    }

    setLoading(false);
    if (result.error) {
      console.error(result.error);
      toast.error(result.error.message || "Failed to save product");
      return;
    }

    toast.success(editingId ? "Product updated!" : "Product added!");
    setForm({ name: "", price: "", description: "", image: "" });
    setEditingId(null);
    setShowForm(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "Failed to delete product");
      return;
    }
    toast.success("Product deleted!");
    fetchProducts();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-press-start mb-6 text-center">Admin Panel</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
            className="w-full border px-3 py-2 mb-4 rounded"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-[#e7b400] rounded font-press-start text-sm"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-press-start">Admin Panel</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm({ name: "", price: "", description: "", image: "" });
          }}
          className="px-4 py-2 bg-black text-[#e7b400] rounded font-press-start text-sm"
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-4">
          <h3 className="text-xl font-press-start mb-4">{editingId ? "Edit Product" : "Add New Product"}</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price *</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                step="0.01"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-[#e7b400] rounded font-press-start text-sm"
          >
            {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <div>
        <h3 className="text-xl font-press-start mb-4">Products ({products.length})</h3>
        {loading && !products.length ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products yet. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow border border-gray-200">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold mb-3">${product.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminpanel;