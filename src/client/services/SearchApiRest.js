import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/viajes";

class SearchApiRest {
  static async getTrips(origin, destination) {
    try {
      const response = await axios.get(`${API_BASE_URL}/buscar`, {
        params: {
          origen: origin,
          destino: destination,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SearchApiRest;
