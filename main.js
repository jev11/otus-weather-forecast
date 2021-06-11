/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/history/index.js
function loadHistory() {
  const cities = JSON.parse(localStorage.getItem("cities"));
  if (cities) {
    return cities;
  }
  return [];
}

function saveHistory(list) {
  const objJson = JSON.stringify(list);
  localStorage.setItem("cities", objJson);
}

function drawHistory(el, list) {
  const newEl = el;
  newEl.innerHTML = `<ul>${list
    .map((item) => `<li class="city">${item}</li>`)
    .join("")}</ul>`;
}

function keepHistory(city, list) {
  list.unshift(city);
  if (list.length > 10) {
    list.pop();
  }
}

;// CONCATENATED MODULE: ./src/weather/index.js
function drawWeather(el, weatherInfo) {
  const newEl = el;
  newEl.innerHTML = `<div>
    <span>
    ${weatherInfo.name}
    </span>
    <span>
    <img src=https://openweathermap.org/img/wn/${
      weatherInfo.weather[0].icon
    }.png>
    </span>
    <span>
    Temperature: ${Math.round(weatherInfo.main.temp)}C
    </span>
    </div>`;
}

async function getWeather(cityName, key) {
  try {
    const url = `https://api.openweathermap.org/
data/2.5/weather?units=metric&q=${cityName}&appid=${key}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }
}

;// CONCATENATED MODULE: ./src/location/index.js
async function getCurrentLocation(
  url = "https://get.geojs.io/v1/ip/geo.json"
) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }
}

function drawMap(el, lat, lon, key) {
  const newEl = el;
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=
${lat},${lon}&zoom=12&size=400x400&key=${key}`;
  newEl.innerHTML = `<img src="${url}">`;
}

;// CONCATENATED MODULE: ./src/index.js
// при открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности (для получения прогноза погоды используйте https://openweathermap.org/current )
// он может ввести имя города в поле ввода и увидеть погоду в выбранном городе
// введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где он смотрел погоду
// при клике по строчке города в списке он видит погоду в выбранном городе
// кроме информации о погоде покажите в центре страницы карту для введенного адреса (используйте Google Maps Static API https://developers.google.com/maps/documentation/maps-static/start )
// Проверить покрытие кода тестами, и добавить проверку покрытия при запуске test скрипта. Покрытие должно быть не ниже 60%





const owKey = "69c7e4c421845cddf495f67b63f6cc51";
const gmKey = "AIzaSyC9RYvd4Srwv8p0dEjkPUnHPRrKouz5lfQ";

const historyEl = document.querySelector(".history");
const input = document.querySelector("input");
const src_button = document.querySelector("button");
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

src_button.addEventListener("click", async (ev) => {
  ev.preventDefault();

  weather = await getWeather(input.value, owKey);
  if (weather) {
    keepHistory(input.value, citiesList);
    drawWeather(forecastEl, weather);
    drawMap(mapEl, weather.coord.lat, weather.coord.lon, gmKey);
    drawHistory(historyEl, citiesList);
  }
  input.value = "";

  saveHistory(citiesList);
});

/******/ })()
;