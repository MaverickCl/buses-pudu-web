import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


export async function validateTne(rut) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/validartne/${rut}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("RUT "+rut+" revisado")
    return response.data;
  } catch (error) {
    console.log(error);
  }
}