/**
 * Evaluates if the browser has support for geolocation
 * @returns {boolean} it has support for geolocation
 */
function geolocationSupport() {
  return "geolocation" in navigator;
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100_000,
};

export function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport()) {
    throw new Error("There is not support for geolocation in your browser");
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => {
        reject(new Error("We couldnt get your location"));
      },
      options
    );
  });
}

export async function getLatLon(options) {
  try {
    const {
      coords: { latitude: lat, longitude: lon },
    } = await getCurrentPosition(options);
    return { lat, lon, isError: false };
  } catch {
    return { isError: true, lat: null, lon: null };
  }
}
