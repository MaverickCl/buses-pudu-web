import axios from "axios";
export const Apiurl = "http://localhost:8080/";


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