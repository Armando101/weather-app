import { API_KEY, BASE_API } from "../constants.js";
/**
 * Weather data
 * @typedef {{isError: boolean, data: any}} IWeatherData
 */

/**
 * Call open weather API and get information about the weather in your city
 * @param {number} lat latitude
 * @param {number} lon longitude
 * @param {string} [units] units
 * @returns {IWeatherData} weather data
 */
export async function getWeather(lat, lon, units = "metric") {
  const url = `${BASE_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  const response = await fetch(url);
  if (!response.ok)
    return {
      isError: true,
      data: null,
    };
  const data = await response.json();
  return { isError: false, data };
}
