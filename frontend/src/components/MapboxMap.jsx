import React, { useEffect, useRef } from "react";

const MapboxMap = ({
  style = {},
  mapStyle = "mapbox://styles/mapbox/standard",
  center = [-114.130081, 51.07811],
  zoom = 15,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    let map;
    let marker = null;

    // Load Mapbox GL JS script and CSS if not already loaded
    if (!window.mapboxgl) {
      const script = document.createElement("script");
      script.src = "https://api.mapbox.com/mapbox-gl-js/v3.14.0/mapbox-gl.js";
      script.async = true;
      document.body.appendChild(script);

      const link = document.createElement("link");
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.14.0/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      script.onload = () => {
        createMap();
      };
    } else {
      createMap();
    }

    function createMap() {
      window.mapboxgl.accessToken =
        "pk.eyJ1Ijoid2VzbGV5bHVpIiwiYSI6ImNtZjRsNDl2NDA2bWoya29pOHUzcHFvaXoifQ.Np_6O32SHiCIaS8Q40rWSA";
      map = new window.mapboxgl.Map({
        container: mapContainer.current,
        center,
        zoom,
        style: mapStyle,
      });

      map.on("click", function (e) {
        const { lng, lat } = e.lngLat;
        // Remove previous marker if exists
        if (marker) {
          marker.remove();
        }
        // Create a new marker
        marker = new window.mapboxgl.Marker({
          color: "red",
          scale: 0.8,
        })
          .setLngLat([lng, lat])
          .addTo(map);
      });
    }
    // Clean up on unmount
    return () => {
      if (map) map.remove();
    };
  }, [center, zoom, mapStyle]);

  return <div ref={mapContainer} id="map" style={style} />;
};

export default MapboxMap;
