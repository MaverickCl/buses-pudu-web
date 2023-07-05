import axios from 'axios';

const BASE_URL =  import.meta.env.VITE_API_URL;

class PasswdApiRest {

    static async changePass(token, cambioContraseniaDTO) {
    try {
      const response = await axios.put(`${BASE_URL}/api/cuenta/cambiar-contrasenia`, cambioContraseniaDTO, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

export default PasswdApiRest;
