renderMap();

async function getData(
  url = 'https://native-land.ca/wp-json/nativeland/v1/api/index.php?maps=territories'
) {
  let res = await fetch(url);
  let resData = await res.json();
  return resData;
}

async function renderMap() {
  let data = await getData();

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ3VycHJlZXRzaW5naG11bHRhbmkiLCJhIjoiY2txZmpsOGlrMTYzcjJvbnp0ZmJoeW1pZyJ9.PiJO1qXXB67Jl6k8FIXy7A';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-98.03878868233622, 60.05083719859644], // starting position
    zoom: 2, // starting zoom
  });

  map.on('load', () => {
    // Add a data source containing GeoJSON data.
    map.addSource('maine', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          // These coordinates outline Maine.
          coordinates: [
            [
              [123.502807, -17.056784],
              [123.579711, -17.135541],
              [123.684082, -17.277218],
              [123.777465, -17.345395],
              [123.870849, -17.350638],
              [124.118041, -17.392579],
              [124.282836, -17.43451],
              [124.425659, -17.439751],
              [124.486083, -17.439751],
              [124.508056, -17.282463],
              [124.508056, -17.135541],
              [124.502563, -17.041029],
              [124.48059, -16.893915],
              [124.469604, -16.841347],
              [124.343261, -16.830832],
              [124.194946, -16.830832],
              [124.052124, -16.815057],
              [123.95874, -16.815057],
              [123.859863, -16.857119],
              [123.766479, -16.920194],
              [123.651123, -16.972741],
              [123.579711, -16.988502],
              [123.502807, -17.056784],
            ],
          ],
        },
      },
    });

    map.addSource('national-park', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: data,
      },
    });

    map.addLayer({
      id: 'national-park+unqiue',
      type: 'fill',
      source: 'national-park', // reference the data source
      layout: {},
      paint: {
        'fill-color': ['get', 'color'], // blue color fill
        'fill-opacity': 0.5,
      },
    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
      id: 'maine',
      type: 'fill',
      source: 'maine', // reference the data source
      layout: {},
      paint: {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5,
      },
    });
    // Add a black outline around the polygon.
    map.addLayer({
      id: 'outline',
      type: 'line',
      source: 'maine',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    });

    map.on('click', 'national-park+unqiue', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features.map((f) => {
        return f.properties.Name;
      });

      let html = ``;

      for (let n of name) {
        html += `<p style='margin: 0;'><a href=http://127.0.0.1:8000/view_result/?name=${n}>${n}</a></p>`;
      }

      console.log(html);

      new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(html).addTo(map);
    });

    map.on('mouseenter', 'national-park+unqiue', (e) => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', 'national-park+unqiue', (e) => {
      map.getCanvas().style.cursor = '';
    });

    map.on('click', 'maine', (e) => {
      const description = e.features[0];

      new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<a></a>').addTo(map);
    });

    map.on('mouseenter', 'maine', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', 'maine', () => {
      map.getCanvas().style.cursor = '';
    });
  });
}
