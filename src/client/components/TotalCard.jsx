import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Grid,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckIcon from "@mui/icons-material/Check";

import { encode } from "base-64";

import ReservaApiRest from "../services/ReserveApiRest";
import AlertDialogSlide from "./AlertDialog";

const TotalCard = ({ selectedSeats, price, tripData }) => {
  const [reserveIcon, setReserveIcon] = useState(<EventAvailableIcon />);
  const [reserveMessage, setReserveMessage] = useState("Reservar Asientos");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  let total = 0;

  const handleSubmit = () => {
    setReserveIcon(<CircularProgress size={24} />);
    setReserveMessage("Reservando...");

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    let reserveData = `${tripData.code},${tripData.price};`;

    Object.values(selectedSeats).map((seat, index) => {
      let seatTypeCode;
      if (seat.seatType === "Estándar") {
        seatTypeCode = "e";
      } else if (seat.seatType === "Salón Cama") {
        seatTypeCode = "s";
      } else if (seat.seatType === "Cama") {
        seatTypeCode = "c";
      } else {
        seatTypeCode = "e";
      }

      reserveData +=
        index +
        "," +
        seat.seatNumber +
        "," +
        seat.price +
        "," +
        seatTypeCode +
        ";";
    });

    localStorage.setItem("sessionToken", encode(reserveData));

    let seatList = [];
    Object.values(selectedSeats).map((seat) => seatList.push(seat.id));

    ReservaApiRest.reserveSeat(
      tripData.id,
      seatList,
      encode(reserveData).substring(0, 50)
    )
      .then((response) => {
        setReserveIcon(<CheckIcon />);
        setReserveMessage("Redireccionando...");
        navigate(
          `/viaje-reserva?reserve=${encodeURIComponent(encode(reserveData))}`
        );
      })
      .catch((error) => {
        setReserveIcon(<EventAvailableIcon />);
        setReserveMessage("Reservar Asientos");
        setShowAlert(true);
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
            Asiento {seat.seatNumber}: $
            {(price * (seat.price / 100 + 1))
              .toLocaleString()
              .replace(/,/g, ".")}
          </Typography>
        </Grid>
      ))}

      <Divider variant="middle" />
      <Typography variant="h6" gutterBottom>
        Total de la compra: ${total.toLocaleString().replace(/,/g, ".")}
      </Typography>
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={reserveIcon}
        >
          {reserveMessage}
        </Button>
      </Grid>
      {showAlert && (
        <AlertDialogSlide
          title="Ups!"
          text="Parece que su asiento ya fue reservado por otra persona. Por favor, seleccione otro asiento."
          button="Ok"
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default TotalCard;
