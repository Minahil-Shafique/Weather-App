import React, { useState, useEffect } from "react";
import {
  clear,
  cloud,
  drizzle,
  humidity,
  rain,
  searchIcon,
  snow,
  wind,
} from "../Assets/images";
import "../styles/Home.css";

function Home() {
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "a3f838656b3d1f1e7e80bb470fd62bcb";

  const iconMapping = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  

  const fetchWeatherData = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      // Set the weather icon based on the fetched data
      const iconCode = data.weather[0].icon;
      setIcon(iconMapping[iconCode]);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };


  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]); // Trigger the effect whenever 'city' changes

  return (
    <div className="container ">
      <div className="top-bar">
        <div className="input-container">
          <input
            type="text"
            className="cityInput input-field"
            placeholder=" "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="cityInput" className="input-label">
            Search
          </label>
        </div>
        
      </div>

      <div className="weather-image">
        <img src={icon} alt="" />
      </div>
      <div className="weather-temp">{weatherData?.main?.temp}°C</div>
      <div className="weather-location">{weatherData?.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-percentage">
              {weatherData?.main?.humidity}%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="wind-speed">{weatherData?.wind?.speed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <div className="element">
        <div className="data">
          <div className="description">
            {weatherData?.weather?.[0]?.description}
          </div>
          <div className="text">Weather Description</div>
        </div>
      </div>
    </div>
  );
}

export default Home;

