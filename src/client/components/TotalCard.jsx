import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Divider, Button } from "@mui/material";
import { encode } from "base-64";

const TotalCard = ({ selectedSeats, price, tripData }) => {
  const navigate = useNavigate();
  let total = 0;

  const handleSubmit = () => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    let reserveData = `Tc=${tripData.code},Tp=${tripData.price};`;

    Object.values(selectedSeats).map(
      (seat, index) =>
        (reserveData +=
          index +
          "," +
          seat.seatNumber +
          "," +
          seat.price +
          "," +
          seat.seatType +
          ";")
    );

    localStorage.setItem("sessionToken", encode(reserveData));

    //reserveSeats(selectedSeats,sessionToken,trip).then((response) => {
    //  console.log(response);
    navigate(
      `/viaje-reserva?reserve=${encodeURIComponent(encode(reserveData))}`
    );
    //}).catch((error) => {
    //  console.log(error);
    //});
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
        <Button variant="contained" onClick={handleSubmit}>
          Reservar Boletos
        </Button>
      </Grid>
    </>
  );
};

export default TotalCard;
