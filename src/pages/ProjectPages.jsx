import axios from 'axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import FooterComponent from '../components/footer';
// import { Navbar } from '../components/navbar';
import Navbar from "../components/Navbar";
const navItems = [
  
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {label: 'Projects/Listings', href: '/projects'},
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: 'mailto:info@rkrealco.com' },
];
function ProjectPages() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const getProjects = async () => {
    const url = import.meta.env.VITE_BASE_URL + '/api/project/';
    const listingsUrl = import.meta.env.VITE_BASE_URL + '/api/listing/';
    try {
      const response = await axios.get(url);
      const listingResponse = await axios.get(listingsUrl);
      setListings(listingResponse.data.listings);
      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-900 w-screen h-screen flex justify-center items-center">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  return (
    <>
    <Navbar />
    
    <div className="bg-gray-950 text-white min-h-screen ">
      

      <section className="container mx-auto p-8 mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-gradient-to-r from-white to-[#E0EDE5] rounded-lg shadow-lg p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-md mb-4 duration-150"
              />
              <h3 className="text-xl font-normal mb-2 text-gray-900">{project.title}</h3>
              <p className="text-gray-800 mb-4 font-light">
                {project.description.length > 60
                  ? `${project.description.substring(0, 60)}...`
                  : project.description}
              </p>
              <div className='flex justify-between items-end flex-row-reverse'>
              <Link to={`/projects/p/${project._id}`} >
      <button className=" bg-black text-white py-2 rounded-full w-32 hover:bg-gray-900">
      Details
    </button>
      </Link>{project.brochure && (
                <a
                  href={project.brochure}
                  className="text-blue-400 font-medium hover:underline"
                >
                  View Brochure &rarr;
                </a>
              )}
               
              </div>
              
              
              
            </div>
            
          ))}
        </div>
      </section>

      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Latest Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
  <div
    key={listing._id}
    className="bg-gradient-to-r from-white to-[#E0EDE5] rounded-lg shadow-lg p-4 flex flex-col items-start"
  >
    {listing.images && listing.images.length > 0 ? (
      <Swiper navigation modules={[Navigation]} className="w-full h-64 mb-4 rounded-md">
        {listing.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`${listing.title} image ${index + 1}`}
              className="w-full h-64 object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div className="w-full h-64 flex justify-center items-center bg-gray-400 text-gray-900 rounded-md mb-4">
        No Image Available
      </div>
    )}

    <div className="w-full">
      <h5 className="text-lg font-normal text-gray-900 mb-1">{listing.title}</h5>
      <p className="text-xs font-light text-gray-500 mb-2">
        {listing.description}
      </p>
    </div>

    <div className="w-full flex justify-between items-center mb-4">
      <p className="text-xl font-bold text-gray-800">₹{listing.price} </p>
      <Link to={`/projects/${listing._id}`} >
      <button className=" bg-black text-white py-2 rounded-full w-32 hover:bg-gray-900">
      Details
    </button>
      </Link>
      
    </div>

    
  </div>
))}

        </div>
      </section>
    </div>
    
    <FooterComponent />
    </>
    
  );
}

export default ProjectPages;
