import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  IconButton,
  Collapse,
  Zoom,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import Bus from "../components/Bus";
import Seat from "../components/Seat";

const TripPage = () => {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [tripData, setTripData] = useState(null);
  const [currentSeat, setCurrentSeat] = useState({});

  //   useEffect(() => {
  //     // Simulating API call to fetch trip data
  //     // Replace this with your actual API call
  //     const fetchTripData = async () => {
  //       // Assuming you're fetching the JSON from an API endpoint
  //       const response = await fetch("https://api.example.com/trips/1");
  //       const data = await response.json();
  //       setTripData(data);
  //     };

  //     fetchTripData();
  //   }, []);

  if (!tripData) {
    // Show loading indicator or return null while fetching data

    //TEST DATA

    setTripData({
      id: 1,
      origin: "New York",
      destination: "Los Angeles",
      departureTime: "10:00 AM",
      arrivalTime: "12:30 PM",
      price: 250,
      date: "15-05-2023",
    });

    //ENDTEST DATA

    return null;
  }

  const { origin, destination, departureTime, price } = tripData;

  const seatHandler = (seat) => {
    //const allSeats = [...selectedSeats, ...allSeats];

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

  const MappedSeats = () => {
    return (
      <div>
        <Typography variant="body1" gutterBottom>
          Asiento N°:{" "}
          {typeof currentSeat === "object" && currentSeat.seatNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tipo de Asiento: {typeof currentSeat === "object" && currentSeat.type}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Precio: ${typeof currentSeat === "object" && currentSeat.price}
        </Typography>
      </div>
    );
  };

  const SeatSelection = () => {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Sillas Seleccionadas
        </Typography>
        <Grid container direction="row" alignItems="center">
          {Object.values(selectedSeats).map((seat, seatIndex) => (
            <Grid key={seatIndex} item xs={2.3}>
              <Zoom in={true}>
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

  return (
    <>
      <ResponsiveAppBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        marginTop="5rem"
        marginBottom="5rem"
      >
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, m: 2 }}>
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
                  precio aprox: ${price}
                </Typography>
              </Paper>
              <Collapse in={Object.keys(selectedSeats).length > 0}>
                <Paper elevation={3} sx={{ p: 2, m: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Detalles del Asiento
                  </Typography>
                  <MappedSeats />
                  <Collapse in={Object.keys(selectedSeats).length > 1}>
                    <SeatSelection />
                  </Collapse>
                </Paper>
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Selecciona tu asiento
                </Typography>
                <Grid container spacing={1}>
                  <Bus seatHandler={seatHandler} />
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
