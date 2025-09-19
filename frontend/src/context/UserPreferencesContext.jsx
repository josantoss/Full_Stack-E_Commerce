import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserPreferencesContext = createContext();

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

export const UserPreferencesProvider = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      promotions: true,
      wishlistUpdates: true
    },
    privacy: {
      showProfile: true,
      showOrders: false,
      showWishlist: true,
      allowRecommendations: true
    },
    shopping: {
      autoAddToCart: false,
      showPriceHistory: true,
      showStockStatus: true,
      defaultSort: 'popularity'
    },
    display: {
      productsPerPage: 12,
      showProductImages: true,
      showProductRatings: true,
      showProductReviews: true
    }
  });

  useEffect(() => {
    if (user) {
      const savedPreferences = localStorage.getItem(`preferences_${user.id}`);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`preferences_${user.id}`, JSON.stringify(preferences));
    }
  }, [preferences, user]);

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  const updateNotificationSettings = (notificationType, enabled) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [notificationType]: enabled
      }
    }));
  };

  const updatePrivacySettings = (privacyType, enabled) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [privacyType]: enabled
      }
    }));
  };

  const updateShoppingSettings = (shoppingType, value) => {
    setPreferences(prev => ({
      ...prev,
      shopping: {
        ...prev.shopping,
        [shoppingType]: value
      }
    }));
  };

  const updateDisplaySettings = (displayType, value) => {
    setPreferences(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [displayType]: value
      }
    }));
  };

  const resetPreferences = () => {
    setPreferences({
      language: 'en',
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        sms: false,
        orderUpdates: true,
        promotions: true,
        wishlistUpdates: true
      },
      privacy: {
        showProfile: true,
        showOrders: false,
        showWishlist: true,
        allowRecommendations: true
      },
      shopping: {
        autoAddToCart: false,
        showPriceHistory: true,
        showStockStatus: true,
        defaultSort: 'popularity'
      },
      display: {
        productsPerPage: 12,
        showProductImages: true,
        showProductRatings: true,
        showProductReviews: true
      }
    });
  };

  const value = {
    preferences,
    updatePreferences,
    updateNotificationSettings,
    updatePrivacySettings,
    updateShoppingSettings,
    updateDisplaySettings,
    resetPreferences
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
