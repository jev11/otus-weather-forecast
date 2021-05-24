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
const input = document.querySelector("input");
const button = document.querySelector("button");
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
  historyEl.querySelectorAll(".city").forEach((item) => {
    item.addEventListener("click", async () => {
      weather = await getWeather(item.innerHTML, owKey);
      if (weather) {
        drawWeather(forecastEl, weather);
        drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
      }
    });
  });
})();

button.addEventListener("click", async (ev) => {
  ev.preventDefault();

  weather = await getWeather(input.value, owKey);
  if (weather) {
    keepHistory(input.value, citiesList);
    drawWeather(forecastEl, weather);
    drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
    drawHistory(historyEl, citiesList);
  }
  input.value = "";

  historyEl.querySelectorAll(".city").forEach((item) => {
    item.addEventListener("click", async () => {
      weather = await getWeather(item.innerHTML, owKey);
      if (weather) {
        drawWeather(forecastEl, weather);
        drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
      }
    });
  });

  saveHistory(citiesList);
});
