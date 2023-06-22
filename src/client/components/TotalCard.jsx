import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Divider, Button } from "@mui/material";
import { encode } from "base-64";
import ReservaApiRest from "../services/ReserveApiRest";

const TotalCard = ({ selectedSeats, price, tripData }) => {
  const navigate = useNavigate();
  let total = 0;

  const handleSubmit = () => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    let reserveData = `${tripData.code},${tripData.price};`;

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

    let seatList = [];
    Object.values(selectedSeats).map((seat) => seatList.push(seat.seatNumber));

    ReservaApiRest.reserveSeat(tripData.id, seatList, encode(reserveData))
      .then((response) => {
        console.log(response);
        navigate(
          `/viaje-reserva?reserve=${encodeURIComponent(encode(reserveData))}`
        );
      })
      .catch((error) => {
        console.error(error);
      });
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
