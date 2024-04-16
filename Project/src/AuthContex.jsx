// AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(); // Create context

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [darkMode, setDarkMode] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn ,darkMode,setDarkMode}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Custom hook to use AuthContext
