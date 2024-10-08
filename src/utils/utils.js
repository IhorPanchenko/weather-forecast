const TEMPERATURE_THRESHOLDS = {
  VERY_COLD: 0,
  COLD: 5,
  COOL: 15,
  MILD: 20,
  WARM: 25,
};

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
