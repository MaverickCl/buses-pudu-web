import React from "react";
import { Typography, Grid, IconButton, Zoom, Divider } from "@mui/material";
import Seat from "./Seat";

const SeatSelection = ({ selectedSeats, setCurrentSeat, currentSeat }) => {
  return (
    <div>
      <Divider
        variant="middle"
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      />
      <Typography variant="h6" gutterBottom>
        Sillas Seleccionadas
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent={selectedSeats.length === 4 && "space-between"}
      >
        {Object.values(selectedSeats).map((seat, seatIndex) => (
          <Grid
            key={seatIndex}
            item
            xs={2.4}
            display="flex"
            justifyContent="center"
          >
            <Zoom in>
              <IconButton
                style={{
                  position: "relative",
                  color: "black",
                }}
                onClick={() => {
                  setCurrentSeat(seat);
                }}
              >
                <Seat
                  style={{
                    height: "3rem",
                  }}
                  color={
                    currentSeat.seatNumber === seat.seatNumber
                      ? "#0e7eed"
                      : "#000000"
                  }
                />

                <span
                  style={{
                    position: "absolute",
                    marginBottom: "-.5rem",
                    fontSize: "1.25rem",
                  }}
                >
                  {seat.seatNumber}
                </span>
              </IconButton>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SeatSelection;
