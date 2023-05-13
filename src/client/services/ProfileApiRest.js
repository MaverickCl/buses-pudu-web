import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/cliente';

class ProfileApiRest {
  static async getProfile(token) {



    const config = {
        
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`${BASE_URL}/perfil`, config);
      return response.data;
      
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener perfil de usuario');
    }

   
  }

  static async updateProfile(token, profileData) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.put(`${BASE_URL}/editar`, profileData, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar perfil de usuario');
    }
  }
}

export default ProfileApiRest;
