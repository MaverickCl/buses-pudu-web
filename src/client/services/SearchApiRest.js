import axios from "axios";

const API_BASE_URL = "http://localhost:8080/";


  

export const getTrips = async (origin, destination) => {
  const response = await axios.get(
    `${API_BASE_URL}/trips?origin=${origin}&destination=${destination}`
  );
  //return response.data;
  return trips;
};

//origin, destination, departureTime, arrivalTime, price
// Other API functions can be added here
