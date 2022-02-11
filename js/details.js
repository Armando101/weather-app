import { createDOM } from "./utils/dom.js";
import { formatSpeed, formatTemp } from "./utils/format-data.js";

export function handleClickDetails(event, weather) {
  const $container = event.currentTarget;
  const currentSelected = document.querySelector(".is-selected");
  currentSelected.removeAttribute("aria-selected");
  currentSelected.classList.remove("is-selected");
  $container.classList.add("is-selected");
  $container.setAttribute("aria-selected", "true");
  renderDetails(weather);
}

export function renderDetails(weather) {
  const $detailsContainer = document.querySelector(".weeklyWeather-details");

  let currentItem = $detailsContainer.childNodes[0];
  if ($detailsContainer.hasChildNodes()) {
    $detailsContainer.replaceChild(setDetails(weather), currentItem);
    return;
  }
  $detailsContainer.append(setDetails(weather));
}

function detailsTemplate({ tempMax, tempMin, wind, humidity }) {
  return `
  <div hidden='true'>
    <p>Máx: <span>${tempMax}</span></p>
    <p>Viento: <span>${wind}</span></p>
    <p>Mín: <span>${tempMin}</span></p>
    <p>Humedad: <span>${humidity}</span></p>
  </div>`;
}

function setDetails(data) {
  const tempMax = formatTemp(data.main.temp_max, false);
  const tempMin = formatTemp(data.main.temp_min, false);
  const wind = formatSpeed(data.wind.speed);
  const humidity = `${data.main.humidity} %`;

  const config = {
    tempMax,
    tempMin,
    wind,
    humidity,
  };

  const detail = detailsTemplate(config);
  return createDOM(detail);
}
