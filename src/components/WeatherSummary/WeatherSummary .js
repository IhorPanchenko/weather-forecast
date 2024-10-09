import PropTypes from "prop-types";
import { getWeatherClass } from "../../utils/utils";
import styles from "./WeatherSummary.module.css";

const WeatherInfo = ({ weatherData }) => {
  return (
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
  );
};

WeatherInfo.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    weather: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherInfo;
