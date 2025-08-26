import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading, SetUser } from "../../redux/rootSlice";

function AdminLogin({ onLoginSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/login", formData);

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Set user in Redux store
        dispatch(SetUser(response.data.user));

        // Set axios default header for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        // Call success callback
        onLoginSuccess();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              Sign in to access the portfolio admin panel
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Forgot your credentials? Contact the system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
