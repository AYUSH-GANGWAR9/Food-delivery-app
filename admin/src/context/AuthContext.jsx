import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkLoggedIn = () => {
      const adminData = localStorage.getItem('adminData');
      const storedToken = localStorage.getItem('adminToken');
      
      if (adminData && storedToken) {
        const admin = JSON.parse(adminData);
        setCurrentAdmin(admin);
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = (adminData) => {
    // Store the token separately if it exists in the response
    if (adminData.token) {
      localStorage.setItem('adminToken', adminData.token);
      setToken(adminData.token);
      
      // Create a user object without the token to store in state
      const { token, ...adminWithoutToken } = adminData;
      localStorage.setItem('adminData', JSON.stringify(adminWithoutToken));
      setCurrentAdmin(adminWithoutToken);
    } else {
      // For demo mode or if no token is provided
      localStorage.setItem('adminData', JSON.stringify(adminData));
      setCurrentAdmin(adminData);
    }
    
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');
    setCurrentAdmin(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Update admin profile
  const updateProfile = async (url, data) => {
    // Update the user's profile information including name and profile image
    try {
      // In a real app, you would make an API call to update the profile
      // For example:
      // const response = await fetch(`${url}/api/admin/profile`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(data)
      // });
      
      // For demo purposes, we'll just update the local state
      const updatedAdmin = { ...currentAdmin, ...data };
      setCurrentAdmin(updatedAdmin);
      
      // Update the localStorage data too
      localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
      
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  };

  // Get auth header
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const authContextValue = {
    currentAdmin,
    isAuthenticated,
    loading,
    token,
    login,
    logout,
    updateProfile,
    getAuthHeader
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 