import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const Preview = ({ trip }) => {
  const { origen, destino, horaSalida, horaLlegada, precio, fecha } = trip;

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("trip", JSON.stringify(trip));

    window.location.href = "/viaje";
  };



  return (
    <Card
    style={{
      backgroundColor: "#f8f8f8",
      marginBottom: 5,
    }}
  >
    <CardContent sx={{ margin: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h6" component="h2">
     
            {origen} - {destino}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {fecha}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Salida: {horaSalida}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          
          {!isPortrait && (
            <Button /* onClick={handleSubmit} */ variant="contained">
              Ver mas detalles
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {isPortrait && (
          <Button
            /* onClick={handleSubmit} */
            sx={{ width: "100%", marginTop: 1 }}
            variant="contained"
          >
            Ver mas detalles
          </Button>
        )}
      </Grid>
    </CardContent>
  </Card>
  );}
  export default Preview;