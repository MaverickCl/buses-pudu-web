import axios from "axios";

const base='http://localhost:8080/';

const BASE_URL = base+"api/cuenta/cliente";

class ProfileApiRest {
  static async getProfile(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`${BASE_URL}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener perfil de usuario");
    }
  }

  static async updateProfile(token, profileData) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.put(`${BASE_URL}`, profileData, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar perfil de usuario");
    }
  }

  static async addFrecuent(token, PasajeroRecurrenteDTO) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/crearRecurrentes`,
        PasajeroRecurrenteDTO,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar frecuente");
    }
  }

  static async deleteFrecuent(token, id) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar frecuente");
    }
  }

  static async updateFrecuent(token, PasajeroRecurrenteDTO) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/editarRecuerrente/${PasajeroRecurrenteDTO.id}`,
        PasajeroRecurrenteDTO,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al editar frecuente");
    }
  }
}

export default ProfileApiRest;
