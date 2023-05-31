import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cuenta";

class PasswordRecoveryApiRest {
  static async requestPasswordRecovery(correo) {
    try {
      const response = await axios.post(`${BASE_URL}/recuperar-contrasenia`, {
        correo,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(token, newPassword) {
    try {
      const response = await this.api.post("/restablecer-contrasenia", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PasswordRecoveryApiRest;
