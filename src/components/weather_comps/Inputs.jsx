import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import './Weather.css'; 
function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("");
  const handleSearchClick = () => {
    if (city !== '') setQuery({q: city})
  }
  const handleUnitChange = (e) => {
    const selectUnit = e.currentTarget.name;
    if (units !== selectUnit) setUnits(selectUnit);
  }
  const handleLocationClick = () => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) =>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,lon,
        });
      });
    }
  };
  return (
    <div className="flex-container-inputs">
        <input
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        type="text"
        placeholder="Search for city..."
        className="input-box"
        />
        <UilSearch size={25} className="icon" 
        onClick={handleSearchClick}/>
        <UilLocationPoint size={25} className="icon" 
        onClick={handleLocationClick}/>

        <button name="metric" className="button"
        onClick={handleUnitChange}>°C</button>
        <p className="separtor">|</p>

        <button name="imperial" className="button"
        onClick={handleUnitChange}>°F
        </button>
  </div>
);
}

export default Inputs;
