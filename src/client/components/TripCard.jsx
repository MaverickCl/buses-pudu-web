import React from "react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip }) => {
  const { origen, destino, horaSalida, horaLlegada, precio, fecha } = trip;

  const navigate = useNavigate();

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleSubmit = (event) => {
    event.preventDefault();

    const tripData = {
      origin: origen,
      destination: destino,
      departureTime: horaSalida,
      arrivalTime: horaLlegada,
      price: precio,
      date: fecha,
      id: trip.id,
    };

    localStorage.setItem("trip", JSON.stringify(tripData));

    navigate(`/viaje?code=${trip.codigo}`);
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
              Fecha: {fecha}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Salida: {horaSalida} | Llegada: {horaLlegada}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Desde:</Typography>
            <Typography variant="h4" component="h3">
              ${precio}
            </Typography>
            {!isPortrait && (
              <Button onClick={handleSubmit} variant="contained">
                Seleccionar Asiento
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isPortrait && (
            <Button
              onClick={handleSubmit}
              sx={{ width: "100%", marginTop: 1 }}
              variant="contained"
            >
              Seleccionar Asiento
            </Button>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TripCard;
