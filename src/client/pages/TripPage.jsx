import React from "react";
import { useEffect, useState, isPortrait } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  IconButton,
  Collapse,
  Zoom,
  Divider,
  Button,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import Bus from "../components/Bus";
import Seat from "../components/Seat";
import { Link } from "react-router-dom";

const TripPage = () => {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [tripData, setTripData] = useState(null);
  const [currentSeat, setCurrentSeat] = useState({});

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  if (!tripData) {

    const trip = JSON.parse(localStorage.getItem("trip"));

    setTripData({
      code: trip.codigo,
      id: trip.id,
      origin: trip.origen,
      destination: trip.destino,
      departureTime: trip.horaSalida,
      arrivalTime: trip.horaLlegada,
      price: trip.precio,
      date: trip.fecha,
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

  const handleSubmit = () => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  };

  const MappedSeats = () => {
    return (
      <div>
        <Typography variant="body1" gutterBottom>
          Asiento N°:{" "}
          {typeof currentSeat === "object" && currentSeat.seatNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tipo de Asiento:{" "}
          {typeof currentSeat === "object" && currentSeat.seatType}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Precio: ${typeof currentSeat === "object" && price*((currentSeat.price/100)+1)}
        </Typography>
      </div>
    );
  };

  const SeatSelection = () => {
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

  const TotalCard = () => {
    let total = 0;

    Object.values(selectedSeats).map((seat) => (total += price*((seat.price/100)+1)));

    return (
      <>
        {Object.values(selectedSeats).map((seat, seatIndex) => (
          <Grid key={seatIndex} item xs={6}>
            <Typography>
              Asiento {seat.seatNumber}: ${price*((seat.price/100)+1)}
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
                  Precio aprox: ${price}
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
                  <MappedSeats />
                  <Collapse in={Object.keys(selectedSeats).length > 1}>
                    <SeatSelection />
                  </Collapse>
                </Paper>
              </Collapse>

              <Collapse in={Object.keys(selectedSeats).length > 0}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}
                >
                  <TotalCard />
                </Paper>
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Selecciona tu asiento
                </Typography>
                <Grid container>
                  <Bus seatHandler={seatHandler} trip={tripData.code} />
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
