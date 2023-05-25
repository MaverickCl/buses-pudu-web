import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/admin/crear'



export async function addUser(token,nombre,rut,contacto,fechaNacimiento,correo,contrasenia,rol ){

    const config = {
    
        headers: { Authorization: `Bearer ${token}` },
    
    };
console.log({nombre,rut,contacto,fechaNacimiento,correo,contrasenia,rol})
    try {
        
        const response = await axios.post(`${BASE_URL}`,
        {
          nombre,
          contrasenia,
          correo,
          rut,
          contacto,
          fechaNacimiento,
          rolesEnum:[
            "usuario",
            rol
          ]
        
        }, config).then(response =>{
          console.log(response);
       })

       return console.log("registrado")

      } catch (error) {
        console.error(error);
        throw new Error('Error al crear usuario');
      }
        
    }

