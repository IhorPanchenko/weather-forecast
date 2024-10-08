import { memo, useState } from "react";
import PropTypes from "prop-types";
import { getWeatherClass } from "../../utils/utils";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import styles from "./SearchHistory.module.css";

const SearchHistory = memo(({ history }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleDetails = (name) => {
    setOpenItem(openItem === name ? null : name);
  };

  return (
    <div className={styles.searchHistory}>
      <h3>Last 5 searches:</h3>
      <ul>
        {history
          .slice(0)
          .reverse()
          .map(
            ({
              name,
              temp,
              feelsLike,
              pressure,
              humidity,
              weather,
              icon,
              windDeg,
              windGust,
              windSpeed,
              visibility,
            }) => (
              <li
                className={styles[getWeatherClass(temp)]}
                key={`${name}-${temp}`}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${icon}.png`}
                  alt={`${weather} icon`}
                />
                <strong>{name}</strong> {temp}°C, {weather}
                {openItem === name && (
                  <WeatherDetails
                    feelsLike={feelsLike}
                    pressure={pressure}
                    humidity={humidity}
                    windDeg={windDeg}
                    windGust={windGust}
                    windSpeed={windSpeed}
                    visibility={visibility}
                  />
                )}
                <button
                  className={styles.btnDetails}
                  onClick={() => toggleDetails(name)}
                >
                  {openItem === name ? "Hide Details" : "Show Details"}
                </button>
              </li>
            )
          )}
      </ul>
    </div>
  );
});

SearchHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      weather: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      feelsLike: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      windDeg: PropTypes.number.isRequired,
      windGust: PropTypes.number.isRequired,
      windSpeed: PropTypes.number.isRequired,
      visibility: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SearchHistory;
