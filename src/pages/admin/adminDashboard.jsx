import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import MainConponent from "../../components/admin/dashboard/MainConponent";

function AdminDashBoard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

      if (!token) {
        // No token found, redirect to login
        navigate("/admin/login");
        return;
      }

      try {
        const decoded = jwtDecode(token); // Decode the token
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        console.log(decoded.exp - currentTime);

        if (decoded.exp < currentTime) {
          
          localStorage.removeItem("authToken"); 
          navigate("/admin/login");
        } else {
    
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/admin/login"); // Redirect to login on error
      }
    };

    verifyToken();
  }, [navigate]);
  // Show loading or nothing while checking the token
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }
  return (
    <>    
    <MainConponent/>
    </>
  );
}

export default AdminDashBoard;
