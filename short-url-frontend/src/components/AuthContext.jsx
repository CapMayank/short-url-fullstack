import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'; // Import the cookie library

// Create the AuthContext
const AuthContext = createContext(); 

// AuthProvider to manage 'isLoggedIn' state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the 'uid' cookie when the component mounts
  useEffect(() => {
    const uid = Cookies.get('uid'); // Retrieve the 'uid' cookie
    console.log(uid)
    if (uid) {
      setIsLoggedIn(true); // Set the state to true if the cookie exists
    }
    console.log(isLoggedIn)
  }, []); // Runs once when the component mounts

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext); 
