import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function AdminExperience() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);

  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
  });

  useEffect(() => {
    if (portofolioData?.experiences) {
      setExperiences(portofolioData.experiences);
    }
  }, [portofolioData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      period: "",
      description: "",
    });
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const handleEdit = (experience, index) => {
    setFormData(experience);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        dispatch(ShowLoading());
        const experienceId = experiences[index]._id;
        await axios.delete(`/api/portofolio/delete-experience/${experienceId}`);
        setExperiences(experiences.filter((_, i) => i !== index));
        alert("Experience deleted successfully!");
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        alert("Error deleting experience: " + error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());

      if (isEditing) {
        // Update existing experience
        const response = await axios.put(
          `/api/portofolio/update-experience/${experiences[editingIndex]._id}`,
          formData
        );
        if (response.data.success) {
          const updatedExperiences = [...experiences];
          updatedExperiences[editingIndex] = response.data.experience;
          setExperiences(updatedExperiences);
          alert("Experience updated successfully!");
        }
      } else {
        // Add new experience
        const response = await axios.post(
          "/api/portofolio/add-experience",
          formData
        );
        if (response.data.success) {
          setExperiences([...experiences, response.data.experience]);
          alert("Experience added successfully!");
        }
      }

      resetForm();
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      alert("Error saving experience: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Experience Section</h2>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Add New Experience
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Frontend Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ABC Tech Solutions"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2022 - Present"
                required
              />
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
                placeholder="Describe your role and achievements..."
                required
              />
            </div>

            <div className="flex space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {isEditing ? "Update Experience" : "Add Experience"}
              </button>
            </div>
          </form>
        </div>

        {/* Experience List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Current Experiences ({experiences.length})
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {experience.title}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(experience, index)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{experience.company}</p>
                <p className="text-gray-500 text-xs mb-2">
                  {experience.period}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {experience.description}
                </p>
              </div>
            ))}

            {experiences.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No experiences added yet. Add your first experience using the
                form.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminExperience;
