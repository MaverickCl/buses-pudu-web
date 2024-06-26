import React from "react";
import { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import Bus from "../components/Bus";
import MappedSeats from "../components/MappedSeats";
import SeatSelection from "../components/SeatSelection";
import TotalCard from "../components/TotalCard";

const TripPage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [selectedSeats, setSelectedSeats] = useState({});
  const [tripData, setTripData] = useState(null);
  const [currentSeat, setCurrentSeat] = useState({});

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const tripCode = urlParams.get("code");

  if (!tripData) {
    const trip = JSON.parse(localStorage.getItem("trip"));

    setTripData({
      origin: trip.origin,
      destination: trip.destination,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      price: trip.price,
      date: trip.date,
      id: trip.id,
    });

    return null;
  }

  const { origin, destination, departureTime, price } = tripData;

  const seatHandler = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      const updatedSelectedSeats = { ...prevSelectedSeats };

      if (seat.status === "SELECTED") {
        updatedSelectedSeats[`${seat.seatNumber}`] = seat;
        setCurrentSeat(seat);
      } else if (seat.status === "FREE") {
        delete updatedSelectedSeats[`${seat.seatNumber}`];
        {
          currentSeat.seatNumber === seat.seatNumber &&
            setCurrentSeat(Object.values(updatedSelectedSeats)[0]);
        }
      }

      return updatedSelectedSeats;
    });
  };

  return (
    <>
      <ResponsiveAppBar position="absolute" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        marginTop={isPortrait ? 10 : 12}
      >
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: "#efefef" }}>
                <Typography variant="h6" gutterBottom>
                  Detalles del Viaje
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Salida: {origin}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Llegada: {destination}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Hora de salida: {departureTime}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Precio aprox: ${price.toLocaleString().replace(/,/g, ".")}
                </Typography>
              </Paper>
              <Collapse in={Object.keys(selectedSeats).length > 0}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}
                >
                  <Typography variant="h6" gutterBottom>
                    Detalles del Asiento
                  </Typography>

                  <Divider sx={{ mt: -1, mb: 1 }} />
                  <MappedSeats currentSeat={currentSeat} price={price} />

                  <Collapse in={Object.keys(selectedSeats).length > 1}>
                    <SeatSelection
                      currentSeat={currentSeat}
                      setCurrentSeat={setCurrentSeat}
                      selectedSeats={selectedSeats}
                    />
                  </Collapse>
                </Paper>
              </Collapse>

              <Collapse in={Object.keys(selectedSeats).length > 0}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}
                >
                  <TotalCard
                    selectedSeats={selectedSeats}
                    price={price}
                    tripData={{
                      code: tripCode,
                      price: tripData.price,
                      id: tripData.id,
                    }}
                  />
                </Paper>
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Selecciona tu asiento
                </Typography>
                <Grid container>
                  <Bus seatHandler={seatHandler} trip={tripCode} />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default TripPage;
