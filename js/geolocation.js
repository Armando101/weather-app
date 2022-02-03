/**
 * Evaluates if the browser has support for geolocation
 * @returns {boolean} it has support for geolocation
 */
function geolocationSupport() {
  return "geolocation" in navigator;
}

export function getCurrentPosition() {
  if (!geolocationSupport()) {
    throw new Error("There is not support for geolocation in your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  });
}
