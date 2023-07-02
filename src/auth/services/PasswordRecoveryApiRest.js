import axios from "axios";

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

const BASE_URL = base+"api/cuenta";

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
