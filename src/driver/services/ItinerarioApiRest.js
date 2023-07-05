import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_URL+"/api/movil/itinerario/conductor";

class ItinerarioApiRest {
  static async getTrips(token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        try {
          const response = await axios.get(`${BASE_URL}`, config);
          return response.data;
        } catch (error) {
          console.error(error);
          throw new Error("Error al obtener itinerario del conductor");
        }
      
  }
}

export default ItinerarioApiRest;