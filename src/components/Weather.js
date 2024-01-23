import React from 'react';
import TopButtons from "./weather_comps/TopButtons"
import Inputs from './weather_comps/Inputs';
import TimeAndLocation from './weather_comps/TimeAndLocation';
import TemperatureAndDetails from './weather_comps/TemperatureAndDetails';
import Forecast from './weather_comps/Forecast';
import getFormattedWeatherData from './weather_comps/services_weather/weatherService';


function Weather(){



    const fetchWeather = async () => {
        const data = await getFormattedWeatherData( {q: "dallas" });
        console.log(data);
    };

    fetchWeather();
return(
    <div>
        <TopButtons />
        <Inputs />
        <TimeAndLocation />
        <TemperatureAndDetails />
        <Forecast title="hourly forecast"/>
        {/* <Forecast title="daily forecast"/> */}
    </div>
    );
}

export default Weather; 