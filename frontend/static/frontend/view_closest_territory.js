// import { getTribeInfo } from "./api_calls.js";
import { showTribeInfo } from "./utils.js";

let lat = 0,
  long = 0; // coordinates

function getLocation() {
  //geolocation api
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  // sending coordinates to backend
  lat = position.coords.latitude.toFixed(2);
  long = position.coords.longitude.toFixed(2);
  $.ajax({
    type: "GET",
    url: "/api/v1/find_closest_territory",
    data: {
      lat: lat,
      long: long,
    },
    dataType: "json",
    success: function (data) {
      getTribeInfo(data.name);
    },
    failure: function (data) {
      alert(`Failure, please try again! The error was: ${data.error}`);
    },
  });
}

function getTribeInfo(name) {
  console.log("before GET tribe info api call");
  $.ajax({
    type: "GET",
    url: "/api/v1/tribe_summary",
    data: {
      full_name: name,
    },
    dataType: "json",
    success: function (data) {
      console.log("before SHOW tribe info api call");
      showTribeInfo(data);
    },
    failure: function (data) {
      alert(`Error: ${data.error}`);
    },
  });
}
