import axios from "axios";

//const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
const base = 'http://localhost:8080/'; 

export const Apiurl = base;


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