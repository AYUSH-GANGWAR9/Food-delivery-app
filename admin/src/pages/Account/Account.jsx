import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';
import './Account.css';
import { assets } from '../../assets/assets';

const Account = ({ url }) => {
  const { currentAdmin, updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: currentAdmin?.name || '',
    email: currentAdmin?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profileImage, setProfileImage] = useState(currentAdmin?.profileImage || assets.profile_image);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    setLoading(true);
    try {
      // Update profile data (in a production app, this would be an API call)
      await updateProfile(url, { name: formData.name });
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword) {
      toast.error('Current password is required');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      // In a production app, this would be an API call to change password
      // For this demo, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully');
      
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setPasswordMode(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    // Reset form data if exiting edit mode
    if (editMode) {
      setFormData({
        ...formData,
        name: currentAdmin?.name || '',
      });
    }
  };
  
  const togglePasswordMode = () => {
    setPasswordMode(!passwordMode);
    // Reset password fields if exiting password mode
    if (passwordMode) {
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size and type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a JPG or PNG image');
      return;
    }

    if (file.size > maxSize) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Create a local preview
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageDataUrl = event.target.result;
        setProfileImage(imageDataUrl);
        
        // In a real app, you'd upload the image to the server here
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // After successful upload, update the auth context
        await updateProfile(url, { profileImage: imageDataUrl });
        
        // Simulate a successful upload
        toast.success('Profile picture updated successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload image');
      // Revert to previous image
      setProfileImage(currentAdmin?.profileImage || assets.profile_image);
    } finally {
      setUploadingImage(false);
    }
  };
  
  return (
    <div className="account-container">
      <h1 className="page-title">Account Profile</h1>
      
      <div className="profile-wrapper">
        <div className="profile-header">
          <div className={`profile-avatar ${uploadingImage ? 'uploading' : ''}`}>
            <img src={profileImage} alt="Profile" />
            <div className="profile-avatar-overlay" onClick={handleImageClick}>
              <span>Change</span>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              disabled={uploadingImage}
            />
            {uploadingImage && <div className="avatar-loader"></div>}
          </div>
          <div className="profile-title">
            <h2>{currentAdmin?.name || 'Admin User'}</h2>
            <p>{currentAdmin?.email || 'admin@example.com'}</p>
            <span className="badge">{currentAdmin?.role || 'Administrator'}</span>
          </div>
        </div>
        
        <div className="profile-card">
          <div className="card-header">
            <h3>Profile Information</h3>
            <button 
              className="btn btn-sm btn-outline" 
              onClick={toggleEditMode}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
          
          {editMode ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  disabled={true}
                  className="disabled"
                />
                <small>Email address cannot be changed</small>
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
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{currentAdmin?.name || 'Admin User'}</p>
              </div>
              
              <div className="info-group">
                <label>Email Address</label>
                <p>{currentAdmin?.email || 'admin@example.com'}</p>
              </div>
              
              <div className="info-group">
                <label>Role</label>
                <p>{currentAdmin?.role || 'Administrator'}</p>
              </div>
              
              <div className="info-group">
                <label>Account Created</label>
                <p>{currentAdmin?.createdAt ? new Date(currentAdmin.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-card">
          <div className="card-header">
            <h3>Security</h3>
            <button 
              className="btn btn-sm btn-outline" 
              onClick={togglePasswordMode}
            >
              {passwordMode ? 'Cancel' : 'Change Password'}
            </button>
          </div>
          
          {passwordMode ? (
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
                <small>Password must be at least 6 characters</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          ) : (
            <div className="security-info">
              <p className="security-message">
                <img src={assets.add_icon} alt="Security" />
                Your password was last changed: Never
              </p>
              <p className="security-tip">
                It's a good idea to use a strong password that you don't use elsewhere
              </p>
            </div>
          )}
        </div>
        
        <div className="profile-card danger-zone">
          <div className="card-header">
            <h3>Danger Zone</h3>
          </div>
          
          <div className="danger-actions">
            <button className="btn btn-danger">
              Delete Account
            </button>
            <p className="danger-warning">
              This action is irreversible. All data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 