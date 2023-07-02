import axios from 'axios';

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

const BASE_URL = base;

class EmailVerifyApiRest {
  static async solicitarTokenValidacion(token,correoRecuperacionDTO) {
    const requestData={correo: `${correoRecuperacionDTO}`}

    try {
      const response = await axios.post(`${BASE_URL}api/cuenta/validar-correo`, requestData , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async confirmarValidacionCorreo(token) {
    try {
      const response = await axios.get(`${BASE_URL}api/cuenta/verificacion-correo?token=`+ token
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default EmailVerifyApiRest;