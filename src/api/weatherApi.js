import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Fetches the weather data for a given city from the OpenWeather API.
 *
 * @param {string} city The name of the city for which to fetch weather data.
 * @returns {Promise<Object>} The weather data object containing the city name,
 *                            temperature, weather description, and icon.
 * @throws {Error} Throws an error if the city name is invalid or if the fetch
 *                 request fails.*
 */

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    // Constructs the API URL
    const buildUrl = (city) =>
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const url = buildUrl(city);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "City not found");
      }

      return {
        name: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        weather: data.weather[0].description,
        icon: data.weather[0].icon,
        windDeg: data.wind.deg,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
      };
    } catch (error) {
      console.error("Fetch weather error:", error.message);
      throw new Error("Could not fetch weather data. Please try again later.");
    }
  }
);
