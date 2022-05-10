let lat = 0,
  long = 0; // coordinates

function getLocation() {
  //geolocation api
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  // sending coords to django
  (lat = position.coords.latitude.toFixed(2)),
    (long = position.coords.longitude.toFixed(2));
  $.ajax({
    type: "GET",
    url: "/find_closest_territory",
    data: {
      lat: lat,
      long: long,
    },
    dataType: "json",
    success: function (data) {
      window.location.replace(`/view_result?full_name=${data.name}`);
    },
    failure: function () {
      alert("failure");
    },
  });
}
