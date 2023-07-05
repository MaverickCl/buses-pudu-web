import axios from "axios";
export const Apiurl =  import.meta.env.VITE_API_URL;


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