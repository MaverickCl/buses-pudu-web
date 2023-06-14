import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your API base URL

class BusSeatsApiRest {
  static async getBusSeats(busId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/bus/${busId}/seats`);
      return response.data;
    } catch (error) {
      return {
        floors: [
          {
            seats: [
              {
                seatNumber: "01",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "02",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "03",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "04",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "05",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "06",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "07",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },
              {
                seatNumber: "08",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "09",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "10",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "11",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "12",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },
              {
                seatNumber: "13",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "14",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "15",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "16",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },
              {
                seatNumber: "17",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "18",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "19",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "20",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "21",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "22",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "23",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "24",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "25",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              { seatNumber: "", status: "EMPTY", type: "Vacío" },
              { seatNumber: "", status: "HALL", type: "Pasillo" },
              { seatNumber: "", status: "EMPTY", type: "Vacío" },
              { seatNumber: "", status: "EMPTY", type: "Vacío" },
              // ...
            ],
          },
          {
            seats: [
              {
                seatNumber: "26",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "27",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "28",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "29",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "30",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "31",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "32",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },
              {
                seatNumber: "33",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "34",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "35",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "36",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },
              {
                seatNumber: "37",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "38",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "39",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "40",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "41",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "42",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },
              {
                seatNumber: "43",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "44",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "45",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "46",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              {
                seatNumber: "47",
                status: "RESERVED",
                seatType: "Ejecutivo",
                price: 120,
                type: "Asiento",
              },

              { seatNumber: "", status: "HALL", type: "Pasillo" },

              {
                seatNumber: "48",
                status: "FREE",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
              {
                seatNumber: "49",
                status: "FREE",
                seatType: "Semicama",
                price: 80,
                type: "Asiento",
              },
              { seatNumber: "", status: "EMPTY", type: "Vacío" },
              { seatNumber: "", status: "EMPTY", type: "Vacío" },
              { seatNumber: "", status: "HALL", type: "Pasillo" },
              { seatNumber: "", status: "EMPTY", type: "Vacío" },
              {
                seatNumber: "50",
                status: "BLOCKED",
                seatType: "Cama",
                price: 100,
                type: "Asiento",
              },
            ],
          },
        ],
      };
      // END MOCK DATA

      //throw error;
    }
  }
}

export default BusSeatsApiRest;
