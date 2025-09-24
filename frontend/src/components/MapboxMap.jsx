import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { DEFAULT_MAP_CONFIG, MAPBOX_TOKEN, MAPBOX_VERSION } from "../constants/gameConstants";

const MapboxMap = forwardRef(({
  style = {},
  mapStyle = DEFAULT_MAP_CONFIG.style,
  center,
  zoom = DEFAULT_MAP_CONFIG.zoom,
  onSelect,
  disableClick = false,
  onMapLoad,
}, ref) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

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

      // Store map instance for ref
      mapInstance.current = map;

      // Call onMapLoad callback when map is ready
      if (typeof onMapLoad === "function") {
        map.on("load", () => {
          onMapLoad(map);
        });
      }

      // Only add click listener if clicks are not disabled
      if (!disableClick) {
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
    }
    // Clean up on unmount
    return () => {
      if (map) map.remove();
    };
  }, [center, zoom, mapStyle, onSelect, disableClick, onMapLoad]);

  // Expose map instance through ref
  useImperativeHandle(ref, () => ({
    getMap: () => mapInstance.current,
  }));

  return <div ref={mapContainer} id="map" style={style} />;
});

export default MapboxMap;
