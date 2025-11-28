
import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard";
import sampleWeather from "./weather_api_output.json";

const API_KEY = "99e4bc334ddc16e158ebcaa023d4f94a";  

function App() {
  const [query, setQuery] = useState("Toronto");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchWeather("Toronto");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(query.trim());
  };

  return (
    <div className="app">
      <h1 className="app-title">Weather Now</h1>

      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
