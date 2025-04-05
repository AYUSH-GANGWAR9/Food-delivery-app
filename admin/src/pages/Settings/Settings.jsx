import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import './Settings.css';

const Settings = ({ url }) => {
  const { theme, toggleTheme } = useTheme();
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: 'Food Delivery Admin',
    restaurantEmail: 'contact@example.com',
    restaurantPhone: '+1 (123) 456-7890',
    restaurantAddress: '123 Main Street, City, Country',
    currency: 'USD',
    timeZone: 'GMT+0',
    deliveryRadius: '10',
    orderPrefix: 'ORD-'
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    marketingEmails: false,
    desktopNotifications: true,
    soundAlerts: true
  });
  
  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme,
    primaryColor: '#008080',
    sidebarCollapsed: false,
    compactMode: false
  });
  
  // Update appearanceSettings when theme context changes
  useEffect(() => {
    setAppearanceSettings(prev => ({ ...prev, theme }));
  }, [theme]);
  
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  const handleGeneralChange = (e) => {
    const { id, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [id]: value
    });
  };
  
  const handleNotificationChange = (e) => {
    const { id, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [id]: checked
    });
  };
  
  const handleAppearanceChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    // If changing theme, use the Theme Context to change it globally
    if (id === 'theme' && value !== theme) {
      toggleTheme();
    }
    
    setAppearanceSettings({
      ...appearanceSettings,
      [id]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleColorChange = (e) => {
    setAppearanceSettings({
      ...appearanceSettings,
      primaryColor: e.target.value
    });
    
    // Set primary color CSS variable
    document.documentElement.style.setProperty('--primary', e.target.value);
    
    // Calculate lighter and darker versions of the color
    const hex = e.target.value.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Set lighter version (mix with white)
    const lightR = Math.round(r * 0.8 + 255 * 0.2);
    const lightG = Math.round(g * 0.8 + 255 * 0.2);
    const lightB = Math.round(b * 0.8 + 255 * 0.2);
    document.documentElement.style.setProperty(
      '--primary-light', 
      `rgba(${lightR}, ${lightG}, ${lightB}, 0.2)`
    );
    
    // Set darker version
    const darkR = Math.round(r * 0.7);
    const darkG = Math.round(g * 0.7);
    const darkB = Math.round(b * 0.7);
    document.documentElement.style.setProperty(
      '--primary-dark', 
      `rgb(${darkR}, ${darkG}, ${darkB})`
    );
  };
  
  const saveSettings = async (settingType) => {
    setLoading(true);
    
    try {
      // In a real app, send a request to save settings to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update UI with success message
      toast.success(`${settingType} settings saved successfully`);
    } catch (error) {
      toast.error(`Failed to save ${settingType} settings`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e, settingType) => {
    e.preventDefault();
    saveSettings(settingType);
  };
  
  return (
    <div className="settings-container">
      <h1 className="page-title">Settings</h1>
      
      <div className="settings-wrapper">
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
        </div>
        
        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <form onSubmit={(e) => handleSubmit(e, 'general')}>
              <h2>General Settings</h2>
              <p className="settings-description">
                Configure the basic information about your restaurant
              </p>
              
              <div className="form-group">
                <label htmlFor="restaurantName">Restaurant Name</label>
                <input 
                  type="text" 
                  id="restaurantName"
                  value={generalSettings.restaurantName}
                  onChange={handleGeneralChange}
                  disabled={loading}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="restaurantEmail">Email Address</label>
                  <input 
                    type="email" 
                    id="restaurantEmail"
                    value={generalSettings.restaurantEmail}
                    onChange={handleGeneralChange}
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="restaurantPhone">Phone Number</label>
                  <input 
                    type="text" 
                    id="restaurantPhone"
                    value={generalSettings.restaurantPhone}
                    onChange={handleGeneralChange}
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="restaurantAddress">Address</label>
                <textarea 
                  id="restaurantAddress"
                  value={generalSettings.restaurantAddress}
                  onChange={handleGeneralChange}
                  disabled={loading}
                  rows="2"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select 
                    id="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                    disabled={loading}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="timeZone">Time Zone</label>
                  <select 
                    id="timeZone"
                    value={generalSettings.timeZone}
                    onChange={handleGeneralChange}
                    disabled={loading}
                  >
                    <option value="GMT+0">GMT+0 (London)</option>
                    <option value="GMT-5">GMT-5 (New York)</option>
                    <option value="GMT-8">GMT-8 (Los Angeles)</option>
                    <option value="GMT+1">GMT+1 (Paris)</option>
                    <option value="GMT+5.5">GMT+5.5 (New Delhi)</option>
                    <option value="GMT+8">GMT+8 (Singapore)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deliveryRadius">Delivery Radius (km)</label>
                  <input 
                    type="number" 
                    id="deliveryRadius"
                    value={generalSettings.deliveryRadius}
                    onChange={handleGeneralChange}
                    disabled={loading}
                    min="1"
                    max="50"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="orderPrefix">Order ID Prefix</label>
                  <input 
                    type="text" 
                    id="orderPrefix"
                    value={generalSettings.orderPrefix}
                    onChange={handleGeneralChange}
                    disabled={loading}
                    maxLength="5"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <form onSubmit={(e) => handleSubmit(e, 'notification')}>
              <h2>Notification Settings</h2>
              <p className="settings-description">
                Configure how you want to receive alerts and notifications
              </p>
              
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="emailNotifications">Email Notifications</label>
                    <span className="toggle-description">Receive notifications via email</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="orderNotifications">Order Updates</label>
                    <span className="toggle-description">Get notified on new orders and status changes</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="orderNotifications"
                      checked={notificationSettings.orderNotifications}
                      onChange={handleNotificationChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="marketingEmails">Marketing Emails</label>
                    <span className="toggle-description">Receive promotional emails and newsletters</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="desktopNotifications">Desktop Notifications</label>
                    <span className="toggle-description">Show browser notifications on your desktop</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="desktopNotifications"
                      checked={notificationSettings.desktopNotifications}
                      onChange={handleNotificationChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="soundAlerts">Sound Alerts</label>
                    <span className="toggle-description">Play sound when new orders arrive</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="soundAlerts"
                      checked={notificationSettings.soundAlerts}
                      onChange={handleNotificationChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <form onSubmit={(e) => handleSubmit(e, 'appearance')}>
              <h2>Appearance Settings</h2>
              <p className="settings-description">
                Customize the look and feel of your admin dashboard
              </p>
              
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <div className="theme-options">
                  <label className={`theme-option ${appearanceSettings.theme === 'light' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      id="theme"
                      name="theme"
                      value="light"
                      checked={appearanceSettings.theme === 'light'}
                      onChange={handleAppearanceChange}
                      disabled={loading}
                    />
                    <div className="theme-preview light-theme">
                      <div className="theme-header"></div>
                      <div className="theme-sidebar"></div>
                      <div className="theme-content"></div>
                    </div>
                    <span>Light</span>
                  </label>
                  
                  <label className={`theme-option ${appearanceSettings.theme === 'dark' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      id="theme"
                      name="theme"
                      value="dark"
                      checked={appearanceSettings.theme === 'dark'}
                      onChange={handleAppearanceChange}
                      disabled={loading}
                    />
                    <div className="theme-preview dark-theme">
                      <div className="theme-header"></div>
                      <div className="theme-sidebar"></div>
                      <div className="theme-content"></div>
                    </div>
                    <span>Dark</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="primaryColor">Accent Color</label>
                <div className="color-picker">
                  <input 
                    type="color" 
                    id="primaryColor"
                    value={appearanceSettings.primaryColor}
                    onChange={handleColorChange}
                    disabled={loading}
                  />
                  <span className="color-value">{appearanceSettings.primaryColor}</span>
                </div>
              </div>
              
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="sidebarCollapsed">Default Collapsed Sidebar</label>
                    <span className="toggle-description">Start with the sidebar collapsed by default</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="sidebarCollapsed"
                      checked={appearanceSettings.sidebarCollapsed}
                      onChange={handleAppearanceChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <label htmlFor="compactMode">Compact Mode</label>
                    <span className="toggle-description">Use smaller spacing and font sizes</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      id="compactMode"
                      checked={appearanceSettings.compactMode}
                      onChange={handleAppearanceChange}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    // Reset theme to light if it's currently dark
                    if (theme === 'dark') {
                      toggleTheme();
                    }
                    
                    // Reset to default CSS variables
                    document.documentElement.style.removeProperty('--primary');
                    document.documentElement.style.removeProperty('--primary-light');
                    document.documentElement.style.removeProperty('--primary-dark');
                    
                    setAppearanceSettings({
                      theme: 'light',
                      primaryColor: '#008080',
                      sidebarCollapsed: false,
                      compactMode: false
                    });
                    
                    toast.info('Settings reset to defaults');
                  }}
                  disabled={loading}
                >
                  Reset to Default
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 