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
          [
            [
              { seatNumber: "01", status: "BLOCKED", type: "Cama", price: 100 },
              {
                seatNumber: "02",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },

              { seatNumber: "", status: "" },

              { seatNumber: "03", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "04", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "05", status: "BLOCKED", type: "Cama", price: 100 },
              { seatNumber: "06", status: "FREE", type: "Semicama", price: 80 },

              { seatNumber: "", status: "" },

              {
                seatNumber: "07",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },
              { seatNumber: "08", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "09", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "10", status: "BLOCKED", type: "Cama", price: 100 },

              { seatNumber: "", status: "" },

              { seatNumber: "11", status: "FREE", type: "Cama", price: 100 },
              {
                seatNumber: "12",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },
              { seatNumber: "13", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "14", status: "FREE", type: "Cama", price: 100 },

              { seatNumber: "", status: "" },

              { seatNumber: "15", status: "BLOCKED", type: "Cama", price: 100 },
              {
                seatNumber: "16",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },
              { seatNumber: "17", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "18", status: "FREE", type: "Cama", price: 100 },

              { seatNumber: "", status: "" },

              { seatNumber: "19", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "20", status: "BLOCKED", type: "Cama", price: 100 },
              { seatNumber: "21", status: "BLOCKED", type: "Cama", price: 100 },
              {
                seatNumber: "22",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },

              { seatNumber: "", status: "" },

              { seatNumber: "23", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "24", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "25", status: "BLOCKED", type: "Cama", price: 100 },
              { seatNumber: "", status: "" },
              { seatNumber: "", status: "" },
              { seatNumber: "", status: "" },
              { seatNumber: "", status: "" },
              // ...
            ],
          ],

          [
            [
              { seatNumber: "26", status: "FREE", type: "Semicama", price: 80 },
              {
                seatNumber: "27",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },

              { seatNumber: "", status: "" },

              { seatNumber: "28", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "29", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "30", status: "BLOCKED", type: "Cama", price: 100 },
              { seatNumber: "31", status: "FREE", type: "Cama", price: 100 },

              { seatNumber: "", status: "" },

              {
                seatNumber: "32",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },
              { seatNumber: "33", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "34", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "35", status: "BLOCKED", type: "Cama", price: 100 },

              { seatNumber: "", status: "" },

              {
                seatNumber: "36",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },
              { seatNumber: "37", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "38", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "39", status: "FREE", type: "Semicama", price: 80 },

              { seatNumber: "", status: "" },

              { seatNumber: "40", status: "BLOCKED", type: "Cama", price: 100 },
              { seatNumber: "41", status: "BLOCKED", type: "Cama", price: 100 },
              {
                seatNumber: "42",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },
              { seatNumber: "43", status: "FREE", type: "Semicama", price: 80 },

              { seatNumber: "", status: "" },

              { seatNumber: "44", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "45", status: "BLOCKED", type: "Cama", price: 100 },
              { seatNumber: "46", status: "FREE", type: "Semicama", price: 80 },
              {
                seatNumber: "47",
                status: "RESERVED",
                type: "Ejecutivo",
                price: 120,
              },

              { seatNumber: "", status: "" },

              { seatNumber: "48", status: "FREE", type: "Cama", price: 100 },
              { seatNumber: "49", status: "FREE", type: "Semicama", price: 80 },
              { seatNumber: "", status: "" },
              { seatNumber: "", status: "" },
              { seatNumber: "", status: "" },
              { seatNumber: "", status: "" },
              { seatNumber: "50", status: "BLOCKED", type: "Cama", price: 100 },
            ],
          ],
        ],
      };
      // END MOCK DATA

      //throw error;
    }
  }
}

export default BusSeatsApiRest;
