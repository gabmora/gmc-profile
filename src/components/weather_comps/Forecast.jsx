import React from "react";
import "./Weather.css"; 
import { iconUrlFromCode } from "./services_weather/weatherService";

function Forecast({title, items}) {
    console.log(items);
    return(
        <div>
            <div className="forecast-container ">
                <p className="forecast-title"> {title}</p>
            </div>
            <hr className="forecast-divider"></hr>
            <div className="flex flex-row items-center justify-between text-white">
                {items.map(item =>(
                    <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        {item.title}
                    </p>
                    <img
                    src={iconUrlFromCode(item.icon)}
                    className="w-12 my-1"
                    alt=""
                    />
                    <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
                </div>                   
                ))}
            </div>

        </div>

    );
}

export default Forecast; 