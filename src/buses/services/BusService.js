import axios from "axios";

const apiEndpoint = "http://localhost:8080/api/bus";

class BusService {
  static async crearBus(busData, token) {
    try {
      const response = await axios.post(`${apiEndpoint}/crear`, busData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async enviarAsientos(busData, token) {
    try {
      console.log(busData);
      //const response = await axios.post(`${apiEndpoint}/${busData.patenteBus}/asientos`, busData);
      const response = await axios.post(`${apiEndpoint}/asientos`, busData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al enviar los asientos");
    }
  }

  static async actualizarBus(busId, busData) {
    try {
      const response = await axios.put(`${apiEndpoint}/${busId}`, busData);
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el bus");
    }
  }
}

export default BusService;