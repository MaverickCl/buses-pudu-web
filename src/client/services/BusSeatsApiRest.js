import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your API base URL

class BusSeatsApiRest {
  static async getBusSeats(code) {
    try {
      const response = await axios.get(`${BASE_URL}/api/viajes/${code}`);
      //TRANSFORM DATA TO MATCH FORMAT

      let seats = response.data.bus.asientos;

      let floor1 = [];
      let floor2 = [];

      for (let i = 0; i < seats.length; i++) {
        let floor = seats[i].segundoPiso ? 2 : 1;

        let seat = seats[i].numero;
        let status =
          seats[i].estado == "Disponible"
            ? "FREE"
            : seats[i].estado == "Reservado"
            ? "RESERVED"
            : "BLOCKED";
        let seatType = seats[i].tipoAsiento;
        let price = seats[i].precio;
        let type = "Asiento";

        let seatObject = {
          seatNumber: seat,
          status: status,
          seatType: seatType,
          price: price,
          type: type,
        };

        if (floor === 1) {
          floor1.push(seatObject);
        } else if (floor === 2) {
          floor2.push(seatObject);
        }
      }

      let floors = { floors: [{ seats: floor1 }, { seats: floor2 }] };

      return floors;
    } catch (error) {
      throw error;
    }
  }
}

export default BusSeatsApiRest;
