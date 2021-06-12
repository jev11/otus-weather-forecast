export async function getCurrentLocation(
  url = "https://get.geojs.io/v1/ip/geo.json"
) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    console.error(`Error occured. Location could not be fetched. ${e}`);
    return null;
  }
}

export function drawMap(el, lat, lon, key) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=
${lat},${lon}&zoom=12&size=400x400&key=${key}`;
  el.innerHTML = `<img src="${url}">`;
}
