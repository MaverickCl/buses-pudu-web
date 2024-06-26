import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL+"/api/pago"; // Replace with your API base URL

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
