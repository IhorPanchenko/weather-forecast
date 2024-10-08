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
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "City not found");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch weather error:", error.message);
      throw new Error("Could not fetch weather data. Please try again later.");
    }
  }
);
