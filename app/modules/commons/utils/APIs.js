export const cbAPI = endpoint => `https://api.citybik.es/v2/${endpoint}`;

export const nomiAPI = endpoint =>
  ` https://nominatim.openstreetmap.org/${endpoint}`;

export const googleDirections = endpoint =>
  `https://www.google.com/maps/dir/${endpoint}`;

export const openStreetMapsLayer =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
