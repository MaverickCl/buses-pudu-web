import axios from 'axios';

const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';
const BASE_URL = base+'api/admin/usuarios';

class UsersApiRest {
    static async getUsers(token) {
       const config = {   
        headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios.get(`${BASE_URL}`, config);
            
            return response.data;
            } catch (error) {
                console.error(error);
                throw new Error('Error al verificar admin');
            }
        }
} 

export default UsersApiRest;