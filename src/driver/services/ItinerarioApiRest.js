import axios from "axios";

//const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
const base = 'http://localhost:8080/'; 

const BASE_URL = base+"api/movil/itinerario/conductor";

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