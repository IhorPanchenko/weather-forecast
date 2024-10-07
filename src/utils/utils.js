export const getWeatherClass = (temp) => {
  if (temp > 15) return "warm-weather";
  if (temp > 5 && temp < 15) return "fall-weather";
  return "cold-weather";
};
