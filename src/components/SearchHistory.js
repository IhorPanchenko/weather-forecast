import { getWeatherClass } from "../utils/utils";

const SearchHistory = ({ history }) => {
  return (
    <div className="search-history">
      <h3>Last 5 searches:</h3>
      <ul>
        {history.map((item, index) => (
          <li className={getWeatherClass(item.temp)} key={index}>
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
