import React, { useState } from "react";
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

const TicketPage = () => {
  const [selectedSeats, setSelectedSeats] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [passengers, setPassengers] = useState({});
  const [loading, setLoading] = useState(localStorage.getItem("token"));

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleSubmit = (event) => {
    // go to payment page.
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
                    Precio: $100
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
