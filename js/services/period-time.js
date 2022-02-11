import { createDOM } from "../utils/dom.js";
import { formatDate, formatTemp } from "../utils/format-data.js";
/**
 * A weather hour
 * @typedef {{temp: string, date: string, icon: string, description: string}} IPeriodTimeTemplate
 */

/**
 * Create a string to create a HTML Element
 * @param {IPeriodTimeTemplate} dataObject Info to render pero hour
 * @returns {string} HTML string
 */
function periodTimeTemplate({ temp, date, icon, description, isSelected }) {
  return `
    <li class="dayWeather-item">
      <span class="dayWeather-time">${date}</span>
      <img
        class="dayWeather-icon"
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="${description}"
        height="48"
        width="48"
      />
      <span class="dayWeather-temp">${temp}</span>
    </li>`;
}

/**
 * Creates an element to render the info about the weather per hour
 * @param {any} weather weather data
 * @returns {HTMLElement} Element to render in dom
 */
export function createPeriodTime(weather, weatherIndex) {
  const dateFormat = {
    hour: "numeric",
    hour12: true,
  };
  const dateTime = new Date(weather.dt * 1000);
  const temp = formatTemp(weather.main.temp);
  let date = formatDate(dateTime, dateFormat);
  date = date.replace("0", "12");
  const isSelected = weatherIndex === 0;
  const config = {
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    isSelected,
  };
  const $element = createDOM(periodTimeTemplate(config));

  $element.addEventListener("click", handleClick);

  return $element;
}

function handleClick(event) {
  const $container = event.currentTarget;
  const currentSelected = document.querySelector(".is-selected");

  currentSelected.removeAttribute("aria-selected");
  currentSelected.classList.remove("is-selected");
  $container.classList.add("is-selected");
  $container.setAttribute("aria-selected", "true");
}
