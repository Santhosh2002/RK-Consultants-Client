import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewProjectPopup from '../../utils/NewProjectPopUp';
import UpdateProjectPopup from '../../utils/UpdateProject';

function AdminProjectsComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewPopupOpen, setNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const base = import.meta.env.VITE_BASE_URL;
  const url = base + '/api/project/';

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(url);
      setProjects(response.data.projects);
    } catch (error) {
      setError(error);
      handleError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
  useEffect(() => {
    fetchProjects(); 
  }, []);

  // Handle errors with toast and reset the error state
  const handleError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
    });
    setError(null); // Reset error state to null after showing the toast
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('fileToUpload', file);

    const uploadUrl = import.meta.env.VITE_UPLOAD_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.url);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('File upload failed.');
      toast.error('File upload failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
      return null;
    }
  };

  // Add new project
  const handleNewProject = async (data) => {
    try {
      // File upload logic
      if (data.image) {
        const response = await handleFileUpload(data.image);
        console.log(response);
        data.image = response;
      }
      if (data.brochure) {
        const response = await handleFileUpload(data.brochure);
        console.log(response);
        data.brochure = response;
      }

      console.log(data); 

      const token = localStorage.getItem("authToken");
      const response = await axios.post(url + 'create', data, {
        headers: {
          Authorization: token,
        },
      });

  
      setNewPopupOpen(false);
      toast.success('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      setLoading(false);
      toast.error('Failed to add project. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
    fetchProjects(); 
  };

  const handleUpdateProject = async (data, id) => {
    console.log(data); 

    if (data.image) {
      const response = await handleFileUpload(data.image);
      console.log(response);
      data.image = response;
    }
    if (data.brochure) {
      const response = await handleFileUpload(data.brochure);
      console.log(response);
      data.brochure = response;
    }
    console.log(data); 

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(`${url}${id}`, data, {
        headers: {
          Authorization: token,
        },
      });

      
      setUpdatePopupOpen(false);
      toast.success('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      setLoading(false);
      toast.error('Failed to update project. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
    setButtonLoading(false);
    setSelectedId(null);
    fetchProjects(); 
  };

  // Delete project
  const handleDelete = async (id) => {
    setButtonLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${url}${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setProjects(projects.filter((project) => project._id !== id));
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
    setButtonLoading(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full max-w-screen-xl">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white p-4 rounded-lg shadow-md"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
              <div className="h-20 bg-gray-300 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-300 rounded w-16"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <>
      <ToastContainer />
      <section className="bg-white p-4">
        <h1 className="text-2xl font-bold mb-4 text-black justify-center items-center text-center">Admin Panel: Projects</h1>
        <div
            onClick={() => setNewPopupOpen(true)}
            className=" cursor-pointer  max-w-56 p-1 bg-blue-400 border border-blue-300 rounded-lg shadow hover:bg-blue-500 hover:shadow-lg duration-150 flex justify-center items-center"
          >
            <p className="text-sm font-bold text-white p-1">Add New Project </p>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="block max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg"
            >
                {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              {project.brochure && (
                <a href={project.brochure} target="_blank" className="text-blue-600 underline">View Brochure</a>
              )}
              <h5 className="text-lg font-bold text-black">{project.title}</h5>
              <p className="text-sm text-gray-700 mb-2">
                {project.description.length > 40
                  ? `${project.description.substring(0, 40)}...`
                  : project.description}
              </p>
              <p className="text-xs text-gray-500">Status: {project.status}</p>
              <p className="text-xs text-gray-500">
                Created at: {new Date(project.startDate).toLocaleString()}
              </p>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  className="text-sm rounded-lg bg-blue-500 text-white py-1 px-3"
                  onClick={() => {
                    setSelectedProject(project);
                    setSelectedId(project._id);
                    setUpdatePopupOpen(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="text-sm rounded-lg bg-red-500 text-white py-1 px-3"
                  onClick={buttonLoading ? () => {} : () => handleDelete(project._id)}
                >
                  {buttonLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Project Popup */}
      <NewProjectPopup
        isOpen={isNewPopupOpen}
        onClose={() => setNewPopupOpen(false)}
        onSubmit={handleNewProject}
      />

      {/* Update Project Popup */}
      <UpdateProjectPopup
        isOpen={isUpdatePopupOpen}
        onClose={() => setUpdatePopupOpen(false)}
        onSubmit={handleUpdateProject}
        projectData={selectedProject}
        id={selectedId}
      />
    </>
  );
}

export default AdminProjectsComponent;
