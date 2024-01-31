// SidebarWithWeather.jsx

import React, { useState } from 'react';
import Weather from './Weather';
import './SidebarWithWeather.css';

const SidebarWithWeather = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const maximizeSidebar = () => {
    setIsMinimized(false);
  };

  return (
    <div className={`sidebar-container ${isMinimized ? 'minimized' : ''}`}>
      <button onClick={toggleMinimize} className="toggle-button">
        {isMinimized ? 'Maximize' : 'Minimize'}
      </button>

      {!isMinimized && (
        <div className="sidebar-content">
          <Weather />
          {/* Add other sidebar content as needed */}
        </div>
      )}

      {isMinimized && (
        <div className="maximize-button-container">
          <button onClick={maximizeSidebar} className="maximize-button">
            Maximize
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarWithWeather;
