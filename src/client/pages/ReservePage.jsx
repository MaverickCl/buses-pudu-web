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
import { decode } from "base-64";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import LoggedPassengerSelection from "../components/LoggedPassengerSelection";
import PassengersInput from "../components/PassengersInput";

import PaymentApiRest from "../services/PaymentApiRest";
import PuduDiscountButton from "../components/PuduDiscountButton";

const TicketPage = () => {
  const token = localStorage.getItem("token");
  const [tripData, setTripData] = useState({});

  const [selectedSeats, setSelectedSeats] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [passengers, setPassengers] = useState({});
  const [loading, setLoading] = useState(token);
  const [price, setPrice] = useState(0);
  const [discounts, setDiscounts] = useState({ tne: 0, points: 0 });
  const [tneDiscount, setTneDiscount] = useState([1, 1, 1, 1, 1]);
  const [paymentMessage, setPaymentMessage] = useState("Proceder al pago");
  const [paymentIcon, setPaymentIcon] = useState(<AttachMoneyIcon />);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let encryptedData = urlParams.get("reserve");

    let decryptedData = decode(decodeURIComponent(encryptedData));

    setTripData({
      code: decryptedData.split(";")[0].split(",")[0],
      price: decryptedData.split(";")[0].split(",")[1],
    });

    if (!selectedSeats) {
      let seats = {};

      decryptedData.split(";").map((seat, index) => {
        if (index !== 0 && seat !== "") {
          let seatData = seat.split(",");
          let seatType;

          switch (seatData[3]) {
            case "e":
              seatType = "Estándar";
              break;
            case "s":
              seatType = "Salón Cama";
              break;
            case "c":
              seatType = "Cama";
              break;
            default:
              seatType = ""; // Handle the case when seatType doesn't match any expected values
          }

          seats[seatData[0]] = {
            seatNumber: seatData[1],
            price: seatData[2],
            seatType: seatType,
          };
        }
      });
      setSelectedSeats(seats);
    }
  }, []);

  useEffect(() => {
    let total = 0;
    let discount = 0;
    const tripPrice = tripData.price;
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
    let boletoDTOS = [];

    Object.values(passengers).map((passenger, index) => {
      let pasajero = {
        nombre: passenger.name,
        correo: passenger.email,
        rut: passenger.rut,
        contacto: passenger.phone,
      };

      boletoDTOS.push({
        pasajero: pasajero,
        aplicaTne: tneDiscount[index] !== 1,
        servicio: Object.values(selectedSeats)[index].seatType,
        numeroAsiento: Object.values(selectedSeats)[index].seatNumber,
        codigoViaje: tripData.code,
        montoBruto: Math.floor(
          tripData.price * (Object.values(selectedSeats)[index].price / 100 + 1)
        ),
      });
    });

    let ticketDto = {
      montoTotal: price - discounts.points - discounts.tne, //Price after discounts.
      descuentoPudu: discounts.points,
      tokenReservaConfirmacion: localStorage
        .getItem("sessionToken")
        .substring(0, 60),
      boletoDTOS: boletoDTOS,
    };

    handlePayment(ticketDto);
  };

  const handlePayment = async (paymentData) => {
    setPaymentMessage("Redireccionando a WebPay...");
    setPaymentIcon(<CircularProgress size={24} color="inherit" />);

    await PaymentApiRest.postPayment(paymentData, token)
      .then((response) => {
        const redirectUrl = `${response.url}?token_ws=${response.token}`;

        console.log(response);

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
                  {token && userPoints != 0 && (
                    <Grid container>
                      <PuduDiscountButton
                        total={price}
                        userPoints={userPoints}
                        setPoints={(value) =>
                          setDiscounts((discounts) => ({
                            ...discounts,
                            points: value,
                          }))
                        }
                      />
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

              {token && (
                <Grid item xs={12} mt={2}>
                  <LoggedPassengerSelection
                    passengers={passengers}
                    setPassengers={setPassengers}
                    setLoading={setLoading}
                    setUserPoints={setUserPoints}
                    maxSelected={Object.values(selectedSeats).length}
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
