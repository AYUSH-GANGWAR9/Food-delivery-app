import React, { useContext, useState, useEffect, useRef } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({setShowLogin, onSearch}) {
  const [menu, setMenu] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  
  const {getTotalCartAmount, token, setToken, food_list, currentUser} = useContext(StoreContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Debug log
  useEffect(() => {
    console.log("onSearch prop:", typeof onSearch);
  }, [onSearch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
    
    if (typeof onSearch === 'function') {
      onSearch(query); // Pass the search query up to parent component
      console.log("onSearch function called with:", query);
    } else {
      console.error("onSearch is not a function:", onSearch);
    }
    
    if (query.trim() !== "") {
      setMenu("menu");
      // Navigate to home if not already there
      if (window.location.pathname !== '/') {
        navigate('/');
      }
      
      // Scroll to menu section
      setTimeout(() => {
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className='logo' alt=""/></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
        
        <div className="search-container" ref={searchRef}>
          <div className="search-input-container">
            <img 
              src={assets.search_icon} 
              alt="Search" 
              className="search-icon"
              onClick={() => setShowSearch(!showSearch)}
            />
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="search-input-wrapper"
                >
                  <input
                    type="text"
                    placeholder="Search foods..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img 
              src={currentUser?.profileImage || assets.profile_icon} 
              alt="" 
              style={{ 
                objectFit: 'cover',
                width: '30px',
                height: '30px',
                borderRadius: '50%'
              }}
            />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/profile')}>
                <img src={assets.profile_icon} alt="" /><p>Profile</p>
              </li>
              <li>
                <img src={assets.bag_icon} alt="" /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /><p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;




