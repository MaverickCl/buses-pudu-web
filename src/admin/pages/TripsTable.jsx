import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as React from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import UsersApiRest from '../services/UsersApiRest';

import { Container, CssBaseline, Grid } from '@mui/material';

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

  { field: 'rut', headerName: 'Destino', width: 110 },
  { field: 'nombre', headerName: 'Origen', width: 130 },
  { field: '', headerName: 'Hora de salida' , width: 130 },
  { field: 'contacto',headerName: 'Hora de llegada', sortable: false, width: 130,},
  { field: 'puntos', headerName: 'Estado', width: 130 },
  { field: 'estadoCuenta', headerName: 'Estado', width: 130 },
  { field: 'id',headerName:'', renderCell: RenderButton }

];
export const TripsTable = () =>{

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
    <CssBaseline>
      
    <Grid container>
    <Container
/*         maxWidth="sm"
        sx={{ display: "flex", alignItems: "center",justifyContent:"center" }} */ >
    <div style={{ justifyContent:"center"}}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>
    
    </Container>
    </Grid>
    </CssBaseline>
  );
};

