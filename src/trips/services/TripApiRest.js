import axios from "axios";

const base='http://localhost:8080/';

const apiEndpoint = base+"api/viajes";

class TripApiRest {
  static async createTrip(trip, token) {
    const viajeDTO = {
      origen: trip.origin,
      destino: trip.destination,
      distancia: trip.distance,
      fecha:
        trip.departureDate.split("-")[2] +
        "-" +
        trip.departureDate.split("-")[1] +
        "-" +
        trip.departureDate.split("-")[0],
      horaSalida: trip.departureTime,
      horaLlegada: trip.arrivalTime,
      bus: trip.bus,
      conductor: trip.driver,
      precio: trip.price,
      codigo: Math.floor(Math.random() * (10000 - 99999 + 1) + 10000),
    };

    console.log(viajeDTO);

    try {
      const response = await axios.post(`${apiEndpoint}/crear`, viajeDTO, {
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

export default TripApiRest;
