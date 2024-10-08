import { getWindDirection } from "../../utils/utils";
import styles from "./WeatherDetails.module.css";

const WeatherDetails = ({
  feelsLike,
  pressure,
  humidity,
  windDeg,
  windGust,
  windSpeed,
  visibility,
}) => {
  const weatherDetails = [
    { label: "Feels Like", value: `${feelsLike}°C` },
    { label: "Pressure", value: `${pressure} mb` },
    { label: "Humidity", value: `${humidity}%` },
    { label: "Visibility", value: `${(visibility / 1000).toFixed(1)} km` },
    { label: "Wind Speed", value: `${windSpeed} m/s` },
    { label: "Wind Gusts", value: `${windGust} m/s` },
    { label: "Wind Direction", value: getWindDirection(windDeg) },
  ];

  return (
    <div className={styles.weatherDetails}>
      <div className={styles.currentWeather}>
        <h2>Weather Details</h2>
      </div>

      <div className={styles.weatherInfo}>
        {weatherDetails.map(({ label, value }) => (
          <div className={styles.infoBlock} key={label}>
            <span className={styles.label}>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
