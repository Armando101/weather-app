import weather from "../data/current-weather.js";
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
}

export default function currentWeather() {
  console.log(weather);
  configCurrentWeather(weather);
}
