import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_URL+"/api/cuenta";

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
