import { getLatLon } from "./geolocation.js";
import { getWeather } from "./services/weather.js";

function configWeeklyWeather() {}

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
  configWeeklyWeather();
}
