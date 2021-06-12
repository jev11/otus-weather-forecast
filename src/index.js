// при открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности (для получения прогноза погоды используйте https://openweathermap.org/current )
// он может ввести имя города в поле ввода и увидеть погоду в выбранном городе
// введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где он смотрел погоду
// при клике по строчке города в списке он видит погоду в выбранном городе
// кроме информации о погоде покажите в центре страницы карту для введенного адреса (используйте Google Maps Static API https://developers.google.com/maps/documentation/maps-static/start )
// Проверить покрытие кода тестами, и добавить проверку покрытия при запуске test скрипта. Покрытие должно быть не ниже 60%

import { loadHistory, saveHistory, drawHistory, keepHistory } from "./history";
import { drawWeather, getWeather } from "./weather";
import { getCurrentLocation, drawMap } from "./location";

const owKey = process.env.OPEN_WEATHER_KEY;
const gmKey = process.env.GOOGLE_MAPS_KEY;

const historyEl = document.querySelector(".history");
const cityInput = document.querySelector("input");
const searchCityButton = document.querySelector("button");
const forecastEl = document.querySelector(".forecast");
const mapEl = document.querySelector(".map");

let citiesList;
let weather;
(async function renderStartPage() {
  const currentLocation = await getCurrentLocation();
  weather = await getWeather(currentLocation.city, owKey);
  if (weather) {
    drawWeather(forecastEl, weather);
    drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
  }

  citiesList = await loadHistory();
  drawHistory(historyEl, citiesList);
  historyEl.onclick = async function delegateEventonHistoryEl(event) {
    weather = await getWeather(event.target.innerHTML, owKey);
    if (weather) {
      drawWeather(forecastEl, weather);
      drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
    }
  };
})();

searchCityButton.addEventListener("click", async (ev) => {
  ev.preventDefault();

  weather = await getWeather(cityInput.value, owKey);
  if (weather) {
    keepHistory(cityInput.value, citiesList);
    drawWeather(forecastEl, weather);
    drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
    drawHistory(historyEl, citiesList);
  }
  cityInput.value = "";

  saveHistory(citiesList);
});
