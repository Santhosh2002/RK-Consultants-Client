import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = React.useState([]);
  const handleNavigate = ()=>{
    navigate('/services')
  } 

  const getServices = async () => {
    const base = import.meta.env.VITE_BASE_URL;
    const url = base + "/api/service";
    const response = await axios.get(url);
    setServices(response.data.services);
    return response.data.services;
  }
  useEffect (()=>{
    getServices();
  },[])

  return (
    <section className="p-8 bg-gray-950" id="services">
        <div className="text-white font-semibold justify-center items-center flex text-3xl ">What We Offer</div>
        <div className=" text-gray-400 font-normal justify-center items-center flex text-light mb-10 text-center ">Empowering you with innovative solutions, tailored to exceed your expectations!</div>
 <div className="max-w-screen-xl  px-4  justify-center items-center mx-auto">
        {
  services.slice(0, 3).map((service, index ) => {
    const isEven = index % 2 === 0; // Check if the index is even
    return (
      <motion.div variants={
        fadeIn('up', 0.2)
        } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0.1 }}    key={index} className={`container  grid mx-auto  mb-10 lg:grid-cols-2 items-center gap-8 ${isEven ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white to-[#E0EDE5]  p-8 rounded-xl border border-[#E0EDE5] shadow-md duration-150 `} >
        {/* Conditional rendering to alternate image and text */}
        {isEven ? (
          <>
            <img
              src={service.image}
              alt="deliver instant answers"
              className="object-cover w-full max-h-80 rounded-xl hidden sm:block"
            />
            <div className="w-full py-4 md:py-5 lg:px-8">
              <p className="block antialiased font-sans text-2xl leading-relaxed text-inherit mb-10 font-normal sm:font-bold !text-black">
                {service.name}.
              </p>
              
                <p className=" font-normal text-gray-500 list-disc">{service.description}</p>
                <Link to="/services" >
                <a href="" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  text-green-800 border border-green-800 rounded-lg hover:bg-green-800 hover:text-white duration-150 focus:ring-4 focus:ring-gray-100 mt-3">
                       View all services
                    </a></ Link>
                
              
            </div>
          </>
        ) : (
          <>
            <div className="w-full py-4 md:py-5 lg:px-8">
              <p className="block antialiased font-sans text-2xl leading-relaxed text-inherit mb-10 font-semibold  sm:font-bold !text-black">
                {service.name}.
              </p>
              
              <p  className=" font-normal text-gray-500 list-disc">{service.description}</p>
              <Link to="/services" >
                <a href="" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  text-green-800 border border-green-800 rounded-lg hover:bg-green-800 hover:text-white duration-150 focus:ring-4 focus:ring-gray-100 mt-3">
                       View all services
                    </a></ Link>
                
              
            </div>
            <img
              src={service.image}
              alt="deliver instant answers"
              className="object-cover w-full max-h-80 rounded-xl hidden sm:block"
            />
          </>
        )}
        </motion.div>
      
    );
  })
}
</div>

  
</section>
  );
};

export default Services;
