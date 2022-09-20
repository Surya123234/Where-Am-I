import { getClosestTribe, getTribeInfo } from "./api_calls.js";
import { showTribeInfo } from "./utils.js";

document
  .getElementsByClassName("btneffect")[0]
  .addEventListener("click", () => {
    //geolocation api
    let loc = navigator.geolocation;
    if (loc) {
      loc.getCurrentPosition(showPosition);
    }
  });

async function showPosition(position) {
  let lat = position.coords.latitude.toFixed(2);
  let long = position.coords.longitude.toFixed(2);
  let data = await getClosestTribe(lat, long);
  let tribeInfo = await getTribeInfo(data.name);
  showTribeInfo(tribeInfo);
}
