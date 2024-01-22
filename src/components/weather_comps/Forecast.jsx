import React from "react";
import "./Weather.css"; 

function Forecast({title}) {
    return(
        <div>
            <div className="forecast-container ">
                <p className="forecast-title"> {title}</p>
            </div>
            <hr className="forecast-divider"></hr>
            <div className="flex flex-row items-center justify-between text-white">
                <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        04:30 PM
                    </p>
                    <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    className="w-12 my-1"
                    alt=""
                    />
                    <p className="font-medium">24°</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        04:30 PM
                    </p>
                    <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    className="w-12 my-1"
                    alt=""
                    />
                    <p className="font-medium">23°</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        04:30 PM
                    </p>
                    <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    className="w-12 my-1"
                    alt=""
                    />
                    <p className="font-medium">23°</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        04:30 PM
                    </p>
                    <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    className="w-12 my-1"
                    alt=""
                    />
                    <p className="font-medium">23°</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        04:30 PM
                    </p>
                    <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    className="w-12 my-1"
                    alt=""
                    />
                    <p className="font-medium">23°</p>
                </div>
                   
            </div>

        </div>




    );
}

export default Forecast; 