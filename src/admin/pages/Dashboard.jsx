import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as React from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import UsersApiRest from '../services/UsersApiRest';
import EditApiRest from '../services/EditApiRest';

function RenderButton(props) {
  const { value } = props;

  const handleButtonClick = () => {
    
    
    console.log(value);
  };

  return (
    <strong>
      <Link
        component="button"
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        to={`/admin/edit/?id=${value}`}
        onClick={handleButtonClick}
      >
        Editar
      </Link>
    </strong>
  );
}

RenderButton.propTypes = {
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  field: PropTypes.number,
}


const columns = [
  { field: 'rut', headerName: 'Rut', width: 110 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'correo', headerName: 'Correo' , width: 130 },
  { field: 'contacto',headerName: 'Contacto', sortable: false, width: 130,},
  { field: 'puntos', headerName: 'Puntos', width: 130 },
  { field: 'puntos', headerName: 'Puntos', width: 130,},
  { field: 'id',headerName:'', renderCell: RenderButton }

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