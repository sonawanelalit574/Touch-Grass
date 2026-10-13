/** Climatic averages, rounded to a typical week. Not a forecast. */
export const places = [
  { id: "burlington", city: "Burlington", region: "Vermont", climate: "continental", zone: "5a", lastFrost: "05-15", firstFrost: "10-01", lat: 44.476, lon: -73.212, timeZone: "America/New_York" },
  { id: "boston", city: "Boston", region: "Massachusetts", climate: "continental", zone: "7a", lastFrost: "04-10", firstFrost: "11-05", lat: 42.36, lon: -71.059, timeZone: "America/New_York" },
  { id: "new-york", city: "New York", region: "New York", climate: "continental", zone: "7b", lastFrost: "04-10", firstFrost: "11-10", lat: 40.713, lon: -74.006, timeZone: "America/New_York" },
  { id: "minneapolis", city: "Minneapolis", region: "Minnesota", climate: "continental", zone: "4b", lastFrost: "05-10", firstFrost: "10-01", lat: 44.978, lon: -93.265, timeZone: "America/Chicago" },
  { id: "madison", city: "Madison", region: "Wisconsin", climate: "continental", zone: "5a", lastFrost: "05-05", firstFrost: "10-10", lat: 43.073, lon: -89.401, timeZone: "America/Chicago" },
  { id: "chicago", city: "Chicago", region: "Illinois", climate: "continental", zone: "6a", lastFrost: "04-20", firstFrost: "10-20", lat: 41.878, lon: -87.63, timeZone: "America/Chicago" },
  { id: "kansas-city", city: "Kansas City", region: "Missouri", climate: "continental", zone: "6b", lastFrost: "04-15", firstFrost: "10-25", lat: 39.1, lon: -94.579, timeZone: "America/Chicago" },
  { id: "denver", city: "Denver", region: "Colorado", climate: "continental", zone: "6a", lastFrost: "05-05", firstFrost: "10-05", lat: 39.739, lon: -104.99, timeZone: "America/Denver" },
  { id: "bozeman", city: "Bozeman", region: "Montana", climate: "continental", zone: "4b", lastFrost: "05-25", firstFrost: "09-20", lat: 45.677, lon: -111.043, timeZone: "America/Denver" },
  { id: "albuquerque", city: "Albuquerque", region: "New Mexico", climate: "continental", zone: "7b", lastFrost: "04-15", firstFrost: "10-30", lat: 35.085, lon: -106.651, timeZone: "America/Denver" },
  { id: "nashville", city: "Nashville", region: "Tennessee", climate: "subtropical", zone: "7a", lastFrost: "04-10", firstFrost: "10-30", lat: 36.163, lon: -86.781, timeZone: "America/Chicago" },
  { id: "raleigh", city: "Raleigh", region: "North Carolina", climate: "subtropical", zone: "7b", lastFrost: "04-05", firstFrost: "11-05", lat: 35.779, lon: -78.638, timeZone: "America/New_York" },
  { id: "atlanta", city: "Atlanta", region: "Georgia", climate: "subtropical", zone: "8a", lastFrost: "03-25", firstFrost: "11-15", lat: 33.749, lon: -84.388, timeZone: "America/New_York" },
  { id: "austin", city: "Austin", region: "Texas", climate: "subtropical", zone: "8b", lastFrost: "03-01", firstFrost: "11-25", lat: 30.267, lon: -97.743, timeZone: "America/Chicago" },
  { id: "phoenix", city: "Phoenix", region: "Arizona", climate: "desert", zone: "9b", lastFrost: "02-01", firstFrost: "12-15", lat: 33.449, lon: -112.074, timeZone: "America/Phoenix" },
  { id: "tucson", city: "Tucson", region: "Arizona", climate: "desert", zone: "9a", lastFrost: "02-15", firstFrost: "12-01", lat: 32.222, lon: -110.974, timeZone: "America/Phoenix" },
  { id: "los-angeles", city: "Los Angeles", region: "California", climate: "mediterranean", zone: "10b", lastFrost: "01-15", firstFrost: "12-20", lat: 34.052, lon: -118.244, timeZone: "America/Los_Angeles" },
  { id: "san-francisco", city: "San Francisco", region: "California", climate: "mediterranean", zone: "10a", lastFrost: "02-01", firstFrost: "12-20", lat: 37.775, lon: -122.419, timeZone: "America/Los_Angeles" },
  { id: "sacramento", city: "Sacramento", region: "California", climate: "mediterranean", zone: "9b", lastFrost: "02-20", firstFrost: "12-01", lat: 38.582, lon: -121.494, timeZone: "America/Los_Angeles" },
  { id: "san-diego", city: "San Diego", region: "California", climate: "mediterranean", zone: "10b", lastFrost: null, firstFrost: null, lat: 32.716, lon: -117.161, timeZone: "America/Los_Angeles" },
  { id: "seattle", city: "Seattle", region: "Washington", climate: "marine", zone: "8b", lastFrost: "03-15", firstFrost: "11-15", lat: 47.606, lon: -122.332, timeZone: "America/Los_Angeles" },
  { id: "portland", city: "Portland", region: "Oregon", climate: "marine", zone: "8b", lastFrost: "03-20", firstFrost: "11-15", lat: 45.515, lon: -122.678, timeZone: "America/Los_Angeles" },
  { id: "miami", city: "Miami", region: "Florida", climate: "tropical", zone: "11a", lastFrost: null, firstFrost: null, lat: 25.762, lon: -80.192, timeZone: "America/New_York" },
  { id: "honolulu", city: "Honolulu", region: "Hawaii", climate: "tropical", zone: "12", lastFrost: null, firstFrost: null, lat: 21.307, lon: -157.858, timeZone: "Pacific/Honolulu" }
];

export const climateInfo = {
  continental: {
    label: "Cold winters, warm summers",
    note: "Frost dates decide when tender crops can be outside."
  },
  subtropical: {
    label: "Mild winters, hot humid summers",
    note: "Winter is for greens. High summer is for okra, peppers, and early mornings, not lettuce."
  },
  desert: {
    label: "Hot desert, winter garden",
    note: "In the hot desert the vegetable year starts in fall and runs through spring. Do not tell them to wait for spring to plant tomatoes."
  },
  mediterranean: {
    label: "Dry summers, wet winters",
    note: "Cool crops go in with the fall rains. Summer is the dry pause."
  },
  marine: {
    label: "Mild and wet",
    note: "Soil stays wet for long stretches. If the soil sticks, they should not dig."
  },
  tropical: {
    label: "Frost-free",
    note: "There is no frost season here. Do not talk about frost, and do not tell them the garden is shutting down."
  }
};

export function placeLabel(place) {
  return `${place.city}, ${place.region}`;
}
