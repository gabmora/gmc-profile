import React from 'react';
import './Weather.css';


function TopButtons({setQuery}){
    const cities = [
    {
        id: 1,
        title: "NYC",
        fullName: "New York City"
    },
    {
        id: 2,
        title: "Rio",
        fullName: "Rio de Janeiro"
    },
    {
        id: 3,
        title: "Paris",
        fullName: "Paris"
    },

]
return(
    <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
            <button className="button" key= {city.id} 
            onClick={() => setQuery({ q: city.fullName})}>
                 {city.title}</button>
        ))}
        
    </div>
    );
}

export default TopButtons; 