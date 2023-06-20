import axios from "axios";

const BASE_URL = "http://localhost:8080/api/pago"; // Replace with your API base URL

class PaymentApiRest {
  static async postPayment(boletoDTO, token) {
    console.log(token && { headers: { Authorization: `Bearer ${token}` } });
    try {
      const response = await axios.post(
        `${BASE_URL}/webpay_plus/create`,
        boletoDTO,
        token && { headers: { Authorization: `Bearer ${token}` } }
      );

      //console.log(response.data);
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
