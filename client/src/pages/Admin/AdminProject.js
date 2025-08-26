import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function AdminProject() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);

  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    technologies: [],
  });

  const [newTechnology, setNewTechnology] = useState("");

  useEffect(() => {
    if (portofolioData?.projects) {
      setProjects(portofolioData.projects);
    }
  }, [portofolioData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (techToRemove) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(
        (tech) => tech !== techToRemove
      ),
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      technologies: [],
    });
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const handleEdit = (project, index) => {
    setFormData(project);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        dispatch(ShowLoading());
        const projectId = projects[index]._id;
        await axios.delete(`/api/portofolio/delete-project/${projectId}`);
        setProjects(projects.filter((_, i) => i !== index));
        alert("Project deleted successfully!");
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        alert("Error deleting project: " + error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());

      if (isEditing) {
        // Update existing project
        const response = await axios.put(
          `/api/portofolio/update-project/${projects[editingIndex]._id}`,
          formData
        );
        if (response.data.success) {
          const updatedProjects = [...projects];
          updatedProjects[editingIndex] = response.data.project;
          setProjects(updatedProjects);
          alert("Project updated successfully!");
        }
      } else {
        // Add new project
        const response = await axios.post(
          "/api/portofolio/add-project",
          formData
        );
        if (response.data.success) {
          setProjects([...projects, response.data.project]);
          alert("Project added successfully!");
        }
      }

      resetForm();
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      alert("Error saving project: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Projects Section</h2>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditing ? "Edit Project" : "Add New Project"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., E-commerce Website"
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
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Brief description of the project..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a technology..."
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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
                {isEditing ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Current Projects ({projects.length})
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {project.title}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project, index)}
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
                <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Project →
                  </a>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No projects added yet. Add your first project using the form.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProject;
