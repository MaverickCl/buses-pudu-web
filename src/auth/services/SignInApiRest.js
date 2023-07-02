import axios from "axios";

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

export const Apiurl = base;


export async function login(correo,contrasenia) {
  try {
    const response = await axios.post(
      `${Apiurl}api/autentificacion/login`,
      {
        correo,
        contrasenia,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(response =>{
      return response.data;
    })
    console.log("autorizado")
    return response;
  } catch (error) {
    throw error;
  }
}