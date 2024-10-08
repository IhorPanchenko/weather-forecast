import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import WeatherCard from "../WeatherCard/WeatherCard";
import styles from "./SearchHistory.module.css";

const SearchHistory = memo(({ history }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleDetails = useCallback((name) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === name ? null : name));
  }, []);

  return (
    <div className={styles.searchHistory}>
      <h3>Last 5 searches:</h3>
      <ul>
        {history.map((item) => {
          const isOpen = openItem === item.name;

          return (
            <WeatherCard
              key={item.name}
              {...item}
              isOpen={isOpen}
              onToggle={() => toggleDetails(item.name)}
            />
          );
        })}
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
      windSpeed: PropTypes.number.isRequired,
      visibility: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SearchHistory;
