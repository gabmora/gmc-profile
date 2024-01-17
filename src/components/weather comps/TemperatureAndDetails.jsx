import React from 'react';
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset
} from '@iconscout/react-unicons';
import './Weather.css'; // Import the CSS file

function TemperatureAndDetails() {
  return (
    <div className="weather-container">
      <div className="weather-condition">
        <p>Cloudy</p>
      </div>

      <div className="weather-details">
        <img
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt=""
          className="weather-icon"
        />
        <p className="temperature">34°</p>

        <div className="weather-detail-item">
          <UilTemperature className="weather-detail-icon" size={18} />
          Real fell:
          <span className="font-medium ml-1"> </span>
        </div>
        <div className="weather-detail-item">
          <UilTear className="weather-detail-icon" size={18} />
          Humidity:
          <span className="font-medium ml-1"> </span>
        </div>
        <div className="weather-detail-item">
          <UilWind className="weather-detail-icon" size={18} />
          Wind: 
          <span className="font-medium ml-1"> 11 km/h </span>
        </div>
      </div>

      <div className="sunrise-sunset">
        <UilSun />
        <p className="font-light">
          Rise: <span className="font-medium ml-1">06:45AM</span>
        </p>
        <p className="sunrise-sunset-separator">|</p>

        <UilSunset />
        <p className="font-light">
          Set: <span className="font-medium ml-1">07:35 PM</span>
        </p>
        {/* <p className="sunrise-sunset-separator">|</p> */}
      </div>
      <div className="high-low-temperature">
        <UilSun />
        <p className="font-light">
          High: <span className="font-medium ml-1">60°</span>
        </p>
        <p className="sunrise-sunset-separator">|</p>
        <UilSun />
        <p className="font-light">
          Low: <span className="font-medium ml-1">40°</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
