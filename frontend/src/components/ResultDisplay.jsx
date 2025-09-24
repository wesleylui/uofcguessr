import React, { useEffect, useRef, useCallback } from "react";
import MapboxMap from "./MapboxMap";
import { CENTER_UOFC } from "../constants/gameConstants";

const ResultDisplay = ({ correctLocation, playerGuess, distance, score }) => {
  const mapRef = useRef(null);

  const mapStyle = {
    width: "80vw",
    height: "60vh",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
    overflow: "hidden",
    marginBottom: "1rem",
  };

  const locationInfoStyle = {
    textAlign: "center",
    marginBottom: "1rem",
  };

  const locationNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    color: "#333",
  };

  const guessInfoStyle = {
    fontSize: "1rem",
    color: "#666",
    margin: "0.25rem 0",
  };

  const scoreStyle = {
    fontSize: "1.1rem",
    color: "#000",
    margin: "0.25rem 0",
  };

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    
    // Add green marker for correct location
    const correctMarker = new window.mapboxgl.Marker({
      color: "#28a745", // Green color
      scale: 0.8,
    })
      .setLngLat(correctLocation.coordinates)
      .addTo(map);

    // Add red marker for player's guess
    const guessMarker = new window.mapboxgl.Marker({
      color: "#dc3545", // Red color
      scale: 0.8,
    })
      .setLngLat([playerGuess.lng, playerGuess.lat])
      .addTo(map);

    // Store markers for cleanup
    mapRef.current.correctMarker = correctMarker;
    mapRef.current.guessMarker = guessMarker;
  }, [correctLocation.coordinates, playerGuess.lng, playerGuess.lat]);

  useEffect(() => {
    // Cleanup markers when component unmounts
    return () => {
      if (mapRef.current && mapRef.current.correctMarker) {
        mapRef.current.correctMarker.remove();
      }
      if (mapRef.current && mapRef.current.guessMarker) {
        mapRef.current.guessMarker.remove();
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {/* UofC Campus Map */}
      <MapboxMap
        ref={mapRef}
        center={CENTER_UOFC}
        zoom={15}
        style={mapStyle}
        disableClick={true}
        onMapLoad={handleMapLoad}
      />
      
      {/* Location Information */}
      <div style={locationInfoStyle}>
        <h2 style={locationNameStyle}>
          Answer: {correctLocation.name}
        </h2>
        <p style={guessInfoStyle}>
          Your guess was {distance.toFixed(2)} meters away
        </p>
        <p style={scoreStyle}>
          Score: {score} points
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
