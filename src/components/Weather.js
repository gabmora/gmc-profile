import React from 'react';
import TopButtons from "./weather_comps/TopButtons"
import Inputs from './weather_comps/Inputs';
import TimeAndLocation from './weather_comps/TimeAndLocation';
import TemperatureAndDetails from './weather_comps/TemperatureAndDetails';
import Forecast from './weather_comps/Forecast';


function Weather(){

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