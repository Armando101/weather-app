const $tabContainer = document.getElementById("tabs");
const $tabList = $tabContainer.querySelectorAll(".tab");

const today = new Date();
let weekday = today.getDay();

const WEEK = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function nextDay(day) {
  if (day === 6) {
    return 0;
  }
  return day + 1;
}

$tabList.forEach(($tab, index) => {
  if (index === 0) {
    $tab.textContent = "Hoy";
    weekday = nextDay(weekday);
    return;
  }
  $tab.textContent = WEEK[weekday];
  weekday = nextDay(weekday);
});
