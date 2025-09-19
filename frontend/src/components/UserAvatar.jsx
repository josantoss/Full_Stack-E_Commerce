import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaCamera, FaCheck, FaTimes } from 'react-icons/fa';

const UserAvatar = ({ size = 'md', showUpload = false, className = '' }) => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl'
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setShowUploadModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!preview) return;
    
    setIsUploading(true);
    try {
      // In a real app, you would upload to your server
      // For now, we'll just store it locally
      setAvatar(preview);
      localStorage.setItem(`avatar_${user.id}`, preview);
      setShowUploadModal(false);
      setPreview(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setShowUploadModal(false);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    localStorage.removeItem(`avatar_${user.id}`);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
          {avatar ? (
            <img
              src={avatar}
              alt={user?.name || 'User'}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser className="text-gray-500 dark:text-gray-400" />
          )}
        </div>
        
        {showUpload && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
            title="Change avatar"
          >
            <FaCamera className="w-3 h-3" />
          </button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upload Avatar
            </h3>
            
            <div className="mb-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-500 dark:text-gray-400 text-4xl" />
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-4 h-4" />
                    <span>Upload</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 flex items-center justify-center space-x-2"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
            
            {avatar && (
              <button
                onClick={handleRemoveAvatar}
                className="w-full mt-3 text-red-500 hover:text-red-600 text-sm"
              >
                Remove current avatar
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
