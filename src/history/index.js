export function loadHistory() {
  const cities = JSON.parse(localStorage.getItem("cities"));
  if (cities) {
    return cities;
  }
  return [];
}

export function saveHistory(list) {
  const objJson = JSON.stringify(list);
  localStorage.setItem("cities", objJson);
}

export function drawHistory(el, list) {
  el.innerHTML = `<ul>${list
    .map((item) => `<li class="city">${item}</li>`)
    .join("")}</ul>`;
}

export function keepHistory(city, list) {
  if (!list.includes(city)) {
    list.unshift(city);
    if (list.length > 10) {
      list.pop();
    }
  }
}
