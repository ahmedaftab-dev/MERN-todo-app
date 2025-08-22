import { ArrowRight, Star, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              StartupHub
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-700 hover:text-indigo-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold leading-tight">
          Build Your{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dream Business
          </span>{" "}
          Today
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your ideas into reality with our business platform. Join
          thousands of entrepreneurs who trust StartupHub.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl flex items-center"
          >
            Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border-2 border-indigo-200 text-indigo-600 rounded-2xl"
          >
            Log In
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <CheckCircle className="w-6 h-6 text-emerald-500" /> Advanced
            Analytics
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <CheckCircle className="w-6 h-6 text-emerald-500" /> 24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;