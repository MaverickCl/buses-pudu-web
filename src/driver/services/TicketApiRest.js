import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_URL+"/api/pasaje";

class TicketApiRest {
  static async checkTicket(trip, ticket, token) {
    try {
      const response = await axios.get(`${BASE_URL}/${ticket}/${trip}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return error.response.data;
      console.log(error);
    }
  }
}

export default TicketApiRest;
