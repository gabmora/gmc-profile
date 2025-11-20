import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilePdf, FaCloudSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import getFormattedWeatherData from './weather_comps/services_weather/weatherService';

function Sidebar() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('chicago');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ q: location, units: 'imperial' });
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="sidebar-container">
      {/* Minimal Contact Card */}
      <div className="sidebar-section contact-card">
        <div className="profile-avatar">
          <span className="avatar-text">GM</span>
        </div>
        <h3 className="profile-name">Gabriela Morales</h3>
        <p className="profile-title">Full-Stack Software Engineer</p>

        <div className="availability-badge">
          <div className="status-dot"></div>
          <span>Open to Work</span>
        </div>

        <div className="contact-list">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Hoboken, NJ</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:gabrielamoralescg@gmail.com">gabrielamoralescg@gmail.com</a>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <a href="tel:201-844-3508">201-844-3508</a>
          </div>
        </div>

        <div className="social-links-compact">
          <a href="https://github.com/diniwigs" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/gabriela-morales" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
            <FaLinkedin />
          </a>
        </div>

        <Link to="/pdf-viewer" className="download-resume-btn">
          <FaFilePdf /> Download Resume
        </Link>
      </div>

      {/* Weather Widget */}
      <div className="sidebar-section weather-widget">
        <h4 className="section-title">
          <FaCloudSun className="title-icon" /> Local Weather
        </h4>

        {weather ? (
          <div className="weather-content">
            <div className="weather-header">
              <div className="weather-location">{weather.name}</div>
              <div className="weather-date">{weather.formattedLocalTime}</div>
            </div>

            <div className="weather-main">
              <img
                src={weather.icon}
                alt={weather.details}
                className="weather-icon"
              />
              <div className="weather-temp">{weather.temp.toFixed()}°F</div>
            </div>

            <div className="weather-description">{weather.details}</div>

            <div className="weather-details">
              <div className="weather-detail-item">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">{weather.feels_like.toFixed()}°</span>
              </div>
              <div className="weather-detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              <div className="weather-detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weather.speed.toFixed()} mph</span>
              </div>
            </div>

            <div className="weather-minmax">
              <div className="minmax-item">
                <span>High: {weather.temp_max.toFixed()}°</span>
              </div>
              <div className="minmax-item">
                <span>Low: {weather.temp_min.toFixed()}°</span>
              </div>
            </div>

            <input
              type="text"
              placeholder="Search location..."
              className="weather-search"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setLocation(e.target.value);
                }
              }}
            />
          </div>
        ) : (
          <div className="weather-loading">Loading weather...</div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
