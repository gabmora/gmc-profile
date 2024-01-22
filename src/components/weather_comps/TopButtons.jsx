import React from 'react';
import './Weather.css';


function TopButtons(){
    const cities = [
    {
        id: 1,
        title: "NYC"
    },
    {
        id: 2,
        title: "Rio"
    },
    {
        id: 3,
        title: "Paris"
    },

]
return(
    <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
            <button className="button" key= {city.id}> {city.title}</button>
        ))}
        
    </div>
    );
}

export default TopButtons; 