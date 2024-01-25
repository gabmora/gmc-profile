import { DateTime } from "luxon";

const API_KEY = 'd2888d37664143799cccb1ffd7200076'
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

// https://api.openweathermap.org/data/2.5/weather?q=Dallas,usa&APPID=d2888d37664143799cccb1ffd7200076


const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  
    const res = await fetch(url);
  return await res.json();
  };
  
  const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
  
    const { main: details, icon } = weather[0];
  
    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunrise,
      sunset,
      details,
      icon,
      speed,
    };
  };
  
  
  const formatForecastWeather = (data) => {
    let { timezone, hourly } = data;

    // Check if 'hourly' is undefined or not an array
    if (!hourly || !Array.isArray(hourly)) {
        console.error("Hourly data is undefined or not an array in formatForecastWeather function.");
        return { timezone, hourly: [] };
    }

    // Check if the array has at least 6 elements before slicing
    if (hourly.length >= 6) {
        hourly = hourly.slice(1, 6).map((d) => {
            return {
                title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
                temp: d.temp,
                icon: d.weather && d.weather[0] ? d.weather[0].icon : null,
            };
        });
    } else {
        console.warn("Hourly data does not have enough elements in formatForecastWeather function.");
    }

    return { timezone, hourly };
};


  
  const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);
  
    const { lat, lon } = formattedCurrentWeather;
  
    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);
  
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  };
  
  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  
  const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;
  
  export default getFormattedWeatherData;
  
  export { formatToLocalTime, iconUrlFromCode };