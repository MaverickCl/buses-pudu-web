import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_URL+"/api/viajes";

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
