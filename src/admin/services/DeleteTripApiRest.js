import axios from 'axios';
const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
//const base = 'http://localhost:8080/'; 

const BASE_URL = base+'api/viajes';

class DeleteTripApiRest {
  static async getTrip(token,codigo) {



    const config = {
        
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`${BASE_URL}/${codigo}`, config);
      return response.data;
      
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener viaje');
    }

   
  }

  static async deleteTrip(token, id ) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      
    };
    
    try {
      //console.log(`${BASE_URL}/${id}`, profileData, config)
      const response = await axios.delete(`${BASE_URL}/${id}`, config);
      
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar viaje');
    }
  }
}

export default DeleteTripApiRest;