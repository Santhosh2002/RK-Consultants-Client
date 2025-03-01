import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import FooterComponent from "../components/footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { label } from "framer-motion/client";
const navItems = [
  
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {label: 'Projects/Listings', href: '/projects'},
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: 'mailto:info@rkrealco.com' },
];
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
// import { Navbar } from "../components/navbar";
import Navbar from "../components/Navbar";
import { list } from "postcss";
function ListingDetailPage() {
  const [listingData, setListingData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const fetchDetails = async () => {
    try {
      const base = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(`${base}/api/listing/${id}`);
      setListingData(response.data.listing);
    } catch (error) {
      console.error("Error fetching listing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-950 min-h-screen">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-4xl mx-auto animate-pulse">
          {/* Header Shimmer */}
          <div className="flex justify-between items-center">
            <div className=" bg-gray-800 h-6 w-32 rounded-md"></div>
            <div className=" bg-gray-800 h-6 w-32 rounded-md"></div>
          </div>

          {/* Image Section Shimmer */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className=" bg-gray-800 h-32 rounded-md"></div>
            <div className=" bg-gray-800 h-32 rounded-md"></div>
            <div className=" bg-gray-800 h-32 rounded-md"></div>
          </div>

          {/* Details Section Shimmer */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[...Array(9)].map((_, index) => (
              <div key={index}>
                <div className=" bg-gray-800 h-5 w-36 rounded-md mb-2"></div>
                <div className=" bg-gray-800 h-5 w-24 rounded-md"></div>
              </div>
            ))}
          </div>

          {/* Contact Owner Section Shimmer */}
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className=" bg-gray-700 h-5 w-48 rounded-md mb-2"></div>
            <div className=" bg-gray-700 h-5 w-32 rounded-md"></div>
            <div className=" bg-gray-700 h-10 w-24 rounded-md mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-950 min-h-screen flex justify-center items-center">
        <p className="text-gray-500 dark:text-gray-400">No data available for this listing.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
    <div className="p-6 bg-gray-950 min-h-screen mt-16">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-[1100px] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-200">Rs. {listingData.price || "N/A"}</h1>
          
        </div>
        <p className="text-gray-400 text-sm mt-1">
          <a href="#" className="text-gray-400 underline">
            Home Loan Available 
          </a>
        </p>
        <h3 className="text-lg font-normal text-gray-200 mt-6">{listingData.title}</h3>

        {/* Image Section */}
        <div className="mt-1 grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        {listingData.images && listingData.images.length > 0 ? (
      <Swiper navigation modules={[Navigation]} className="w-full h-72 mb-4 rounded-md">
        {listingData.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`${listingData.title} image ${index + 1}`}
              className="w-full h-72 object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div className="w-full h-64 flex justify-center items-center bg-gray-400 text-gray-900 rounded-md mb-4">
        No Image Available
      </div>
    )}
          <div className="bg-gray-900 px-2 rounded-lg">
      
            
        
            <div className="flex items-center bg-gray-800 rounded-lg p-2 justify-between mt-2">
            {[{ label: "Bedrooms", value: listingData.bedrooms }, { label: "Bathrooms", value: listingData.bathrooms }, { label: "Balcony", value: listingData.balcony }, { label: "Furnishing", value: listingData.furnishingStatus }].map((detail, index, array) => (
  <div key={index} className="lg:flex  md:flex  justify-center"> 
    <div>
      <h3 className="text-gray-400 text-sm">{detail.label}</h3>
      <p className="text-gray-200 text-center font-semibold">
        {detail.value || "N/A"}
      </p>
    </div>
    <div className={`h-10 items-center hidden   mx-5 w-0.5 bg-gray-700 ${index === array.length - 1 ? "hidden" : "md:block"}`}></div>
  </div>
))}

            </div>
            <div className="grid grid-cols-3 gap-3 mt-6 items-center justify-center ">
          {[{label:"Carpet Area",value : listingData.carpetArea + " sqft"},{ label: "Status", value: listingData.status }, { label: "Facing", value: listingData.facing }, { label: "Furnishing Status", value: listingData.furnishingStatus }, { label: "Parking", value: listingData.parking }, { label: "Age of Construction", value: listingData.age + " Years" },{
            label: "Landmark",
            value: listingData.landmark,
          },{
            label:"floors",
            value : listingData.floor
          }].map((detail, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-gray-400 text-sm items-center justify-center">{detail.label}</h3>
              <p className="text-gray-200 font-semibold items-center justify-center">
                {detail.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      

          </div>
          
        </div>

        {/* Details Section
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[{ label: "Status", value: listingData.status }, { label: "Facing", value: listingData.facing }, { label: "Furnishing Status", value: listingData.furnishingStatus }, { label: "Parking", value: listingData.parking }, { label: "Type of Ownership", value: listingData.ownership }, { label: "Age of Construction", value: listingData.age + " Years" }].map((detail, index) => (
            <div key={index}>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm">{detail.label}</h3>
              <p className="text-gray-800 dark:text-gray-200 font-semibold">
                {detail.value || "N/A"}
              </p>
            </div>
          ))}
        </div> */}
        <div className="w-full h-0.5 bg-gray-800 mt-3"></div>

        {/* Contact Owner */}
        <button className="mt-3 bg-green-500 text-white px-6 py-2 rounded-full font-medium" onClick={togglePopup}>
          Contact us
        </button>
       
      </div>

      <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-[1100px] mx-auto mt-3">
        <h1 className="text-2xl font-normal text-gray-200">More Details</h1>
        <div className="grid grid-cols-1 gap-4 mt-6">
          {[{ label: "BHK ", value: listingData.bhk + " BHK" }, { label: "Price Breakup ", value: "Rs. "+ (listingData.price/listingData.carpetArea).toPrecision(6) + " per Sqft" }, { label: "Balcony", value: listingData.balcony }, { label: "Facing", value: listingData.facing }, { label: "Furnishing Status", value: listingData.furnishingStatus }, { label: "Parking", value: listingData.parking }, { label: "Landmark", value: listingData.landmark },{ label: "Loan Offered ", value: "Available" },{
            label :"Video", value : listingData.video 
          }].map((detail, index) => (
             <div key={index} className="flex w-full ">
                          <h3 className="text-gray-400 text-sm w-[40%] ">{detail.label}</h3>
                          <p className="w-[60%]">
                            {detail.value === "" ? "N/A" : (detail.label === "Video" && detail.value != "") ? (
                              <a href={detail.value} target="_blank"  className = "text-gray-400 underline "rel="noopener noreferrer">Watch</a>
                            ) : (
                              detail.value
                            )}
                          </p>
                        </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm">Amenities</h3>
          <div className="flex items-center gap-2 mt-2">
            {listingData.amenities && listingData.amenities.length > 0 ? (
              listingData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="bg-gray-800 text-gray-300 px-2 py-1 rounded-lg text-sm"
                >
                  {amenity}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No amenities available</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm">Description</h3>
          <p className="text-gray-200 mt-2">{listingData.description}</p>
        </div>
        <div className="w-full h-0.5 bg-gray-800 mt-3"></div>

        {/* Contact Owner */}
       
      </div>
    </div>
    <FooterComponent />



    {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 block w-full border bg-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium  text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 block w-full border bg-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 p-2 block w-full border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="mr-4 text-gray-200 bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-primary-900 border-white border "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
</>



  );
}

export default ListingDetailPage;