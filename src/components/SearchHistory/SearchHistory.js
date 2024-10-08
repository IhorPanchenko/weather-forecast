import { memo } from "react";
import PropTypes from "prop-types";
import { getWeatherClass } from "../../utils/utils";
import styles from "./SearchHistory.module.css";

const SearchHistory = memo(({ history }) => {
  return (
    <div className={styles.searchHistory}>
      <h3>Last 5 searches:</h3>
      <ul>
        {history.map(({ name, temp, weather, icon }) => (
          <li className={styles[getWeatherClass(temp)]} key={`${name}-${temp}`}>
            <img
              src={`https://openweathermap.org/img/wn/${icon}.png`}
              alt={`${weather} icon`}
            />
            <strong>{name}</strong> {temp}°C, {weather}
          </li>
        ))}
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
    })
  ).isRequired,
};

export default SearchHistory;
