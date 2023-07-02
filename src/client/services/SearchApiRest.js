import axios from "axios";

const base='http://localhost:8080/';

const API_BASE_URL = base+"api/viajes";

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
