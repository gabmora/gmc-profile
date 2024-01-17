import React from 'react';
import './Weather.css'; 

function TimeAndLocation() {
  return (
    <div className="bg-gray-900">
      <div className="time-container">
        <p className="time-text">
          Wednesday, 17 January 2024 | Local Time: 4:05
        </p>
      </div>

      <div className="location-container">
        <p className="location-text">Berlin, DE</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
