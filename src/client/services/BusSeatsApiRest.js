import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your API base URL

class BusSeatsApiRest {
  static async getBusSeats(busId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/bus/${busId}/seats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default BusSeatsApiRest;
