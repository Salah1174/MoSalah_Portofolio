import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";
import AdminMessages from "./AdminMessages";
import AdminLogin from "./AdminLogin";
import {
  SetUser,
  Logout,
  ShowLoading,
  HideLoading,
} from "../../redux/rootSlice";

function Admin() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.root);
  const [selectedSection, setSelectedSection] = useState("intro");

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          dispatch(ShowLoading());
          // Set token in axios headers
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify token with backend
          const response = await axios.get("/api/auth/verify");
          if (response.data.success) {
            dispatch(SetUser(response.data.user));
          } else {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(Logout());
    delete axios.defaults.headers.common["Authorization"];
  };

  const handleLoginSuccess = () => {
    // Login success is handled in AdminLogin component
    // Redux state will be updated there
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const menuItems = [
    { key: "intro", label: "Intro", icon: "🏠" },
    { key: "about", label: "About", icon: "👤" },
    { key: "experience", label: "Experience", icon: "💼" },
    { key: "projects", label: "Projects", icon: "🚀" },
    { key: "contact", label: "Contact", icon: "📞" },
    { key: "messages", label: "Messages", icon: "💬" },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "intro":
        return <AdminIntro />;
      case "about":
        return <AdminAbout />;
      case "experience":
        return <AdminExperience />;
      case "projects":
        return <AdminProject />;
      case "contact":
        return <AdminContact />;
      case "messages":
        return <AdminMessages />;
      default:
        return <AdminIntro />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-1">Portfolio Management</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSection(item.key)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                selectedSection === item.key
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
