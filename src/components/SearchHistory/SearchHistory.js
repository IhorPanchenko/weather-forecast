import { getWeatherClass } from "../../utils/utils";
import styles from "./SearchHistory.module.css";

const SearchHistory = ({ history }) => {
  return (
    <div className={styles.searchHistory}>
      <h3>Last 5 searches:</h3>
      <ul>
        {history.map((item, index) => (
          <li className={styles[getWeatherClass(item.temp)]} key={index}>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt="weather icon"
            />
            <strong>{item.name}</strong> {item.temp}°C, {item.weather}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
