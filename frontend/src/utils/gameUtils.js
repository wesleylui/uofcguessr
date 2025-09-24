// src/utils/gameUtils.js

// Helper function to calculate distance between two points (Haversine formula)
export function calculateDistance(coord1, coord2) {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

// Helper function to calculate score based on distance
export function calculateScore(distance) {
  // Max score: 5000 points
  // Decreases with distance
  if (distance < 10) return 5000; // Perfect guess
  if (distance < 100) return 4500; // Very close
  if (distance < 500) return 4000; // Close
  if (distance < 1000) return 3000; // Good
  if (distance < 2000) return 2000; // Fair
  if (distance < 5000) return 1000; // Poor
  return Math.max(0, 5000 - Math.floor(distance / 10)); // Very poor
}

// Calculate both distance and score in one function to avoid repeated calculations
export function calculateGuessResult(correctLocation, playerGuess) {
  const distance = calculateDistance(correctLocation.coordinates, [playerGuess.lng, playerGuess.lat]);
  const score = calculateScore(distance);
  return { distance, score };
}
