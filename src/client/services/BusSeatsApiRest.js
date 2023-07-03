import axios from "axios";

//const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
const base = 'http://localhost:8080/'; 

const BASE_URL = base; // Replace with your API base URL

class BusSeatsApiRest {
  static async getBusSeats(code) {
    try {
      const response = await axios.get(`${BASE_URL}api/viajes/${code}`);

      //TRANSFORM DATA TO MATCH FORMAT

      let seats = response.data.asientos.sort((a, b) => a.id - b.id);

      let floor1 = [];
      let floor2 = [];

      for (let i = 0; i < seats.length; i++) {
        let floor = seats[i].segundoPiso ? 2 : 1;

        if (floor === 1) {
          floor1.push(seats[i]);
        } else if (floor === 2) {
          floor2.push(seats[i]);
        }
      }

      let floors = {};

      if (floor2.length === 0) {
        floors = { floors: [{ seats: floor1 }] };
      } else {
        floors = { floors: [{ seats: floor1 }, { seats: floor2 }] };
      }

      return floors;
    } catch (error) {
      throw error;
    }
  }
}

export default BusSeatsApiRest;
