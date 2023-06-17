import React from "react";
import { Typography } from "@mui/material";

const MappedSeats = ({ currentSeat, price }) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        Asiento N°: {typeof currentSeat === "object" && currentSeat.seatNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tipo de Asiento:{" "}
        {typeof currentSeat === "object" && currentSeat.seatType}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Precio: $
        {typeof currentSeat === "object" &&
          price * (currentSeat.price / 100 + 1)}
      </Typography>
    </div>
  );
};

export default MappedSeats;
