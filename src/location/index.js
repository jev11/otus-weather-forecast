export function getCurrentLocation(
  url = "https://get.geojs.io/v1/ip/geo.json"
) {
  const location = fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  return location;
}

export function drawMap(el, lat, lon, key) {
  const newEl = el;
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=
${lat},${lon}&zoom=12&size=400x400&key=${key}`;
  newEl.innerHTML = `<img src="${url}">`;
}
