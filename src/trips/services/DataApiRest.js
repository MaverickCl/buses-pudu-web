import axios from "axios";

//const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
const base = 'http://localhost:8080/'; 

const API_URL = base+"api";

export default class DataApiRest {
  static async fetchBuses(token) {
    try {
      const response = await axios.get(`${API_URL}/bus/listado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.content;
    } catch (error) {
      throw error;
    }
  }

  static async fetchDrivers(token) {
    try {
      const response = await axios.get(`${API_URL}/admin/conductores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
