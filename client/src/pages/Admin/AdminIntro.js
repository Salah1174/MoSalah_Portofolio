import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function AdminIntro() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);

  const [formData, setFormData] = useState({
    welcomeText: "",
    firstName: "",
    lastName: "",
    caption: "",
    description: "",
  });

  useEffect(() => {
    if (portofolioData?.intro) {
      setFormData(portofolioData.intro);
    }
  }, [portofolioData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.put(
        "/api/portofolio/update-intro",
        formData
      );
      if (response.data.success) {
        alert("Intro updated successfully!");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      alert("Error updating intro: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Intro Section</h2>
        <div className="text-sm text-gray-500">
          Manage your introduction and welcome message
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Welcome Text
            </label>
            <input
              type="text"
              name="welcomeText"
              value={formData.welcomeText}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Hi, I am"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Full Stack Developer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your first name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your last name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Brief description about yourself..."
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminIntro;
