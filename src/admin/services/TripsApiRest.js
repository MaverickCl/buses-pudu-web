import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/viajes/todo';

class TripsApiRest {
    static async getTrips(token) {
       const config = {   
        headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios.get(`${BASE_URL}`, config);
            
            return response.data;
            } catch (error) {
                console.error(error);
                throw new Error('Error al verificar admin');
            }
        }
} 

export default TripsApiRest;