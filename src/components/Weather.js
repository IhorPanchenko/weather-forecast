import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/weather/weatherSlice";

const Weather = () => {
  const [city, setCity] = useState("");
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const { weatherData, status, error } = useSelector((state) => state.weather);

  const handleFetchWeather = () => {
    if (city) {
      dispatch(fetchWeather(city)).then((response) => {
        if (response.payload) {
          setHistory((prevHistory) => {
            const newHistory = [
              ...prevHistory,
              {
                name: response.payload.name,
                temp: response.payload.main.temp,
                weather: response.payload.weather[0].description,
              },
            ];
            console.log("11111" + newHistory.name);
            if (newHistory.length > 5) {
              newHistory.shift();
            }
            return newHistory;
          });
        }
      });
    }
  };
  console.log(weatherData);

  const getWeatherClass = (temp) => {
    if (temp > 15) return "warm-weather";
    if (temp > 5 && temp < 15) return "fall-weather";
    return "cold-weather";
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

      {status === "loading" && <p className="loading">Loading...</p>}
      {status === "succeeded" && weatherData && (
        <div
          className={`weather-info ${getWeatherClass(weatherData.main.temp)}`}
        >
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
      {status === "failed" && <p className="error-message">Error: {error}</p>}

      {history.length > 0 && (
        <div className="search-history">
          <h3>Last 5 searches:</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <strong>{item.name}:</strong> {item.temp}°C, {item.weather}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
