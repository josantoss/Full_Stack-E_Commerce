import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    const savedColor = localStorage.getItem('primaryColor');
    return savedColor || '#3B82F6';
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize || 'medium';
  });

  const [layoutDensity, setLayoutDensity] = useState(() => {
    const savedDensity = localStorage.getItem('layoutDensity');
    return savedDensity || 'comfortable';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('layoutDensity', layoutDensity);
    document.documentElement.setAttribute('data-layout-density', layoutDensity);
  }, [layoutDensity]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  const updateFontSize = (size) => {
    setFontSize(size);
  };

  const updateLayoutDensity = (density) => {
    setLayoutDensity(density);
  };

  const resetToDefaults = () => {
    setTheme('light');
    setPrimaryColor('#3B82F6');
    setFontSize('medium');
    setLayoutDensity('comfortable');
  };

  const value = {
    theme,
    primaryColor,
    fontSize,
    layoutDensity,
    toggleTheme,
    updatePrimaryColor,
    updateFontSize,
    updateLayoutDensity,
    resetToDefaults,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
