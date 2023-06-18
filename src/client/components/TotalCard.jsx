import React from "react";
import { Typography, Grid, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TotalCard = ({ selectedSeats, price }) => {
  let total = 0;

  const handleSubmit = () => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  };

  Object.values(selectedSeats).map(
    (seat) => (total += price * (seat.price / 100 + 1))
  );

  return (
    <>
      {Object.values(selectedSeats).map((seat, seatIndex) => (
        <Grid key={seatIndex} item xs={6}>
          <Typography>
            Asiento {seat.seatNumber}: ${price * (seat.price / 100 + 1)}
          </Typography>
        </Grid>
      ))}

      <Divider variant="middle" />
      <Typography variant="h6" gutterBottom>
        Total de la compra: ${total}
      </Typography>
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/viaje-reserva">
          <Button variant="contained" onClick={handleSubmit}>
            Reservar Boletos
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default TotalCard;
