import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);

  const [formData, setFormData] = useState({
    lottieURL: "",
    description1: "",
    description2: "",
    skills: [],
  });

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (portofolioData?.about) {
      setFormData(portofolioData.about);
    }
  }, [portofolioData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.put(
        "/api/portofolio/update-about",
        formData
      );
      if (response.data.success) {
        alert("About section updated successfully!");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      alert("Error updating about section: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">About Section</h2>
        <div className="text-sm text-gray-500">
          Manage your about information and skills
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lottie Animation URL
          </label>
          <input
            type="url"
            name="lottieURL"
            value={formData.lottieURL}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description 1
          </label>
          <textarea
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="First part of your about description..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description 2
          </label>
          <textarea
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Second part of your about description..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSkill())
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a new skill..."
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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

export default AdminAbout;
