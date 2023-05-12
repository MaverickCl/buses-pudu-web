import axios from "axios";
export const Apiurl = "http://localhost:8080/";


export async function register(nombre,rut,contacto,fecha_nacimiento,correo,contrasenia) {
  try {
    const response = await axios.post(
      `${Apiurl}api/autentificacion/crear`,
      {
        nombre,
        contrasenia,
        correo,
        rut,
        contacto,
        fecha_nacimiento,
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