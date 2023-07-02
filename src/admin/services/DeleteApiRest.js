import axios from 'axios';
const base = 'https://busespudu-backend-1aedcfd38ca3.herokuapp.com/';

const BASE_URL = base+'api/admin';

class DeleteApiRest {
    static async deleteUser(token,id) {
       const config = {   
        headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios.delete(`${BASE_URL}/${id}`, config);
            
            return response.data;
            } catch (error) {
                console.error(error);
                throw new Error('Error al eliminar usuario');
            }
        }
} 

export default DeleteApiRest;