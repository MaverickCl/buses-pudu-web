import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/usuarios';

class UsersApiRest {
    static async getUsers(token) {
       const config = {   
        headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios.get(`${BASE_URL}`, config);
            console.log(response.data)
            return response.data;
            } catch (error) {
                console.error(error);
                throw new Error('Error al verificar admin');
            }
        }
} 

export default UsersApiRest;