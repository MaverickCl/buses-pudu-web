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

  static async resetPassword(token, recuperacionContraseniaDTO) {
    try {
      const response = await axios.post(
        `${BASE_URL}/restablecer-contrasenia?token=${token}`,
        recuperacionContraseniaDTO
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PasswordRecoveryApiRest;
