
import React from "react";

function WeatherCard({ weather }) {
  if (!weather) return null;

  const { name, sys, main, weather: w, wind } = weather;
  const description = w[0].description;
  const iconCode = w[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  
  const toCelsius = (value) => {
    const celsius = value > 200 ? value - 273.15 : value;
    return Math.round(celsius);
  };

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div>
          <h2>
            {name}, {sys.country}
          </h2>
          <p className="weather-desc">{description}</p>
        </div>
        <div className="weather-temp">
          <span className="temp">{toCelsius(main.temp)}°C</span>
          <img src={iconUrl} alt={description} />
        </div>
      </div>

      <div className="weather-extra">
        <div>
          <span className="label">Feels like</span>
          <span>{toCelsius(main.feels_like)}°C</span>
        </div>
        <div>
          <span className="label">Min</span>
          <span>{toCelsius(main.temp_min)}°C</span>
        </div>
        <div>
          <span className="label">Max</span>
          <span>{toCelsius(main.temp_max)}°C</span>
        </div>
        <div>
          <span className="label">Humidity</span>
          <span>{main.humidity}%</span>
        </div>
        <div>
          <span className="label">Wind</span>
          <span>{wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
