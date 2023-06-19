import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import LoggedPassengerSelection from "../components/LoggedPassengerSelection";
import PassengersInput from "../components/PassengersInput";

import PaymentApiRest from "../services/PaymentApiRest";
import PuduDiscountButton from "../components/PuduDiscountButton";

const TicketPage = () => {
  const [selectedSeats, setSelectedSeats] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [passengers, setPassengers] = useState({});
  const [loading, setLoading] = useState(localStorage.getItem("token"));
  const [price, setPrice] = useState(0);
  const [discounts, setDiscounts] = useState({ tne: 0, points: 0 });
  const [tneDiscount, setTneDiscount] = useState([1, 1, 1, 1, 1]);
  const [paymentMessage, setPaymentMessage] = useState("Proceder al pago");
  const [paymentIcon, setPaymentIcon] = useState(<AttachMoneyIcon />);

  useEffect(() => {
    let total = 0;
    let discount = 0;
    const tripPrice = JSON.parse(localStorage.getItem("trip")).precio;
    Object.values(selectedSeats).map((seat, index) => {
      total += Math.floor(tripPrice * (seat.price / 100 + 1));
      discount += (1 - tneDiscount[index]) * tripPrice * (seat.price / 100 + 1);
    });

    setDiscounts((discounts) => ({
      ...discounts,
      tne: discount,
    }));
    setPrice(total);
  }, [tneDiscount]);

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleSubmit = (event) => {
    let ticketDto = [];

    Object.values(passengers).map((passenger, index) => {
      let pasajero = {
        nombre: passenger.name,
        correo: passenger.email,
        rut: passenger.rut,
        contacto: passenger.phone,
      };

      ticketDto.push({
        pasajero: pasajero,
        servicio: passenger.seatType,
        numeroAsiento: passenger.seatNumber,
        codigoViaje: JSON.parse(localStorage.getItem("trip")).codigo,
        montoBruto: Math.floor(
          tneDiscount[index] *
            JSON.parse(localStorage.getItem("trip")).precio *
            (Object.values(selectedSeats)[index].price / 100 + 1)
        ),
      });
    });

    handlePayment(ticketDto);
  };

  const handlePayment = async (paymentData) => {
    setPaymentMessage("Redireccionando a WebPay...");
    setPaymentIcon(<CircularProgress size={24} color="inherit" />);
    await PaymentApiRest.postPayment(paymentData)
      .then((response) => {
        const redirectUrl = `${response.url}?token_ws=${response.token}`;

        window.location.href = redirectUrl;
      })
      .catch((error) => {
        setPaymentMessage("Error al redireccionar a WebPay");
        setPaymentIcon(<ReportProblemIcon />);
        console.error(error);
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
              <Grid container justifyContent="flex-end">
                <PuduDiscountButton total={price} />
              </Grid>
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

                  {(discounts.tne > 0 || discounts.points > 0) && (
                    <Grid
                      container
                      justifyContent="space-between"
                      flexDirection="row"
                    >
                      <Typography variant="h6" gutterBottom>
                        Precio:
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        ${price}
                      </Typography>
                    </Grid>
                  )}
                  {discounts.tne > 0 && (
                    <Grid
                      container
                      justifyContent="space-between"
                      flexDirection="row"
                    >
                      <Typography variant="h7" gutterBottom>
                        Descuento TNE:
                      </Typography>
                      <Typography variant="h7" gutterBottom>
                        - ${discounts.tne}
                      </Typography>
                    </Grid>
                  )}
                  {discounts.points > 0 && (
                    <Grid
                      container
                      justifyContent="space-between"
                      flexDirection="row"
                    >
                      <Typography variant="h7" gutterBottom>
                        Descuento Puntos:
                      </Typography>
                      <Typography variant="h7" gutterBottom>
                        - ${discounts.points}
                      </Typography>
                    </Grid>
                  )}
                  <Divider />
                  <Grid
                    container
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Typography variant="h6" gutterBottom>
                      Total:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      ${price - discounts.tne - discounts.points}
                    </Typography>
                  </Grid>
                  <Typography variant="h6" gutterBottom>
                    Pasajeros:
                  </Typography>

                  {Object.values(passengers).map((passengers, index) => {
                    return (
                      <Typography
                        key={index}
                        variant="h7"
                        gutterBottom
                        style={{ marginLeft: 20 }}
                      >
                        - {passengers.name}
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
                      startIcon={paymentIcon}
                    >
                      {paymentMessage}
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
