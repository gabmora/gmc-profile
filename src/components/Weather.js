import React, { useEffect, useState } from 'react';
import TopButtons from "./weather_comps/TopButtons"
import Inputs from './weather_comps/Inputs';
import TimeAndLocation from './weather_comps/TimeAndLocation';
import TemperatureAndDetails from './weather_comps/TemperatureAndDetails';
import Forecast from './weather_comps/Forecast';
import getFormattedWeatherData from './weather_comps/services_weather/weatherService';


function Weather(){

    const [query, setQuery] = useState({q: "berlin"})
    const [units, setUnits] = useState("imperial")
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getFormattedWeatherData({...query, units});
                setWeather(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                // Handle the error as needed (e.g., show an error message)
            }
        };
    
        fetchWeather();
    }, [query, units]);
    
return(
    <div>
        <TopButtons />
        <Inputs />

        {weather && (
            <div>
            <TimeAndLocation weather={weather}/>
            <TemperatureAndDetails weather={weather}/>
            {/* <Forecast title="hourly forecast" items = {weather.hourly}/> */}
            {/* <Forecast title="daily forecast"/> */}
            </div>
        )}
    </div>
    );
}

export default Weather; 