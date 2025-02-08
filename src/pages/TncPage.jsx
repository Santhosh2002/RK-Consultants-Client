import axios from 'axios';
import React from 'react'
import { Menu, X } from "lucide-react";
import FooterComponent from '../components/footer';
// import { Navbar } from '../components/navbar';
import Navbar from "../components/Navbar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "mailto:info@rkrealco.com" },
];

function TncPage() {
    const [general, setGeneral] = React.useState({});
        // Fetch general settings
        const getGeneralSettings = async () => {
            const base = import.meta.env.VITE_BASE_URL;
            const url = base + "/api/general";
            try {
              const response = await axios.get(url);
              setGeneral(response.data.general);
            } catch (error) {
              console.error("Error fetching general settings:", error);
            }
          };
        
          React.useEffect(() => {
            getGeneralSettings();
          }, []);
            const [isOpen, setIsOpen] = React.useState(false);
            const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
     <Navbar logo={general.logo}/>
        <div className="min-h-screen bg-gray-950 text-gray-300 p-6 mt-10 sm:p-12">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <header className="bg-gray-900 text-white text-center py-4">
          <h1 className="text-2xl font-bold">Welcome to RK Realtors & Consultants</h1>
        </header>

        <main className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Terms and Conditions</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{general.terms}</p>
          </section>

      
        </main>

        <footer className="bg-gray-700 text-center py-4 text-gray-400 text-sm">
          &copy; {"2024"}RK Realtors & Consultants. All Rights Reserved.
        </footer>
      </div>
    </div>
    <FooterComponent address={general.address} phone={general.phone} email={general.email} logo={general.logo} insta={general.instagram} fb={general.facebook}   linkedin={general.linkedin}  />
    </>
  )
}

export default TncPage