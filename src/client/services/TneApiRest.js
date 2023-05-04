import axios from "axios";
export const Apiurl = "http://localhost:8080/";


export async function validateTne(rut) {
  try {
    const response = await axios.get(
      `${Apiurl}api/validartne/${rut}`,
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