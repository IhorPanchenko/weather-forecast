import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/weather/weatherSlice";

const Weather = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { weatherData, status, error } = useSelector((state) => state.weather);

  const handleFetchWeather = () => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>

      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && weatherData && (
        <div className="weather-info">
          {/* <h2>{weatherData.name}</h2> */}
          <p>Temperature: </p>
          <p>Weather: </p>
        </div>
      )}
      {status === "failed" && <p>Error: {error}</p>}
    </div>
  );
};

export default Weather;
