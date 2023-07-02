import axios from "axios";

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

const BASE_URL = base+"api/adquisicion";

class ReservaApiRest {
  static async reserveSeat(trip, seats, token) {
    const reservaDTO = {
      idViaje: trip,
      id_asientos: seats,
      token: token,
      correo: localStorage.getItem("user"),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/viaje/${trip}/reservar`,
        reservaDTO
        // {
        //headers: {
        //  Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
        //}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ReservaApiRest;
