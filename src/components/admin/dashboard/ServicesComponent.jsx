import React from 'react';
import axios from 'axios';
import NewServicePopup from '../../utils/NewServicePopup';
import UpdateServicePopup from '../../utils/UpdatingServices';
import { useNavigate } from 'react-router-dom';

function ServicesComponent() {
  const url = import.meta.env.VITE_BASE_URL + "/api/service";
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isNewPopupOpen, setNewPopupOpen] = React.useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  const [imageError, setImageError] = React.useState(null);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const navigate = useNavigate();

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
      setImageError('File upload failed.');
      return null;
    }
  };

  const handleServiceSubmission = async (data, id = null) => {
    try {
      if (data.image == null) {
        data.image = "";
      }
      if (data.image) {
        const imageUrl = await handleFileUpload(data.image);
        if (imageUrl) {
          data.image = imageUrl;
        } else {
          throw new Error('Image upload failed.');
        }
      }
      console.log(data); 
      if (id) {
        await updateService(data, id);
      } else {
        await addService(data);
      }
    } catch (error) {
      console.error('Service submission error:', error);
      setError(error.message);

    }
  };

  const addService = async (data) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${url}/create`, data, {
        headers: { Authorization: `${token}` },
      });
      setServices((prev) => [...prev, response.data]);
      setNewPopupOpen(false);
    } catch (error) {
      console.error('Error adding service:', error);
      setError(error.message);
    }
  };

  const updateService = async (data, id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`${url}/${id}`, data, {
        headers: { Authorization: `${token}` },
      });
      setServices((prev) =>
        prev.map((service) => (service._id === id ? { ...service, ...data } : service))
      );
      setUpdatePopupOpen(false);
    } catch (error) {
      console.error('Error updating service:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    setButtonLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${url}/delete/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
      setError(error.message);
    }
    setButtonLoading(false);
  };

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(url);
        setServices(response.data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [handleServiceSubmission, url]);

  const handleErrorClose = () => {
    setError(null); // Reset error to null
  };

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-60 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <section>
        <div className=" h-screen justify-center items-center bg-white">
          <div className="text-center text-red-500">
            {error}
            <button onClick={handleErrorClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      </section>
    );

  return (
    <>
      <section className="bg-white w-auto h-auto overflow-hidden">
        <div className="text-xl text-gray-600 flex justify-center">Services Section</div>
        <div
          onClick={() => setNewPopupOpen(true)}
          className="ml-6 cursor-pointer max-w-56 p-1 bg-blue-400 border border-blue-300 rounded-lg shadow hover:bg-blue-500 hover:shadow-lg duration-150 flex justify-center items-center"
        >
          <p className="text-md font-bold tracking-tight text-white text-center">Add New Service</p>
        </div>
        <div className="container max-w-max bg-white mx-auto flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-white">
            {services.map((service) => (
              <div
                key={service._id}
                className="block max-w-md p-6 bg-white border border-gray-400 rounded-lg shadow hover:bg-gray-50 hover:shadow-lg duration-150"
              >
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-xs text-gray-500 flex justify-center">{service._id}</p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                  {service.name}
                </h5>
                <p className="font-light text-gray-700 text-sm text-center">
                  {service.description.length > 20
                    ? `${service.description.substring(0, 40)}...`
                    : service.description}
                </p>
                <p className = "font-light text-gray-400 text-xs mt-5 text-center">
                    {service.subServices.length == 0 ? "No-SubServices":service.subServices.map((subService) => {
                      return subService + ", ";
                    })}
                </p>
                <div className="flex justify-end mt-8 gap-3">
                  <div
                    className="text-sm rounded-lg bg-blue-500 text-white py-2 px-3 cursor-pointer"
                    onClick={() => {
                      setSelectedService(service);
                      setUpdatePopupOpen(true);
                    }}
                  >
                    Update
                  </div>
                  <div
                    className="text-sm rounded-lg bg-red-500 text-white py-2 px-3 cursor-pointer"
                    onClick={buttonLoading ? () => {} : () => handleDelete(service._id)}
                  >
                    {buttonLoading ? 'Deleting...' : 'Delete'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Service Popup */}
      <NewServicePopup
        isOpen={isNewPopupOpen}
        onClose={() => setNewPopupOpen(false)}
        onSubmit={handleServiceSubmission}
      />

      {/* Update Service Popup */}
      <UpdateServicePopup
        isOpen={isUpdatePopupOpen}
        onClose={() => setUpdatePopupOpen(false)}
        onSubmit={(data) => handleServiceSubmission(data, selectedService._id)}
        serviceData={selectedService}
      />
    </>
  );
}

export default ServicesComponent;
