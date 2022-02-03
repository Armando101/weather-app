import weather from "../data/current-weather.js";
import { WEATHER_CONDITIONS_CODES } from "./constants.js";
import { getCurrentPosition } from "./geolocation.js";
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

function configCurrentWeather(weather) {
  // loader
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

  const $app = document.querySelector("#app");
  const weatherValue = String(weather.weather[0].id).charAt(0);
  setBackground($app, weatherValue, solarStatus(sunsetTime, sunriseTime));
}

export default function currentWeather() {
  getCurrentPosition();
  console.log(weather);
  configCurrentWeather(weather);
}
