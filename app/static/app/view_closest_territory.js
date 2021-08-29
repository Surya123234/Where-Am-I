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
    type: 'GET',
    url: '/ajax_filter',
    data: {
      lat: lat,
      long: long,
    },
    dataType: 'json',
    success: function (data) {
      window.location.replace(
        `/view_result?name=${data.name}`
        // `/view_result?name=${data.name}&summary=${data.summary}&link=${data.link}`
      );
    },
    failure: function () {
      alert('failure');
    },
  });
}
