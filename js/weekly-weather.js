import { getLatLon } from "./geolocation.js";
import { createPeriodTime } from "./services/period-time.js";
import { getWeather } from "./services/weather.js";
import { createDOM } from "./utils/dom.js";
import { formatWeekList } from "./utils/format-data.js";

function tabPanelTemplate(id) {
  return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
      <div class="dayWeather" id="dayWeather-${id}">
        <ul style="color:white" class="dayWeather-list" id="dayWeather-list-${id}">
        </ul>
      </div>
    </div>
  `;
}

function createTabPanel(id) {
  const $panel = createDOM(tabPanelTemplate(id));
  if (id > 0) {
    $panel.hidden = true;
  }
  return $panel;
}

function configWeeklyWeather(weekList) {
  const $container = document.querySelector(".tabs");
  weekList.forEach((day, index) => {
    const $panel = createTabPanel(index);
    $container.append($panel);
    day.forEach((weather, weatherIndex) => {
      $panel
        .querySelector(".dayWeather-list")
        .append(createPeriodTime(weather));
    });
  });
}

export async function weeklyWeather() {
  const { lat, lon, isError } = await getLatLon();
  if (isError) {
    return new Error("Something went wrong");
  }
  const { isError: weeklyWeatherError, data: weather } = await getWeather(
    lat,
    lon,
    true
  );
  if (weeklyWeatherError) {
    return new Error("Error getting data");
  }
  const weekList = formatWeekList(weather.list);
  configWeeklyWeather(weekList);
}
