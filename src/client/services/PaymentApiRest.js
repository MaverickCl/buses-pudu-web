import axios from "axios";

const BASE_URL = "http://localhost:8080/api/pago"; // Replace with your API base URL

class PaymentApiRest {
  static async postPayment(boletoDTO) {
    //console.log(boletoDTO);

    try {
      const response = await axios.post(
        `${BASE_URL}/webpay_plus/create`,
        boletoDTO
      );

      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default PaymentApiRest;
