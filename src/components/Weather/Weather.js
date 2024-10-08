import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../api/weatherApi";
import { resetWeather } from "../../features/weather/weatherSlice";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import SearchHistory from "../SearchHistory/SearchHistory";
import styles from "./Weather.module.css";

const Weather = () => {
  const cityInputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { weatherData, status } = useSelector((state) => state.weather);

  const handleReset = () => {
    dispatch(resetWeather());
    cityInputRef.current.value = "";
    setError("");
    // setHistory([]);
  };

  const handleFetchWeather = () => {
    const city = cityInputRef.current.value;

    if (!city) {
      setError("City name cannot be empty");
      return;
    }

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
  };

  return (
    <div className={styles.weatherContainer}>
      <h1>Weather Forecast</h1>
      <input type="text" ref={cityInputRef} placeholder="Enter city" />
      <button onClick={handleFetchWeather}>Get Weather</button>
      <button onClick={handleReset}>Reset</button>

      {status === "loading" && <p className={styles.loading}>Loading...</p>}
      {status === "succeeded" && weatherData && (
        <WeatherInfo weatherData={weatherData} />
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {history.length > 0 && <SearchHistory history={history} />}
    </div>
  );
};

export default Weather;
