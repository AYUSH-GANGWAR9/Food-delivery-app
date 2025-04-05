import React, { useState, useContext, useRef, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Profile.css';

const Profile = () => {
  const { currentUser, token } = useContext(StoreContext);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
      });
      
      if (currentUser.profileImage) {
        setImagePreview(currentUser.profileImage);
      }
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }
    
    setLoading(true);
    
    try {
      // Update profile logic would go here
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // File validation
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG)');
      return;
    }
    
    if (file.size > maxSize) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Upload to server logic would go here
    setImageLoading(true);
    
    try {
      // Image upload logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile image updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading your image');
      // Revert preview on error
      setImagePreview(null);
    } finally {
      setImageLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="profile-container">
        <div className="profile-not-logged-in">
          <img src={assets.profile_icon} alt="Profile" />
          <h2>Please Sign In</h2>
          <p>You need to be logged in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-image-container">
            <div className={`profile-image ${imageLoading ? 'loading' : ''}`}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" />
              ) : (
                <img src={assets.profile_image} alt="Profile" />
              )}
              {imageLoading && <div className="image-loading-spinner"></div>}
              <div className="profile-image-overlay" onClick={handleImageClick}>
                <span>Change Photo</span>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
          
          <div className="profile-sidebar-info">
            <h3>{formData.name || 'User'}</h3>
            <p>{formData.email || 'user@example.com'}</p>
          </div>
        </div>
        
        <div className="profile-details">
          <h2>Personal Information</h2>
          
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange}
                placeholder="Your email address"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange}
                placeholder="Your delivery address"
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="save-button" 
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 