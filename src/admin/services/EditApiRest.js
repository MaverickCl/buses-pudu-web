import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/editar';
const BASE_URL_USER ='http://localhost:8080/api/admin/usuario';

class EditApiRest {
  static async getProfile(token,id) {



    const config = {
        
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`${BASE_URL_USER}/${id}`, config);
      return response.data;
      
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener perfil de usuario');
    }

   
  }

  static async updateProfile(token, id , profileData) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      
    };
    
    try {
      //console.log(`${BASE_URL}/${id}`, profileData, config)
      const response = await axios.put(`${BASE_URL}`, profileData, config);
      
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar perfil de usuario');
    }
  }
}

export default EditApiRest;