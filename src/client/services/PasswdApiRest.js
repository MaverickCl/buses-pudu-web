import axios from 'axios';

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

const BASE_URL = base;

class PasswdApiRest {

    static async changePass(token, cambioContraseniaDTO) {
    try {
      const response = await axios.put(`${BASE_URL}api/cuenta/cambiar-contrasenia`, cambioContraseniaDTO, {
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
