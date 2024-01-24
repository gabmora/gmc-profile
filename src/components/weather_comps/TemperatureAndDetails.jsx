import React from 'react';
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset
} from '@iconscout/react-unicons';
import './Weather.css'; // Import the CSS file
import { formatToLocalTime, iconUrlFromCode } from './services_weather/weatherService';

function TemperatureAndDetails({weather:{details, icon, temp, temp_min, temp_max,sunrise,
  sunset,speed, humidity, feels_like, timezone}}) {
  return (
    <div className="weather-container">
      <div className="weather-condition">
        <p>{details}</p>
      </div>

      <div className="weather-details">
        <img
          src={iconUrlFromCode(icon)}
          alt=""
          className="weather-icon"
        />
        <p className="temperature">{`${temp.toFixed()}°`}</p>

        <div className="weather-detail-item">
          <UilTemperature className="weather-detail-icon" size={18} />
          Real fell:
          <span className="font-medium ml-1">{`${feels_like.toFixed()}°`} </span>
        </div>
        <div className="weather-detail-item">
          <UilTear className="weather-detail-icon" size={18} />
          Humidity:
          <span className="font-medium ml-1"> {`${humidity.toFixed()}%`}</span>
        </div>
        <div className="weather-detail-item">
          <UilWind className="weather-detail-icon" size={18} />
          Wind: 
          <span className="font-medium ml-1"> {`${speed.toFixed()}km/h`}  </span>
        </div>
      </div>

      <div className="sunrise-sunset">
        <UilSun />
        <p className="font-light">
          Rise: <span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>
        <p className="sunrise-sunset-separator">|</p>

        <UilSunset />
        <p className="font-light">
          Set: <span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
        </p>
      </div>
      <div className="high-low-temperature">
        <UilSun />
        <p className="font-light">
          High: <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="sunrise-sunset-separator">|</p>
        <UilSun />
        <p className="font-light">
          Low: <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
