import React from 'react';
import TopButtons from "./weather comps/TopButtons"
import Inputs from './weather comps/Inputs';
import TimeAndLocation from './weather comps/TimeAndLocation';
import TemperatureAndDetails from './weather comps/TemperatureAndDetails';


function Weather(){

return(
    <div>
        <TopButtons />
        <Inputs />
        <TimeAndLocation />
        <TemperatureAndDetails />
    </div>
    );
}

export default Weather; 