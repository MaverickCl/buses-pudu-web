import axios from "axios";

//const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/'; 
const base = 'http://localhost:8080/'; 

export const Apiurl = base;

export async function register(
  nombre,
  rut,
  contacto,
  fechaNacimiento,
  correo,
  contrasenia,
  estadoTne
) {
  try {
    const response = await axios
      .post(
        `${Apiurl}api/autentificacion/crear`,
        {
          nombre,
          contrasenia,
          correo,
          rut,
          contacto,
          fechaNacimiento,
          estadoTne,
          rolesEnum: ["usuario", "cliente"],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
    return console.log("registrado");
    //return response.data;
  } catch (error) {
    console.log(error);
  }
}
