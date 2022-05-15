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
    url: "/api/find_closest_territory",
    data: {
      lat: lat,
      long: long,
    },
    dataType: "json",
    success: function (data) {
      window.location.replace(`/tribe_summary?full_name=${data.name}`);
    },
    failure: function (data) {
      alert(`Failure, please try again! The error was: ${data.error}`);
    },
  });
}
