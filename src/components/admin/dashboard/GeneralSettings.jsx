import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    _id: "",
    logo: null,
    title: "",
    about: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    terms: "",
    privacy: "",
    shippingPolicy:"",
    refundPolicy:""
  });
  const[isUpadting, setIsUpdating] = useState(false);

  const [originalSettings, setOriginalSettings] = useState({});
  const [previewLogo, setPreviewLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_BASE_URL;

  // Fetch current settings
  useEffect(() => {
    axios
      .get(base + "/api/general")
      .then((response) => {
        setSettings(response.data.general);
        setOriginalSettings(response.data.general); // Save original settings for comparison
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching settings");
        setLoading(false);
      });
  }, []);

  // Handle file upload
  const handleFileUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("fileToUpload", file);

    const uploadUrl = import.meta.env.VITE_UPLOAD_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // Handle file change for logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSettings({ ...settings, logo: file });
    setPreviewLogo(URL.createObjectURL(file));
  };

  // Prepare data for submission
  const prepareDataForSubmission = () => {
    const updatedSettings = {};

    Object.keys(settings).forEach((key) => {
      if (key === "logo" && settings[key]) {
        updatedSettings[key] = settings[key];
      } else if (settings[key] !== originalSettings[key]) {
        updatedSettings[key] = settings[key];
      }
    });

    return updatedSettings;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setIsUpdating(true);
    e.preventDefault();
    

    const formData = new FormData();
    const updatedData = prepareDataForSubmission();

    for (const key in updatedData) {
      if (updatedData[key]) {
        formData.append(key, updatedData[key]);
      }
    }

    // If a new logo is being uploaded, process the file upload
    if (previewLogo !== null) {
      const image = await handleFileUpload(settings.logo);
      if (image) {
        formData.set("logo", image); // Use `set` to overwrite the previous `logo` value
        updatedData.logo = image;
      } else {
        toast.error("Error uploading file");
        return;
      }
    }

    const token = localStorage.getItem("authToken");
    // console.log([...formData.entries()]);
    console.log("Updated Data:", updatedData);
    //  Debugging: Log form data entries

    axios
      .post(base + "/api/general/" + settings._id, updatedData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        toast.success("Settings updated successfully!");
      })
      .catch((error) => {
        toast.error("Error updating settings");
        console.error(error);
      });
    setIsUpdating(false);
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Update General Settings</h1>
      {loading ? (
        <div className="space-y-4">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="w-full h-12 bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-md">
          {/* Logo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 bg-white border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {previewLogo && (
              <img
                src={previewLogo}
                alt="Logo Preview"
                className="mt-4 w-24 h-24 object-cover rounded"
              />
            )}
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={settings.title}
              onChange={handleChange}
              className="w-full text-gray-600 bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* About */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">About</label>
            <textarea
              name="about"
              value={settings.about}
              onChange={handleChange}
              rows="4"
              className="w-full text-gray-600 bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          {/* Other Fields */}
          {[
            { label: "Contact", name: "contact" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Address", name: "address" },
            { label: "Facebook", name: "facebook" },
            { label: "Instagram", name: "instagram" },
            { label: "LinkedIn", name: "linkedin" },
            { label: "Terms", name: "terms", isTextarea: true },
            { label: "Privacy", name: "privacy", isTextarea: true },
            { label: "Shipping Policy", name: "shippingPolicy", isTextarea: true },
            { label: "Refund Policy", name: "refundPolicy", isTextarea: true },
          ].map(({ label, name, isTextarea }) => (
            <div className="mb-4" key={name}>
              <label className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              {isTextarea ? (
                <textarea
                  name={name}
                  value={settings[name]}
                  onChange={handleChange}
                  rows="4"
                  className="w-full text-gray-600 bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
              ) : (
                <input
                  type="text"
                  name={name}
                  value={settings[name]}
                  onChange={handleChange}
                  className="w-full text-gray-600 bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled = {isUpadting}
            className={` text-white px-6 py-2 rounded-md  focus:outline-none focus:ring focus:ring-blue-300 ${isUpadting ? "bg-gray-400 text-black" : "bg-blue-500 hover:bg-blue-700"}`}
          >
            {isUpadting ? "Updating..." : "Update Settings"}
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default GeneralSettings;
