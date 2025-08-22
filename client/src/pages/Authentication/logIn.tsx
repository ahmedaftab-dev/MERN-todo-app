import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthService from "../../_utils/services/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate()
  const handleLoginUser = async () => {
    if ( !email || !password) {
      console.warn("Please fill out all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await AuthService.loginUser({  email, password });
      const { token, user, message } = response.data;

    // ✅ Save to localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

      toast.success(message)
      navigate('/home')
      // TODO: Navigate or show success notification here if needed
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button 
           onClick={handleLoginUser}
           disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex justify-center items-center">
           {isSubmitting ? "Please wait..." : "Sign In"}<ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium">
            Sign up
          </Link>
        </p>

        <div className="text-center mt-2">
          <Link to="/" className="text-gray-500 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;