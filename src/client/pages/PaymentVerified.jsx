import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Card,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import PaymentApiRest from "../services/PaymentApiRest";

const PaymentVerificationPage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const token = searchParams.get("token_ws");

    console.log(token);

    PaymentApiRest.getPayment(token)
      .then((response) => {
        setData(response);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        setData(error.response.data);
      });
  }, []);

  return (
    <div>
      <ResponsiveAppBar position="absolute" />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        marginTop="2rem"
      >
        <Card
          sx={{
            width: "80%",
            backgroundColor: "#f3f6f4",
            display: "flex",
            flexDirection: isPortrait ? "column" : "row",
            alignItems: "center",
          }}
        >
          <CardContent>
            {loading ? (
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  {/* <Box
                    style={{
                      flex: 1,
                      height: "90vh",
                      width: "100%",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  > */}
                  <CircularProgress color="secondary" size={90} />
                  {/* </Box> */}
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h5" gutterBottom textAlign="center">
                      {data !== "AUTHORIZED"
                        ? "Ups!, algo salió mal"
                        : "Pago Existoso!"}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {data !== "AUTHORIZED"
                        ? data.message
                        : "Su pago ha sido realizado con éxito, en breve recibirá un correo con los detalles de su compra y boleto"}
                    </Typography>
                    <Grid
                      item
                      display="flex"
                      justifyContent="center"
                      margin="2rem"
                    >
                      <Link to="/">
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ padding: ".5rem 2rem" }}
                        >
                          OK!
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src="/VerifiedPayment.png"
                    style={{
                      marginRight: "0.5rem",
                      width: "100%",
                    }}
                    alt="Verified Mail"
                  />
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  );
};

export default PaymentVerificationPage;
