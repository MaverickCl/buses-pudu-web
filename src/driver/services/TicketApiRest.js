import axios from "axios";

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

const BASE_URL = base+"api/pasaje"; // Replace with your API base URL

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
