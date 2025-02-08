import { Menu, X } from "lucide-react";
import { useState,useEffect } from 'react';
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { label } from "framer-motion/client";
const navItems = [
  
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  {label: 'Projects/Listings', href: '/projects'},
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: 'mailto:info@rkrealco.com' },
 {label : "Social", href :"https://www.youtube.com/@RKRealtorsConsultants" } ,
  {label: "Payments", href:""}, 

];
export const HeroSection = ({logo}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const images = [
        "/slider-img-02.jpg",
        "/slider-img-01.jpg",
        "/slider-img-03.jpg", // Add your image paths here
        "/slider-img-04.jpg", 
      ];
    const text =[
        "Quick and hassle free real estate solutions tailored to your needs",
        "Your one-stop solution for all your business needs.",
        "Navigate through the complex tax regulations with ease.",
        "Unlock access to the best deals in the market – List your property with us today! ", 
    ];   
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
      const [fadeDirection, setFadeDirection] = useState('left');
  
      useEffect(() => {
        const interval = setInterval(() => {
            setFadeDirection('right'); // Start fading out the old image to the right
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFadeDirection('left'); 
            }, 400); // Wait for the old image to fade out before switching
        }, 6000); // Change image every 4 seconds

        // Clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);
     
    
return (
    <>
    <div className="absolute bg-transparent shadow-none w-full z-10 top-0 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 lg:pr-3">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <img src= {logo} alt=""className=" md:max-h-12 lg:max-h-16  max-h-10 overflow-y-hidden lg:mt-2 invert "/>
                            
                           
                            {/* <span className="font-medium text-xl text-black">RK Realtors & Consultants</span> */}
                        </div>
                        <div className="hidden lg:flex  min-[1200px]:space-x-8 min-[1023px]:space-x-3.5 min-[1100px]:space-x-4 space-x-8 ">
                            {navItems.map((item) => (
                                <div key={item.label} className="relative group justify-center items-center text-xs min-[1025px]:text-xs ">
                                    <a href={item.href} className="  md:text-white md:hover:text-gray-50 lg:text-white lg:hover:text-white text-gray-200 hover:text-white font-semibold ">
                                        {item.label}
                                    </a>
                                    <span className="absolute -bottom-0 left-1/2 w-0 transition-all h-0.5 mt-0 bg-white group-hover:w-3/6"></span>
                                    <span className="absolute -bottom-0 right-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
                                </div>
                            ))}
                            <div className="bg-green-500 hover:bg-green-800  text-white hover:text-white duration-150 ease-in rounded-md px-2 py-[3px] text-xs font-semibold">
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLScHPK67SznmrqYkqI6pchgyrKSvIc6hMn-mlcmpIdvJL6Q8hg/viewform?usp=sf_link">List Your Property</a>
                            </div>
                        </div>
        
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-black focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="lg:hidden bg-white shadow-md ">
                        <div className="px-4 pt-4 pb-2 space-y-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block text-gray-600 hover:text-black font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="bg-green-200 hover:bg-green-500  text-gray-600 hover:text-white duration-150 ease-in rounded-lg px-2 text-sm">
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLScHPK67SznmrqYkqI6pchgyrKSvIc6hMn-mlcmpIdvJL6Q8hg/viewform?usp=sf_link">List Your Property</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    {/* <Navbar logo={logo} /> */}
    
    
    <section className="bg-gray-950 min-[100px]:pt-14  min-[400px]:pt-0">
            <div className=" grid max-w-screen-xl px-1 mx-auto lg:gap-4 xl:gap-0  lg:grid-cols-12 max-h-screen lg:h-screen lg:py-0 md:pt-10 min-[300px]:pt-12">
               
            

                <div className="mr-auto place-self-center lg:col-span-5 p-4 sm:pt-14">
                <div
                        className={`transition-all duration-1000 ease-in-out ${
                            fadeDirection === 'left' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-40'
                        }`}
                    >

                    <motion.p  variants={
                    fadeIn('up', 0.2)
                    } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0.1 }}className="max-w-2xl mb-4 text-4xl tracking-tight leading-none md:text-5xl xl:text-6xl text-white text-semibold ">{text[currentImageIndex]} </motion.p>
                    

                    <motion.p  variants={
                    fadeIn('up', 0.4)
                    } initial="hidden" whileInView={"show"}viewport={{once: true,amount:0.1 }}className="max-w-2xl mb-6 font-normal lg:mb-8 md:text-lg lg:text-xl  text-gray-400">RK Realtors & Tax Consultants provide a comprehensive solution for all your real estate and business consulting needs. </motion.p>
                
                    <motion.a  variants={
                    fadeIn('up', 0.4)
                    } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0.1 }} href="#services" className=  {` ${currentImageIndex == 0 ? "block":"hidden"}  inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-green-300 border border-green-300 hover:bg-green-400 duration-150  hover:shadow-lg focus:ring-4 focus:ring-primary-300`}>
                        Get started
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </motion.a>
                    
                </div>
                </div>
                <motion.div  variants={
                    fadeIn('up', 0.2)
                    } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0.1 }}className="hidden lg:mt-0 lg:col-span-7 lg:flex h-full w-auto">
                    <div
                        className={`transition-all duration-1000 ease-in-out ${
                            fadeDirection === 'left' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-40'
                        }`}
                    >
                        <img
                            src={images[currentImageIndex]}
                            alt="mockup"
                            className="object-cover w-[100vh] h-screen overflow-y-hidden"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
        
        
        </>
);
};

