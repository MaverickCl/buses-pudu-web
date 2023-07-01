import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as React from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import UsersApiRest from '../services/UsersApiRest';

import { Container, CssBaseline, Grid } from '@mui/material';
import TripsApiRest from '../services/TripsApiRest';

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

  { field: 'destino', headerName: 'Destino', width: 110 },
  { field: 'origen', headerName: 'Origen', width: 130 },
  { field: 'horaSalida', headerName: 'Hora de salida' , width: 130 },
  { field: 'horaLlegada', headerName: 'Fecha' , width: 130 },
  { field: 'precio', headerName: 'Precio' , width: 130 },
  { field: 'codigo',headerName: 'Codigo de viaje', width: 130,},
  /* { field: '', headerName: 'Estado', width: 130 }, */
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
    TripsApiRest.getTrips(token)
        .then((response)=>{
            
            setData(response);
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

