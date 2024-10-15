import React, { createContext, useState } from 'react';
import { loginUser, registerUser } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    setUser(response.data);
  };

  const register = async (email, password) => {
    const response = await registerUser(email, password);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
