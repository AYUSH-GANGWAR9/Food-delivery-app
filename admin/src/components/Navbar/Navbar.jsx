import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { currentAdmin, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/login');
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    } else {
      toast.info("Please enter a search term");
    }
  }

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  }

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img className='logo' src={assets.logo} alt="Food Delivery Admin" />
        <h1 className="navbar-title">Admin Dashboard</h1>
      </div>
      
      <div className="navbar-right">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        
        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
          />
          <img 
            src={assets.search_icon} 
            alt="Search" 
            className="search-icon" 
            onClick={handleSearch}
          />
        </div>
        
        {currentAdmin && (
          <div className="admin-profile">
            <div className="admin-info">
              <span className="admin-name">{currentAdmin.name || 'Admin'}</span>
              <span className="admin-role">Administrator</span>
            </div>
            
            <div className="profile-dropdown">
              <div className="profile-image-container" onClick={toggleDropdown}>
                <img className='profile-image' src={currentAdmin.profileImage || assets.profile_image} alt="Profile" />
                <span className="dropdown-indicator">▼</span>
              </div>
              
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span>Signed in as</span>
                    <span className="dropdown-email">{currentAdmin.email}</span>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item" onClick={() => navigate('/account')}>
                    <img src={assets.profile_icon} alt="Profile" />
                    <span>Your Profile</span>
                  </button>
                  
                  <button className="dropdown-item" onClick={() => navigate('/settings')}>
                    <img src={assets.order_icon} alt="Settings" />
                    <span>Settings</span>
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button onClick={handleLogout} className="dropdown-item">
                    <img src={assets.logout_icon} alt="Logout" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
