import React from 'react';
import './Weather.css'; 
import { formatToLocalTime } from './services_weather/weatherService';

function TimeAndLocation({weather: {dt, timezone, name, country}}) {
  console.log('dt:', dt);
  console.log('timezone:', timezone);
  return (
    <div className="bg-gray-900">
      {/* <div className="time-container">
        <p className="time-text">
          {formatToLocalTime(dt,timezone)}
        </p>
      </div> */}

      <div className="location-container">
        <p className="location-text">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
