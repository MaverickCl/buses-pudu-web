import axios from "axios";

const apiEndpoint = "http://localhost:8080/api/bus";

class BusService {
  static async crearBus(busData) {
    try {
      const response = await axios.post(`${apiEndpoint}/crear`, busData);
      return response.data;
    } catch (error) {
      throw new Error("Error al crear el bus");
    }
  }

  static async enviarAsientos(busData) {
    try {
      console.log(busData);
      //const response = await axios.post(`${apiEndpoint}/${busData.patenteBus}/asientos`, busData);
      const response = await axios.post(`${apiEndpoint}/asientos`, busData);
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
