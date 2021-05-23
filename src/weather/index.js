export function drawWeather(el, weatherInfo) {
  const newEl = el;
  newEl.innerHTML = `<div>
    <span>
    ${weatherInfo.name}
    </span>
    <span>
    <img src=http://openweathermap.org/img/wn/${
      weatherInfo.weather[0].icon
    }.png>
    </span>
    <span>
    Temperature: ${Math.round(weatherInfo.main.temp)}C
    </span>
    </div>`;
}

export async function getWeather(cityName, key) {
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
