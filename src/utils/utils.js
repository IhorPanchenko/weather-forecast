export const getWeatherClass = (temp) => {
  if (temp > 15) return "warm";
  if (temp > 5 && temp < 15) return "fall";
  return "cold";
};
