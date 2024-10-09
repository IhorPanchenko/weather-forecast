import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../api/weatherApi";
import { resetWeather } from "../../features/weather/weatherSlice";
import WeatherSummary from "../WeatherSummary/WeatherSummary ";
import SearchHistory from "../SearchHistory/SearchHistory";
import styles from "./WeatherDisplay.module.css";

const Weather = () => {
  const cityInputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { weatherData, status } = useSelector((state) => state.weather);

  useEffect(() => {
    const saveMode = localStorage.getItem("darkMode");

    if (saveMode) {
      setIsDarkMode(JSON.parse(saveMode));
      if (JSON.parse(saveMode)) {
        document.body.classList.add("darkMode");
      }
    }
  }, []);

  const handleReset = () => {
    dispatch(resetWeather());
    cityInputRef.current.value = "";
    setError("");
    setHistory([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFetchWeather();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      document.body.classList.toggle("darkMode", newMode);
      return newMode;
    });
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
          const cityExists = prevHistory.some(
            (item) =>
              item.name.toLowerCase() === response.payload.name.toLowerCase()
          );

          if (cityExists) {
            return prevHistory;
          }

          const newHistory = [response.payload, ...prevHistory];

          if (newHistory.length > 5) {
            newHistory.pop();
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
      <input
        type="text"
        ref={cityInputRef}
        name="city"
        placeholder="Enter city"
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleFetchWeather}>Get Weather</button>
      <button onClick={handleReset}>Reset Search</button>
      <button onClick={toggleDarkMode} className={styles.modeBtn}>
        {isDarkMode ? (
          <i className="fas fa-sun"></i>
        ) : (
          <i className="fas fa-moon"></i>
        )}
      </button>

      {status === "loading" && <p className={styles.loading}>Loading...</p>}
      {status === "succeeded" && weatherData && (
        <WeatherSummary weatherData={weatherData} />
      )}
      {error ? <p className={styles.errorMessage}>{error}</p> : null}

      {history.length > 0 && <SearchHistory history={history} />}
    </div>
  );
};

export default Weather;
