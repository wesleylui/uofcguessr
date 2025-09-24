import React, { useEffect, useRef } from "react";
import { DEFAULT_MAP_CONFIG, MAPBOX_TOKEN, MAPBOX_VERSION } from "../constants/gameConstants";

const MapboxMap = ({
  style = {},
  mapStyle = DEFAULT_MAP_CONFIG.style,
  center,
  zoom = DEFAULT_MAP_CONFIG.zoom,
  onSelect,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    let map;
    let marker = null;

    // Load Mapbox GL JS script and CSS if not already loaded
    if (!window.mapboxgl) {
      const script = document.createElement("script");
      script.src = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VERSION}/mapbox-gl.js`;
      script.async = true;
      document.body.appendChild(script);

      const link = document.createElement("link");
      link.href = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VERSION}/mapbox-gl.css`;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      script.onload = () => {
        createMap();
      };
    } else {
      createMap();
    }

    function createMap() {
      window.mapboxgl.accessToken = MAPBOX_TOKEN;
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
        // Create a new marker with red circle dot style
        marker = new window.mapboxgl.Marker({
          color: "red",
          scale: 0.8,
        })
          .setLngLat([lng, lat])
          .addTo(map);

        if (typeof onSelect === "function") {
          onSelect({ lng, lat, hasMarker: true });
        }
      });
    }
    // Clean up on unmount
    return () => {
      if (map) map.remove();
    };
  }, [center, zoom, mapStyle, onSelect]);

  return <div ref={mapContainer} id="map" style={style} />;
};

export default MapboxMap;
