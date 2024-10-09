import { memo } from "react";
import PropTypes from "prop-types";
import { getWeatherClass } from "../../utils/utils";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import styles from "./WeatherCard.module.css";

const WeatherItem = memo(
  ({
    name,
    temp,
    feelsLike,
    pressure,
    humidity,
    weather,
    icon,
    windDeg,
    windSpeed,
    visibility,
    isOpen,
    onToggle,
  }) => (
    <li className={styles[getWeatherClass(temp)]} key={`${name}-${temp}`}>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={`${weather} icon`}
      />
      <strong>{name}</strong> {temp}°C, {weather}
      {isOpen && (
        <WeatherDetails
          feelsLike={feelsLike}
          pressure={pressure}
          humidity={humidity}
          windDeg={windDeg}
          windSpeed={windSpeed}
          visibility={visibility}
        />
      )}
      <button
        className={styles.btnDetails}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {isOpen ? "Hide Details" : "Show Details"}
      </button>
    </li>
  )
);

WeatherItem.propTypes = {
  name: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  feelsLike: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  windDeg: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  visibility: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default WeatherItem;
