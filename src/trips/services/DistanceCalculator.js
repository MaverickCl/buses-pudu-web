import axios from "axios";

class DistanceCalculator {
  // Function to geocode a city name and retrieve its latitude and longitude
  static async geocodeCity(cityName) {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your own Google Maps API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      cityName
    )},Chile&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("No results found for the city.");
      }
    } catch (error) {
      console.error("Error geocoding city:", error.message);
      return null;
    }
  }

  // Example usage
  static async calculateDistanceBetweenCities(city1Name, city2Name) {
    const city1Coordinates = await geocodeCity(city1Name);
    const city2Coordinates = await geocodeCity(city2Name);

    if (city1Coordinates && city2Coordinates) {
      const distance = calculateDistance(
        city1Coordinates.latitude,
        city1Coordinates.longitude,
        city2Coordinates.latitude,
        city2Coordinates.longitude
      );

      console.log(
        `The distance between ${city1Name} and ${city2Name} is ${distance.toFixed(
          2
        )} kilometers.`
      );
    }
  }
}

export default DistanceCalculator;
