import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    if (onToggle) {
      onToggle(!collapsed);
    }
  }

  // Define sidebar menu items
  const menuItems = [
    {
      path: '/',
      icon: assets.dashboard_icon || assets.home_icon,
      label: 'Dashboard',
      description: 'Overview and statistics'
    },
    {
      path: '/add',
      icon: assets.add_icon,
      label: 'Add Items',
      description: 'Add new food items to the menu'
    },
    {
      path: '/list',
      icon: assets.list_icon || assets.bag_icon,
      label: 'List Items',
      description: 'View and manage food menu'
    },
    {
      path: '/order',
      icon: assets.order_icon,
      label: 'Orders',
      description: 'Manage customer orders'
    }
  ];

  // Define settings items
  const settingsItems = [
    {
      path: '/account',
      icon: assets.profile_icon,
      label: 'Account',
      description: 'Manage your profile'
    },
    {
      path: '/settings',
      icon: assets.settings_icon || assets.order_icon,
      label: 'Settings',
      description: 'App configuration'
    }
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        <button 
          className="collapse-btn" 
          onClick={toggleSidebar}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Menu</div>
          <div>
            {menuItems.map((item, index) => (
              <NavLink 
                key={index}
                to={item.path} 
                className={({isActive}) => 
                  isActive ? "menu-item menu-item-tooltip active" : "menu-item menu-item-tooltip"
                }
                data-tooltip={item.label}
                title={collapsed ? item.label : ''}
              >
                <div className="menu-icon">
                  <img src={item.icon} alt={item.label} />
                </div>
                <div>
                  <div className="menu-label">{item.label}</div>
                  <div className="menu-description">{item.description}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Settings</div>
          <div>
            {settingsItems.map((item, index) => (
              <NavLink 
                key={index}
                to={item.path} 
                className={({isActive}) => 
                  isActive ? "menu-item menu-item-tooltip active" : "menu-item menu-item-tooltip"
                }
                data-tooltip={item.label}
                title={collapsed ? item.label : ''}
              >
                <div className="menu-icon">
                  <img src={item.icon} alt={item.label} />
                </div>
                <div>
                  <div className="menu-label">{item.label}</div>
                  <div className="menu-description">{item.description}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        {!collapsed && <p>© 2024 Food Delivery</p>}
      </div>
    </div>
  )
}

export default Sidebar
