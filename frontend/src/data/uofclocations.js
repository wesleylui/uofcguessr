// src/data/uofcLocations.js
export const uofcLocations = [
  {
    id: 1,
    name: "MacEwan Hall",
    coordinates: [-114.130081, 51.07811], // [longitude, latitude]
    image:
      "https://cdn-images.dzcdn.net/images/cover/2cbda488ba28c815f6514ca4ff28783e/0x1900-000000-80-0-0.jpg",
  },
  {
    id: 2,
    name: "Science Theatres",
    coordinates: [-114.1285, 51.0792],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXl6k2Nr985b5UM33QWnI6QAKWxV7DwE67aw&s",
  },
  {
    id: 3,
    name: "Taylor Family Digital Library",
    coordinates: [-114.1295, 51.0775],
    image:
      "https://static.wikia.nocookie.net/keshi/images/4/45/Gabriel_album_cover.jpg/revision/latest/scale-to-width-down/1200?cb=20220323064224",
  },
  {
    id: 4,
    name: "Kinesiology Building",
    coordinates: [-114.1278, 51.0801],
    image:
      "https://i.pinimg.com/736x/b2/60/94/b26094970505bcd59c2e5fe8b6f41cf0.jpg",
  },
  {
    id: 5,
    name: "Engineering Building",
    coordinates: [-114.1312, 51.0798],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNgmRYdNTvlbPyATjR6x_3nzpd6OJ8jc7Clw&s",
  },
];

// Helper function to get random locations for a game
export const getRandomLocations = (count = 3) => {
  const shuffled = [...uofcLocations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
