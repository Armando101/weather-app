/**
 * A config date
 * @typedef {{day: string, weekday: string, month: string}} IConfigFormatDate
 */
const defaultConfig = {
  day: "numeric",
  weekday: "long",
  month: "long",
};

/**
 * Format date
 * @param {Date} date date to be formatted
 * @param {IConfigFormatDate} config configuration object
 * @returns date formmated depending on configuration object
 */
export function formatDate(date, config = defaultConfig) {
  const formattedDate = new Intl.DateTimeFormat("es", config).format(date);
  return formattedDate;
}

/**
 * Format temperature
 * @param {number} value current temperature value raw
 * @returns string int number and celcius symbol
 */
export function formatTemp(value, round = true) {
  let formatTem = value;
  if (round) {
    formatTem = Math.round(value);
  }
  return `${formatTem}°`;
}

export function formatWeekList(rawData) {
  let dayList = [];
  const weekList = [];
  rawData.forEach((item, index) => {
    const isDivider = (index + 1) % 8 === 0;
    dayList.push(item);
    if (isDivider) {
      weekList.push(dayList);
      dayList = [];
    }
  });
  return weekList;
}

export function formatSpeed(speed, convertKmH = true) {
  let speedConverted = speed;
  let speedFormated;

  if (convertKmH) {
    speedConverted = Math.round(speed * 3.6);
    speedFormated = `${speedConverted} Km-h`;
    return speedFormated;
  }
  speedFormated = `${speedConverted} m-s`;
  return speedFormated;
}
