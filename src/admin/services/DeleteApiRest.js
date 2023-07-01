import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

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