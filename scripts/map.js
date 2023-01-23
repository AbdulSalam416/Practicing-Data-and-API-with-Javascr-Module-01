// Making a map with Tiles
const map = L.map("issmap").setView([0, 0], 1);

const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tile_url, 19, { attribution });

tiles.addTo(map);
// Making a map Icon

var issIcon = L.icon({
  iconUrl: "../iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

let firstTime = true;

async function getISS() {
  const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
  const response = await fetch(api_url);
  const data = await response.json();

  const { latitude, longitude } = data;

  marker.setLatLng([latitude, longitude]).addTo(map);

  if (firstTime) {
    map.setView([latitude, longitude], 2);
    firstTime = false;
  }

  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("long").textContent = longitude.toFixed(2);
  return { latitude, longitude };
}

getISS();

setInterval(getISS, 1000);
