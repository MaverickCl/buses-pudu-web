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

  const TotalCard = () => {
    let total = 0;

    Object.values(selectedSeats).map((seat) => (total += seat.price));

    return (
      <>
        {Object.values(selectedSeats).map((seat, seatIndex) => (
          <Grid key={seatIndex} item xs={6}>
            <Zoom in={true}>
              <Typography>
                Asiento {seat.seatNumber}: ${seat.price}
              </Typography>
            </Zoom>
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
