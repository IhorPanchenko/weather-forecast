const TEMPERATURE_THRESHOLDS = {
  VERY_COLD: 0,
  COLD: 5,
  COOL: 15,
  MILD: 20,
  WARM: 25,
};

const DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

/**
 * Get the weather class based on temperature.
 *
 * @param {number} temp - The temperature in degrees Celsius.
 * @returns {string} - The corresponding weather class: "veryCold", "cold", "cool", "mild", "warm", "hot", or "unknown".
 */
export const getWeatherClass = (temp) => {
  if (temp < TEMPERATURE_THRESHOLDS.VERY_COLD) {
    return "veryCold"; // Below 0
  } else if (temp <= TEMPERATURE_THRESHOLDS.COLD) {
    return "cold"; // 0 to 5
  } else if (temp <= TEMPERATURE_THRESHOLDS.COOL) {
    return "cool"; // 6 to 15
  } else if (temp <= TEMPERATURE_THRESHOLDS.MILD) {
    return "mild"; // 16 to 20
  } else if (temp <= TEMPERATURE_THRESHOLDS.WARM) {
    return "warm"; // 21 to 25
  } else {
    return "hot"; // Above 25
  }
};

/**
 * Converts wind direction from degrees to compass points.
 *
 * @param {number} degrees - The wind direction in degrees (0-359).
 * @returns {string} The corresponding compass direction.
 * @throws {Error} If the degrees are not within the range 0-359.
 */
export const getWindDirection = (degrees) => {
  if (degrees < 0 || degrees >= 360) {
    return "Invalid direction";
  }

  const directionIndex = Math.floor((degrees + 11.25) / 22.5) % 16;

  return DIRECTIONS[directionIndex];
};
