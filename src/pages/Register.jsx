import React, { useState } from "react";
import { supabase } from "../supabase"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. Add state for Full Name to match your database column
  const [fullName, setFullName] = useState(""); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 2. Create the Auth User
      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      // 3. IF Auth is successful, insert into your public table
      if (data.user) {
        const { error: insertError } = await supabase
          .from("users") // <--- REPLACE "users" with your actual table name from the screenshot
          .insert([
            {
              id: data.user.id, // This links the Auth ID to your table
              email: email,
              full_name: fullName,
              role: "user", // Setting a default role
            },
          ]);

        if (insertError) throw insertError;
      }

      toast.success("Account created! Please check your email to verify.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        
        {/* Added Full Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;