import { DataGrid } from '@mui/x-data-grid';
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersApiRest from '../services/UsersApiRest';




const columns = [
  { field: 'rut', headerName: 'Rut', width: 110 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'correo', headerName: 'Correo' , width: 130 },
  { field: 'contacto',headerName: 'Contacto', sortable: false, width: 130,},
  { field: 'puntos', headerName: 'Puntos', width: 130 },

];
const DashBoard = () =>{

    const [data, setData] = React.useState([]);

    const navigate = useNavigate([]);

    React.useEffect(() =>{
        const token = localStorage.getItem("token");

        if (!token) {
        navigate("/auth/login");
        return;
        }
        UsersApiRest.getUsers(token)
        .then((response)=>{
            setData(response.content);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default DashBoard;