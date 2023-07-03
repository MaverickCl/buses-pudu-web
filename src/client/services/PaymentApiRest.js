import axios from "axios";

//const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
const base = 'http://localhost:8080/'; 

const BASE_URL = base+"api/pago"; // Replace with your API base URL

class PaymentApiRest {
  static async postPayment(ticketDto, token) {
    console.log(token && { headers: { Authorization: `Bearer ${token}` } });
    try {
      const response = await axios.post(
        `${BASE_URL}/webpay_plus/create`,
        ticketDto,
        token && { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPayment(token) {
    try {
      const response = await axios.post(
        `${BASE_URL}/webpay_plus/commit?token_ws=` + token
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PaymentApiRest;
