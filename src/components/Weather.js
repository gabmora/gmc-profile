import React from 'react';
import TopButtons from "./weather comps/TopButtons"
import Inputs from './weather comps/Inputs';
import TimeAndLocation from './weather comps/TimeAndLocation';


function Weather(){

return(
    <div>
        <TopButtons />
        <Inputs />
        <TimeAndLocation />
    </div>
    );
}

export default Weather; 