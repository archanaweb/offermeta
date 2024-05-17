import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//   const loggedIn = JSON.parse(localStorage.getItem('userData'))

  const login = (userData) => {
    // Logic for logging in user
    setUser(userData);
  };

  const logout = () => {
    // Logic for logging out user
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);