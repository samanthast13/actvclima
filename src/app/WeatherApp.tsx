"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const API_KEY = "aefbe7260c8b49de962132425250303";
const API_URL = "http://api.weatherapi.com/v1/current.json";

const WeatherApp: React.FC = () => {
  console.log("El componente WeatherApp está renderizando.");

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any[]>([]);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
      const data = await response.json();
      console.log("Datos recibidos de la API:", data);
      if (data.error) {
        alert("Ciudad no encontrada");
        return;
      }
      setWeatherData([...weatherData, data]);
      setCity("");
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  const removeCard = (index: number) => {
    setWeatherData(weatherData.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Weather App</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
          placeholder="Ingresa una ciudad"
          style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button onClick={fetchWeather} style={{ padding: "8px 12px", cursor: "pointer" }}>Buscar</button>
      </div>
      <div>
        {weatherData.map((weather, index) => (
          <div key={index} style={{ position: "relative", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "10px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
            <button
              onClick={() => removeCard(index)}
              style={{ position: "absolute", top: "5px", right: "5px", border: "none", background: "transparent", cursor: "pointer" }}
            >
              ❌
            </button>
            <h2 style={{ fontSize: "18px", margin: "0 0 10px" }}>{weather.location.name}</h2>
            <p style={{ fontSize: "16px", margin: "5px 0" }}>{weather.current.temp_c}°C</p>
            <p style={{ margin: "5px 0" }}>Humedad: {weather.current.humidity}%</p>
            <p style={{ margin: "5px 0" }}>Viento: {weather.current.wind_kph} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;