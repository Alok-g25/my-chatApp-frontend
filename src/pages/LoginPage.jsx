import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthUser";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();


  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      login(formData);
      navigate("/")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen my-gradient-bg px-4">
      <div className="w-full max-w-md p-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40">
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
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
                className="text-sm text-gray-600 focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>


          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 cursor-pointer text-white font-semibold my-gradient-btn rounded-xl hover:opacity-90 transition"
          >
            {isLoggingIn ? <Loader2 className="size-5 animate-spin" /> : "Login"}

          </button>
        </form>

        <p className="text-center text-white mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 font-bold underline hover:text-indigo-600 transition cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
