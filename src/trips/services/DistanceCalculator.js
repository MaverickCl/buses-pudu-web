import axios from "axios";
import cheerio from "cheerio";

const URL = "https://cl.mejoresrutas.com/distancia/";

class DistanceCalculator {
  // Function to geocode a city name and retrieve its latitude and longitude

  static async fetchPage(origin, destination) {
    try {
      const response = await fetch(
        `${URL}?from=${origin.replace(/\s/g, "+")}&to=${destination.replace(
          /\s/g,
          "+"
        )}`
        // {
        //   headers: {
        //     mode: "no-cors",
        //   },
        // }
      );

      const html = response.text();

      return html;
    } catch (error) {
      console.error("Error fetching page source:", error.message);
      return null;
    }
  }

  static async fetchDistance(origin, destination) {
    try {
      const html = await DistanceCalculator.fetchPage(origin, destination);

      console.log(
        `${URL}?from=${origin.replace(/\s/g, "+")}&to=${destination.replace(
          /\s/g,
          "+"
        )}`
      );
      console.log(html);

      return html;
    } catch (error) {
      console.error("Error fetching page source:", error.message);
      return null;
    }
  }
}

export default DistanceCalculator;
