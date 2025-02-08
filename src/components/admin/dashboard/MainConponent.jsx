import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import StatsComponent from './StatsComponent';
import ServicesComponent from './ServicesComponent';
import AdminProjectsComponent from './ProjectComponent';
import { useNavigate } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';
import ListingComponent from './ListingComponent';
// import UserSettingsComponent from '../dashboard/UserSetitingsComponent';

function MainComponent() {
  const [userName, setUserName] = useState('');
  const [selectedPage, setSelectedPage] = useState(0); // Index for selected page
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle state for sidebar
  
  const getUserName = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.role);
      return decoded.id;
    }
    return '';
  };

  useEffect(() => {
    getUserName();
  }, []); // Added an empty dependency array to prevent continuous re-runs

  const renderContent = () => {
    switch (selectedPage) {
      case 0:
        return <StatsComponent />;
      case 1:
        return <ServicesComponent />;
      case 2:
        return <AdminProjectsComponent/>;
      case 3: 
        return <ListingComponent/>
     
      default: 
        return  <GeneralSettings/> ; 
    }
  };

  return (
    <div className="flex h-screen overflow-y-scroll w-screen bg-white ">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar setSelectedPage={setSelectedPage} setIsSidebarOpen={setIsSidebarOpen} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Nav username={userName} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default MainComponent;

// Sidebar Component
const Sidebar = ({ setSelectedPage, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="w-56 bg-green-100 text-black flex flex-col duration-150 h-full sticky top-0">
      <div className="p-4 text-sm font-semibold border-b border-gray-700 flex justify-between items-center">
        RK Realtors & Consultants
        <button
          className="text-gray-400 hover:text-gray-600 px-3"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✕
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li
            className="hover:bg-green-200 p-2 rounded cursor-pointer"
            onClick={() => setSelectedPage(0)}
          >
            Stats
          </li>
          <li
            className="hover:bg-green-200 p-2 rounded cursor-pointer"
            onClick={() => setSelectedPage(1)}
          >
            Services
          </li>
          <li
            className="hover:bg-green-200 p-2 rounded cursor-pointer"
            onClick={() => setSelectedPage(2)}
          >
            Projects
          </li>
          <li
            className="hover:bg-green-200 p-2 rounded cursor-pointer"
            onClick={() => setSelectedPage(3)}
          >
           Listings
          </li>
          <li
            className="hover:bg-green-200 p-2 rounded cursor-pointer"
            onClick={() => setSelectedPage(4)}
          >
            General Settings
          </li>
        
        </ul>
      </nav>
      <div className="p-4 border-t border-green-700 duration-150">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
          onClick={() => {
            localStorage.removeItem('authToken');
            navigate('/admin/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Nav Component
const Nav = ({ username, toggleSidebar ,isSidebarOpen}) => {
  return (
    <div className="w-auto bg-white border-b border-gray-200 overflow-hidden min-h-16">
      <div className="flex justify-between items-center  mx-auto p-4">
        <button
          className={`text-gray-800 hover:text-gray-600   ${isSidebarOpen ? "hidden" :"block"}`}
          onClick={toggleSidebar}

        >
          ☰
        </button>
        <div className="text-sm font-normal text-gray-900">RK Realtors & Consultants</div>
        <div className="flex items-center justify-center">
          <div>
            <a href="/" target="_blank" className="text-gray-600">
              <img
                src="/open-link.svg"
                alt=""
                className="size-5 mx-4 text-gray-200 hover:text-gray-800"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
           
          </div>
        </div>
      </div>
    </div>
  );
};
