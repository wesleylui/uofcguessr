import React, { useEffect, useRef } from "react";

const GamePage = () => {
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
        center: [-114.130081, 51.07811],
        zoom: 15,
        style: "mapbox://styles/mapbox/standard",
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
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div
        ref={mapContainer}
        id="map"
        style={{
          width: "80vw",
          height: "80vh",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default GamePage;
