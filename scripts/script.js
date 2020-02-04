let overlay = document.getElementById("overlay");

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnJhbmtyb29kbmF0IiwiYSI6ImNrNjBpcnZ4czA0d3YzbnVmM243Z2I2azQifQ.9_XhUpTIXv6zNVoXvF6bFg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/frankroodnat/ck60l0pza42ua1ipepnyx6a3m",
  center: [4.673, 52.332], // starting position [lng, lat]
  zoom: 15, // starting zoom
  bearing: 25
});

map.on("load", function() {
  map.loadImage(
    "https://cdn3.iconfinder.com/data/icons/party-47/64/stage-concert-cinema-spotlight-512.png",
    function(error, image) {
      if (error) throw error;
      map.addImage("cat", image);
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [4.6725, 52.3304]
              }
            }
          ]
        }
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "cat",
          "icon-size": 0.1
        }
      });
      map.on("click", "points", function(e) {
        map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 17 });
        overlay.style.marginTop = "70vh";
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on("mouseenter", "points", function() {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "points", function() {
        map.getCanvas().style.cursor = "";
      });
    }
  );
});

map.on("load", function() {
  map.addSource("maine", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [52.3302, 4.6718],
            [52.3301, 4.6729],
            [52.331, 4.6728],
            [52.3311, 4.6722],
            [52.3302, 4.6718]
          ]
        ]
      }
    }
  });
  map.addLayer({
    id: "maine",
    type: "fill",
    source: "maine",
    layout: {},
    paint: {
      "fill-color": "#088",
      "fill-opacity": 0.8
    }
  });
});
