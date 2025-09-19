import React, { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const maxItems = 4; // Maximum number of products that can be compared

  // Load comparison items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('comparisonItems');
    if (saved) {
      try {
        setComparisonItems(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse comparison items from localStorage:', error);
      }
    }
  }, []);

  // Save comparison items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
  }, [comparisonItems]);

  const addToComparison = (product) => {
    // Check if product is already in comparison
    if (comparisonItems.some(item => item.id === product.id)) {
      return { success: false, message: 'Product is already in comparison' };
    }

    // Check if comparison is full
    if (comparisonItems.length >= maxItems) {
      return { success: false, message: `You can compare up to ${maxItems} products` };
    }

    setComparisonItems(prev => [...prev, product]);
    return { success: true, message: 'Product added to comparison' };
  };

  const removeFromComparison = (productId) => {
    setComparisonItems(prev => prev.filter(item => item.id !== productId));
    return { success: true, message: 'Product removed from comparison' };
  };

  const clearComparison = () => {
    setComparisonItems([]);
    return { success: true, message: 'Comparison cleared' };
  };

  const isInComparison = (productId) => {
    return comparisonItems.some(item => item.id === productId);
  };

  const getComparisonCount = () => {
    return comparisonItems.length;
  };

  const canAddMore = () => {
    return comparisonItems.length < maxItems;
  };

  const value = {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    getComparisonCount,
    canAddMore,
    maxItems
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};
