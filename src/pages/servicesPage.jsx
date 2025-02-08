import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import FooterComponent from "../components/footer";
import Navbar from "../components/Navbar";


const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [general, setGeneral] = useState({});
  const getGeneralSettings = async()=>{
    const base = import.meta.env.VITE_BASE_URL;
    const url = base + "/api/general"; 
    const response = await axios.get(url); 
    setGeneral(response.data.general);
    return response.data.general; 
  }
  useEffect(()=>{
    getGeneralSettings(); 
  },[]); 
  

  const getServices = async () => {
    setIsLoading(true);
    const base = import.meta.env.VITE_BASE_URL;
    const url = `${base}/api/service`;
    try {
      const response = await axios.get(url);
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (isLoading) {
    return (
      <section className="p-8 bg-gray-950" id="services">
        <div className="text-white font-bold text-center text-4xl mb-4">
          Services We Provide
        </div>
        <div className="text-gray-400 font-medium text-center mb-12 text-lg">
          Loading services for you...
        </div>
        <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
    <Navbar logo={general.logo}/>
    <section className="p-8 bg-gray-950 mt-10 " id="services">
      {/* Header Section */}
      <div className="text-white font-bold text-center text-4xl mb-4">
        Services We Provide
      </div>
      <div className="text-gray-400 font-medium text-center mb-12 text-lg">
        Our tailored solutions are designed to help you achieve your goals effortlessly.
      </div>

      {/* Services Section */}
      <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className="p-8 rounded-xl bg-gradient-to-r from-white to-[#E0EDE5] shadow-lg border border-gray-700 hover:shadow-lg hover:shadow-gray-700 duration-150" 
          >
            <div className="flex justify-center items-center mb-6">
              <img
                src={service.icon || service.image}
                alt={service.name}
                className="max-h-36 w-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-black text-xl font-normal text-center mb-4">
              {service.name}
            </h3>
            <p className="text-gray-500 text-center text-xs mb-6">
              {service.description}
            </p>
            <div className="text-center">
              <button
                onClick={() => openModal(service)}
                className="px-6 py-2 text-gray-700 border border-gray-600 rounded-lg hover:bg-green-700 hover:text-white transition duration-150 " 
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Component */}
      {isModalOpen && selectedService && (
        <Modal service={selectedService} onClose={closeModal} />
      )}
    </section>
  
    <FooterComponent address={general.address} phone={general.phone} email={general.email} logo={general.logo} insta={general.instagram} fb={general.facebook}   linkedin={general.linkedin}  />
    </>
  );
};

const Modal = ({ service, onClose }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    console.log("Form Submitted:", formData);
    e.target.reset(); // Reset form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{service.name}</h2>
            </div>
            <p className="text-gray-500 mb-4 text-sm text-justify">{service.description}</p>
            <h3 className="text-lg font-semibold mb-2">Sub-services:</h3>
            <ul className="list-disc list-inside text-gray-400">
              {service.subServices?.length > 0 ? (
                service.subServices.map((subService, index) => (
                  <li key={index}>{subService}</li>
                ))
              ) : (
                <li>{service.name}</li>
              )}
            </ul>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mt-6 mb-2">Contact Us</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                              Phone
                            </label>
                            <textarea
                              id="phone"
                              rows="1"
                              className="mt-1 p-2 block w-full border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              required
                            ></textarea>
                          </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};





export default ServicesPage;

const ShimmerCard = () => {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 animate-pulse">
      <div className="flex justify-center items-center mb-6">
        <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-6 bg-gray-700 rounded-md mb-4 mx-auto w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded-md mx-auto w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded-md mx-auto w-4/5"></div>
        <div className="h-4 bg-gray-700 rounded-md mx-auto w-3/4"></div>
      </div>
      <div className="mt-6 h-10 bg-gray-700 rounded-md mx-auto w-2/3"></div>
    </div>
  );
};

