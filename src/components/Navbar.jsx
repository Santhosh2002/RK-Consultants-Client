
import { Menu, X } from "lucide-react";
import { useState } from 'react';
const navItems = [
  
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {label: 'Projects/Listings', href: '/projects'},
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: 'mailto:info@rkrealco.com' },
 {label : "Social", href :"https://www.youtube.com/@RKRealtorsConsultants" } ,
  {label: "Payments", href:""},  

];

 const Navbar = ({logo}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    
        <div className="absolute bg-gray-950 shadow-none w-full z-10 top-0 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 lg:pr-3">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <img src= {logo} alt=""className=" md:max-h-12 lg:max-h-16  max-h-10 overflow-y-hidden lg:mt-2 invert "/>
                        
                       
                        {/* <span className="font-medium text-xl text-black">RK Realtors & Consultants</span> */}
                    </div>
                    <div className="hidden md:flex  min-[1200px]:space-x-8 min-[1023px]:space-x-3.5 min-[1100px]:space-x-4 space-x-8 ">
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
    
                    <div className="md:hidden">
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
                <div className="md:hidden bg-white shadow-md">
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
  );
};

export default Navbar;