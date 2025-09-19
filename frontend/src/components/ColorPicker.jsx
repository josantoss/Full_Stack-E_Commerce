import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ColorPicker = () => {
  const { primaryColor, updatePrimaryColor } = useTheme();

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Green', value: '#10B981' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Gray', value: '#6B7280' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Primary Color
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            onClick={() => updatePrimaryColor(color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              primaryColor === color.value
                ? 'border-gray-900 dark:border-white scale-110'
                : 'border-gray-300 dark:border-gray-600 hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
