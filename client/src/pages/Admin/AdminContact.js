import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function AdminContact() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
  });

  useEffect(() => {
    if (portofolioData?.contact) {
      setFormData(portofolioData.contact);
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
        "/api/portofolio/update-contact",
        formData
      );
      if (response.data.success) {
        alert("Contact information updated successfully!");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      alert("Error updating contact information: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Contact Section</h2>
        <div className="text-sm text-gray-500">
          Manage your contact information
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your country"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
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

        {/* Contact Preview */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information Preview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👤</span>
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium text-gray-800">
                  {formData.name || "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <span className="text-sm text-gray-600">Email:</span>
                <p className="font-medium text-gray-800">
                  {formData.email || "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <span className="text-sm text-gray-600">Country:</span>
                <p className="font-medium text-gray-800">
                  {formData.country || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContact;
