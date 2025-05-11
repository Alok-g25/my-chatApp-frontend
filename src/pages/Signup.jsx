import React, { useState } from "react";
import { Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthUser";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.phone.trim()) return toast.error("Email is required");
    if (formData.phone.trim().length !== 10) {
      return toast.error("Phone number must be exactly 10 digits");
    } if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);
      // navigate("/")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen my-gradient-bg px-4">
      <div className="w-full max-w-md p-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40">
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow mb-8">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-white font-semibold mb-1">Name</label>
            <div className="flex items-center gap-2 bg-white/70 rounded-xl p-3 focus-within:ring-2 ring-white">
              <User className="text-gray-600" size={20} />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-white font-semibold mb-1">Email</label>
            <div className="flex items-center gap-2 bg-white/70 rounded-xl p-3 focus-within:ring-2 ring-white">
              <Mail className="text-gray-600" size={20} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-white font-semibold mb-1">Phone</label>
            <div className="flex items-center gap-2 bg-white/70 rounded-xl p-3 focus-within:ring-2 ring-white">
              <Phone className="text-gray-600" size={20} />
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-white font-semibold mb-1">Password</label>
            <div className="flex items-center gap-2 bg-white/70 rounded-xl p-3 focus-within:ring-2 ring-white">
              <Lock className="text-gray-600" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="bg-transparent w-full outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-sm text-gray-600 focus:outline-none cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-3 text-white cursor-pointer font-semibold my-gradient-btn rounded-xl hover:opacity-90 transition"
          >
            {isSigningUp ? <Loader2 className="size-5 animate-spin" /> : "Create Account"}
          </button>
        </form>
        <p className="text-center text-white mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 font-bold underline hover:text-indigo-600 transition cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
