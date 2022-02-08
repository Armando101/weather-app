import weather from "../data/current-weather.js";
import { WEATHER_CONDITIONS_CODES } from "./constants.js";
import { getCurrentPosition, getLatLon } from "./geolocation.js";
import { getWeather } from "./services/weather.js";
import { formatDate, formatTemp } from "./utils/format-data.js";

function setCurrentCity($el, city) {
  $el.textContent = city;
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp);
}

function setCurrentDate($el) {
  const date = new Date();
  const formattedDate = formatDate(date);
  $el.textContent = formattedDate;
}

/**
 * Detects if its night or morning
 * @param {Date} sunsetTime sun set date
 * @param {Date} sunriseTime sun rise date
 * @returns returns night or morning depending on the current time
 */
function solarStatus(sunsetTime, sunriseTime) {
  const currentHours = new Date().getHours();
  const sunsetHours = sunsetTime.getHours();
  const sunriseHours = sunriseTime.getHours();

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return "night";
  }
  return "morning";
}

/**
 * Change background
 * @param {HTMLElement} $el element to change background
 * @param {number} weatherValue id weather
 * @param {string} solarStatus could be night or morning
 */
function setBackground($el, weatherValue, solarStatus) {
  const weatherType = WEATHER_CONDITIONS_CODES[weatherValue];
  const size = window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches
    ? "@2x"
    : "";
  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`;
}

/**
 * Hidde the loader and show application
 * @param {HTMLElement} $app Section to render data
 * @param {HTMLElement} $loader Loader container
 */
function showCurrentWeather($app, $loader) {
  $app.hidden = false;
  $loader.hidden = true;
}

function configCurrentWeather(weather) {
  const $app = document.querySelector("#app");
  const $loading = document.querySelector("#loading");

  // date
  const $currentWatherDate = document.querySelector("#current-weather-date");
  setCurrentDate($currentWatherDate);

  // city
  const $currentWatherCity = document.querySelector("#current-weather-city");
  const city = weather.name;
  setCurrentCity($currentWatherCity, city);
  // temp
  const $currentWatherTemp = document.querySelector("#current-weather-temp");
  const temp = weather.main.temp;
  setCurrentTemp($currentWatherTemp, temp);

  // background
  const sunriseTime = new Date(weather.sys.sunrise * 1000);
  const sunsetTime = new Date(weather.sys.sunset * 1000);

  const weatherValue = String(weather.weather[0].id).charAt(0);
  setBackground($app, weatherValue, solarStatus(sunsetTime, sunriseTime));

  // loader
  showCurrentWeather($app, $loading);
}

export default async function currentWeather() {
  const { lat, lon, isError } = await getLatLon();
  if (isError) {
    return console.error("Hubo un error");
  }
  const { isError: currentWeatherError, data: weather } = await getWeather(
    lat,
    lon
  );

  if (currentWeatherError) return console.error("Whoops somenthing went wrong");
  configCurrentWeather(weather);
}
