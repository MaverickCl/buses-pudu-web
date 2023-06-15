import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import LoggedPassengerSelection from "../components/LoggedPassengerSelection";
import PassengersInput from "../components/PassengersInput";
import PaymentApiRest from "../services/PaymentApiRest";

const TicketPage = () => {
  const [selectedSeats, setSelectedSeats] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [passengers, setPassengers] = useState({});
  const [loading, setLoading] = useState(localStorage.getItem("token"));
  const [price, setPrice] = useState(0);
  const [tneDiscount, setTneDiscount] = useState([1,1,1,1,1]);

  useEffect(() => {
    let total = 0;
    const tripPrice = JSON.parse(localStorage.getItem("trip")).precio;
    Object.values(selectedSeats).map((seat, index) => (total += tneDiscount[index]*tripPrice*((seat.price/100)+1)));

    setPrice(total);
  }, [tneDiscount]);

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleSubmit = (event) => {
    //FIX TOTAL TO MATCH DOCUMENTATION
    let total = 0;
    Object.values(selectedSeats).map(
      (seat) =>
        (total +=
          JSON.parse(localStorage.getItem("trip")).precio *
          (1 + seat.price / 100))
    );

    //DO FOR EACH PASSENGER

    let pasajero = {
      nombre: Object.values(passengers)[0].name,
      correo: Object.values(passengers)[0].email,
      rut: Object.values(passengers)[0].rut,
      contacto: Object.values(passengers)[0].phone,
    };

    let paymentData = {
      pasajero: pasajero,
      servicio: Object.values(selectedSeats)[0].seatType,
      numeroAsiento: Object.values(selectedSeats)[0].seatNumber,
      codigoViaje: JSON.parse(localStorage.getItem("trip")).codigo,
      montoBruto: total,
    };

    handlePayment(paymentData);
  };

  const handlePayment = async (paymentData) => {
    await PaymentApiRest.postPayment(paymentData)
      .then((response) => {
        const redirectUrl = `${response.url}?token_ws=${response.token}`;

        window.location.href = redirectUrl;
      })
      .catch((error) => {
        // setIsVerifying(false);
        // setTitle("Algo salió mal, intenta más tarde");
        // setMessage(error.response.data);
      });
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar postion="absolute" />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        marginTop={isPortrait ? 10 : 12}
      >
        <Container>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              display: "flex",
            }}
            spacing={2}
          >
            <Grid item xs={12} md={6}>
              <PassengersInput
                seats={selectedSeats}
                passengers={passengers}
                setPassengers={setPassengers}
                loading={loading}
                setTneDiscount={setTneDiscount}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  backgroundColor: "#efefef",
                  marginBottom: 5,
                }}
              >
                <Grid container padding={2} flexDirection="column">
                  <Typography variant="h4" align="center" gutterBottom>
                    Compra de Pasajes
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Precio: ${price}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Pasajeros:
                  </Typography>

                  {Object.values(passengers).map((passengers, index) => {
                    return (
                      <Typography key={index} variant="h7" gutterBottom>
                        {passengers.name}
                      </Typography>
                    );
                  })}
                  <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      disabled={
                        !(
                          Object.values(passengers).length ===
                          Object.values(selectedSeats).length
                        )
                      }
                    >
                      Proceder al Pago
                    </Button>
                
                  </Grid>
                </Grid>
              </Paper>
              {localStorage.getItem("token") && (
                <Grid item xs={12} mt={2}>
                  <LoggedPassengerSelection
                    passengers={passengers}
                    setPassengers={setPassengers}
                    setLoading={setLoading}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </CssBaseline>
  );
};

export default TicketPage;
