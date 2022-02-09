import { getLatLon } from "./geolocation.js";
import { getWeather } from "./services/weather.js";
import { createDOM } from "./utils/dom.js";
import { formatWeekList } from "./utils/format-data.js";

function configWeeklyWeather(weekList) {
  const $container = document.querySelector(".weeklyWeather");
  weekList.forEach((item) => {
    const $el = createDOM("<h2>Hello world</h2>");
    $container.append($el);
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
