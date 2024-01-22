import React from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import './Weather.css'; 
function Inputs() {
  return (
    <div className="flex-container-inputs">
        <input
        type="text"
        placeholder="Search for city..."
        className="input-box"
        />
        <UilSearch size={25} className="icon" />
        <UilLocationPoint size={25} className="icon" />

        <button name="metric" className="button">°C</button>
        <p className="separtor">|</p>

        <button name="imperial" className="button">°F
        </button>
  </div>
);
}

export default Inputs;
