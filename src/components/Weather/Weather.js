import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../api/weatherApi";
import { resetWeather } from "../../features/weather/weatherSlice";
import SearchHistory from "../SearchHistory/SearchHistory";
import { getWeatherClass } from "../../utils/utils";
import styles from "./Weather.module.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { weatherData, status } = useSelector((state) => state.weather);

  const handleReset = () => {
    dispatch(resetWeather());
    setCity("");
    setError("");
    // setHistory([]);
  };

  const handleFetchWeather = () => {
    if (city) {
      setError("");

      dispatch(fetchWeather(city)).then((response) => {
        if (response.payload) {
          setHistory((prevHistory) => {
            const newHistory = [...prevHistory, response.payload];

            if (newHistory.length > 5) {
              newHistory.shift();
            }
            return newHistory;
          });
        } else {
          setError("Please enter a valid city name");
        }
      });
    } else {
      setError("City name cannot be empty");
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>
      <button onClick={handleReset}>Reset</button>

      {status === "loading" && <p className={styles.loading}>Loading...</p>}
      {status === "succeeded" && weatherData && (
        <div
          className={`${styles.weatherInfo} ${
            styles[getWeatherClass(weatherData.temp)]
          }`}
        >
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Weather: {weatherData.weather}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {history.length > 0 && <SearchHistory history={history} />}
    </div>
  );
};

export default Weather;
