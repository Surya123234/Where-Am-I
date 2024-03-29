import { getTribeInfo } from "./api_calls.js";
import { showTribeInfo } from "./utils.js";

renderMap();

async function renderMap() {
  const data = await getData();
  const map = createMap();

  map.on("load", () => {
    map.addSource("tribeLocations", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: data,
      },
    });

    map.addLayer({
      id: "tribeLocationsUnique",
      type: "fill",
      source: "tribeLocations", // reference the data source
      layout: {},
      paint: {
        "fill-color": ["get", "color"], // blue color fill
        "fill-opacity": 0.3,
      },
    });

    map.on("click", "tribeLocationsUnique", (e) => {
      console.clear();
      const slugNames = e.features.map((f) => {
        // console.log("TRIBE NAME " + f.properties.Slug);
        return f.properties.Slug;
      });
      const fullNames = e.features.map((f) => {
        return f.properties.Name;
      });

      let html = ``;

      for (let i = 0; i < slugNames.length; i++) {
        var href = `<span id=${i}>${fullNames[i]}</span>`;
        html += `
        <p style='margin: 0; 
        color: blue;
        cursor: pointer;
        text-decoration: underline;'>
        ${href}</p>`;

        console.log("I is " + i);
      }

      console.log("HTML IS " + html);

      new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(html).addTo(map);

      for (let i = 0; i < slugNames.length; i++) {
        document.getElementById(i).addEventListener("click", async (e) => {
          // console.log("Clicking the tribe " + fullNames[i]);
          let tribeInfo = await getTribeInfo(fullNames[i], slugNames[i]);
          showTribeInfo(tribeInfo);
        });
      }
    });

    // Change the cursor back to a pointer
    // when it enters the states layer.
    map.on("mouseenter", "tribeLocationsUnique", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change the cursor back to a grab
    // when it leaves the states layer.
    map.on("mouseleave", "tribeLocationsUnique", () => {
      map.getCanvas().style.cursor = "";
    });
  });
}

async function getData(
  url = "https://native-land.ca/wp-json/nativeland/v1/api/index.php?maps=territories"
) {
  let res = await fetch(url);
  let resData = await res.json();
  return resData;
}

function createMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZ3VycHJlZXRzaW5naG11bHRhbmkiLCJhIjoiY2txZmpsOGlrMTYzcjJvbnp0ZmJoeW1pZyJ9.PiJO1qXXB67Jl6k8FIXy7A";
  return new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: [-98.03878868233622, 60.05083719859644], // starting position
    zoom: 2, // starting zoom
  });
}
