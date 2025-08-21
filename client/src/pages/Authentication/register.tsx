import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../_utils/services/AuthService";
import toast from "react-hot-toast";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate()

  const handleRegisterUser = async () => {
    if (!username || !email || !password) {
      console.warn("Please fill out all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await AuthService.registerUser({ username, email, password });
      toast.success(response.data.message)
      navigate('/login')
      // TODO: Navigate or show success notification here if needed
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mt-4">Create Account</h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex justify-center items-center disabled:opacity-60"
            onClick={handleRegisterUser}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"} <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 font-medium">
            Sign in
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

export default Register;