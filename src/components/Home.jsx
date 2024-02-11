import React from "react";
import {
  clear,
  cloud,
  drizzle,
  humidity,
  rain,
  search,
  snow,
  wind,
} from "../Assets/images";
import "../styles/Home.css";

function Home() {


  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <img src={search} alt="search" className="search" />
      </div>

      <dic className="weather-image">
        <img src={cloud} alt="" srcset="" />
      </dic>
      <div className="weather-temp">24c</div>
      <div className="weather-location"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-percentage">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="humidity-percentage">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
