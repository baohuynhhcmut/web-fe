

import React, { createContext, useState, useContext } from 'react';
import { clientCart } from './data/customer';
// Create a Context for the user state
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

const getCartById = (userId) => {
    // Find the cart by ID
    const userCart = clientCart.find((cart) => cart.id === userId);
    return userCart ? userCart : null; // Return the cart if found, or null if not found
};

// AuthProvider component that will wrap the app
export const AuthProvider = ({ children }) => {
  

  const [user, setUser] = useState({});

  const [cart,setCart] = useState([])


  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{  user, login, logout,cart,setCart,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
