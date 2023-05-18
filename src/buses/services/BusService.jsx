import axios from 'axios';

const apiEndpoint = 'http://localhost:8080/api/bus'; 

const crearBus = async (busData) => {
  try {
    const response = await axios.post(`${apiEndpoint}/crear`, busData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el bus');
  }
};

const enviarAsientos = async (busData) => {
  try {
    console.log(busData)
    //const response = await axios.post(`${apiEndpoint}/${busData.patenteBus}/asientos`, busData);
    const response = await axios.post(`${apiEndpoint}/asientos`, busData);
    return response.data;
  } catch (error) {
    throw new Error('Error al enviar los asientos');
  }
};

const actualizarBus = async (busId, busData) => {
  try {
    const response = await axios.put(`${apiEndpoint}/${busId}`, busData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el bus');
  }
};

export default {
  crearBus,
  actualizarBus,
  enviarAsientos
};
