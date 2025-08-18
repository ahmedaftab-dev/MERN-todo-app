import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckSquare, Plus, Calendar } from 'lucide-react';

const TodoAuthSystem = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful! Redirecting...');
        // Store token and redirect to your todo dashboard
        localStorage.setItem('token', data.token);
        // window.location.href = '/dashboard'; // Uncomment for actual redirect
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Please sign in.');
        setTimeout(() => {
          setCurrentView('login');
          resetForm();
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      username: ''
    });
    setShowPassword(false);
    setError('');
    setSuccess('');
  };

  const switchToLogin = () => {
    resetForm();
    setCurrentView('login');
  };

  const switchToRegister = () => {
    resetForm();
    setCurrentView('register');
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TodoMaster
          </span>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('login')}
            className="px-6 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => setCurrentView('register')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Organize
                </span>
                <br />
                <span className="text-gray-800">Your Tasks</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Effortlessly
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                The ultimate todo app to boost your productivity. Create, manage, and complete tasks 
                with our intuitive and powerful task management system.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentView('register')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
              >
                Start Organizing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentView('login')}
                className="px-8 py-4 border-2 border-blue-200 hover:border-blue-300 text-blue-600 hover:text-blue-700 font-semibold rounded-2xl transition-all duration-300 hover:bg-blue-50"
              >
                Sign In
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">Task Management</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">Due Dates</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">Easy Creation</p>
              </div>
            </div>
          </div>

          {/* Right Vector Banner */}
          <div className="relative">
            {/* Main Vector Illustration */}
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-300/30 to-blue-300/30 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Central Todo App Mockup */}
              <div className="relative z-10 flex flex-col items-center justify-center h-96">
                {/* Main Device Mockup */}
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="w-48 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                      {/* App Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <CheckSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Mock Todo Items */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-4 h-4 border-2 border-white rounded"></div>
                          <div className="h-2 bg-white/40 rounded-full flex-1"></div>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-4 h-4 bg-white rounded"></div>
                          <div className="h-2 bg-white/40 rounded-full flex-1"></div>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-4 h-4 border-2 border-white rounded"></div>
                          <div className="h-2 bg-white/40 rounded-full flex-1"></div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-8 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                  
                  {/* Floating Todo Cards */}
                  <div className="absolute -top-6 -left-6 w-20 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-500 flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -right-8 w-18 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl shadow-lg transform rotate-12 hover:-rotate-6 transition-transform duration-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-20 left-8 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute top-32 right-12 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                <div className="absolute bottom-24 left-12 w-5 h-5 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">10k+</div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">5k+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to boost your productivity?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who organize their life with TodoMaster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentView('register')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Create Free Account
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="px-8 py-3 border-2 border-blue-200 hover:border-blue-300 text-blue-600 hover:text-blue-700 font-semibold rounded-xl transition-all duration-300 hover:bg-blue-50"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Login Page Component
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to manage your todos</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
              {success}
            </div>
          )}

          {/* Login Fields */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <button
              onClick={switchToRegister}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Register Page Component
  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join TodoMaster</h2>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
              {success}
            </div>
          )}

          {/* Register Fields */}
          <div className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <button
              onClick={switchToLogin}
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Render current view with smooth transitions
  return (
    <div className="relative overflow-hidden">
      <div className={`transition-all duration-500 ${currentView === 'landing' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'}`}>
        {currentView === 'landing' && <LandingPage />}
      </div>
      
      <div className={`transition-all duration-500 ${currentView === 'login' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'}`}>
        {currentView === 'login' && <LoginPage />}
      </div>
      
      <div className={`transition-all duration-500 ${currentView === 'register' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'}`}>
        {currentView === 'register' && <RegisterPage />}
      </div>

      {/* Demo Navigation */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        <button
          onClick={() => setCurrentView('landing')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentView === 'landing' 
              ? 'bg-cyan-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setCurrentView('login')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentView === 'login' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setCurrentView('register')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentView === 'register' 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
          }`}
        >
          Register
        </button>
      </div>
    </div>
  );
};
// PORT=5050
// DEV_MODE="development"
// MONGO_URL=mongodb+srv://ahmedaftab-dev:oXXDdiTLOXwatPOy@cluster0.c8nqgtw.mongodb.net/todo-mern
// JWT_SECRET="todoappjwtdev"
export default TodoAuthSystem;