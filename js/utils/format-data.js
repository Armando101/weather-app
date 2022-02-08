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
export function formatTemp(value) {
  const formatTem = Math.round(value);
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
