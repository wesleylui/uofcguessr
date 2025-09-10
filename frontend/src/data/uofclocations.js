// src/data/uofcLocations.js
export const uofcLocations = [
  {
    id: 1,
    name: "MacEwan Hall",
    coordinates: [-114.130081, 51.07811], // [longitude, latitude]
    placeholderImage:
      "https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=MacEwan+Hall",
  },
  {
    id: 2,
    name: "Science Theatres",
    coordinates: [-114.1285, 51.0792],
    placeholderImage:
      "https://via.placeholder.com/400x300/7ED321/FFFFFF?text=Science+Theatres",
  },
  {
    id: 3,
    name: "Taylor Family Digital Library",
    coordinates: [-114.1295, 51.0775],
    placeholderImage:
      "https://via.placeholder.com/400x300/F5A623/FFFFFF?text=Taylor+Library",
  },
  {
    id: 4,
    name: "Kinesiology Building",
    coordinates: [-114.1278, 51.0801],
    placeholderImage:
      "https://via.placeholder.com/400x300/BD10E0/FFFFFF?text=Kinesiology+Building",
  },
  {
    id: 5,
    name: "Engineering Building",
    coordinates: [-114.1312, 51.0798],
    placeholderImage:
      "https://via.placeholder.com/400x300/50E3C2/FFFFFF?text=Engineering+Building",
  },
];

// Helper function to get random locations for a game
export const getRandomLocations = (count = 3) => {
  const shuffled = [...uofcLocations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
