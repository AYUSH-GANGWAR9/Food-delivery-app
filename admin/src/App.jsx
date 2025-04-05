import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Dashboard from './pages/Dashboard/Dashboard'
import Account from './pages/Account/Account'
import Settings from './pages/Settings/Settings'
import Search from './pages/Search/Search'

// Content component that uses theme context for toast theme
const AppContent = () => {
  // API URL
  const url = "http://localhost:4000";
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login url={url} />} />
        <Route path="/signup" element={<Signup url={url} />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Orders url={url} />} />
          <Route path="/account" element={<Account url={url} />} />
          <Route path="/settings" element={<Settings url={url} />} />
          <Route path="/search" element={<Search url={url} />} />
        </Route>
        
        {/* Redirect to dashboard if no matching route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
