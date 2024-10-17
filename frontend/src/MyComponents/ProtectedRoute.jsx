import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  
  useEffect(() => {
    const checkAuth = async () => {
      const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken'); // Renamed this variable
      console.log(refreshTokenFromLocalStorage);

      if (refreshTokenFromLocalStorage) {
        try {
          // Make an async POST request to verify the refreshToken
          const response = await axios.post('http://localhost:8000/api/v1/users/verify-token', {}, {
            headers: {
              'Authorization': `Bearer ${refreshTokenFromLocalStorage}` // Use the renamed variable here
            },
            withCredentials: true // Include cookies in the request
          });

          setData(response.data);
          // Log the entire response data for debugging

          // Access the tokens from response.data.data
          const { refreshToken: newRefreshToken } = response.data.data; // Renamed this variable

          if (newRefreshToken) {
            setIsAuthenticated(true);  // User is authenticated
          } else {
            console.log(isAuthenticated);
            setIsAuthenticated(false); // Invalid token, user is not authenticated
          }

        } catch (error) {
          console.log('Error during token verification:', error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false); // Finish loading after request
        }

      } else {
        setIsAuthenticated(false); // No token found, mark as not authenticated
        setLoading(false);
      }
    };

    checkAuth(); // Call the async function inside useEffect
  }, []);

  // Display a loading screen while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  //redux data setup

  // Render protected content if authenticated, otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
