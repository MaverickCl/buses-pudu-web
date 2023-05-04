import axios from "axios";
export const Apiurl = "http://localhost:8080/";


export async function register(nombre,rut,contacto,correo,contrasenia) {
  try {
    const response = await axios.post(
      `${Apiurl}api/autentificacion/crear`,
      {
        nombre,
        contrasenia,
        correo,
        rut,
        contacto,
        rolesEnum: [
          "usuario",
          "cliente"
     ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(response =>{
       console.log(response);
    })
    return console.log("registrado")
    //return response.data;
  } catch (error) {
    console.log(error);
  }
}