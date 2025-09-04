import React, { useEffect, useRef } from "react";

const MapPage = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
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
      new window.mapboxgl.Map({
        container: mapContainer.current,
        center: [-114.130081, 51.07811],
        zoom: 15,
        style: "mapbox://styles/mapbox/standard",
      });
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        ref={mapContainer}
        id="map"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default MapPage;
