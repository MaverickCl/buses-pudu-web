import React from "react";
import { useState } from "react";
import { Box, CardContent, Card, Grid } from "@mui/material";

import QrReader from "../components/QrReader";
import TicketApiRest from "../services/TicketApiRest";
import TicketDisplay from "../components/TicketDisplay";
import AlertDialogSlide from "../../client/components/AlertDialog";

const TicketReadingPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const trip = searchParams.get("trip");
  const token = localStorage.getItem("token");
  const [showAlert, setShowAlert] = useState(false);
  const [ticket, setTicket] = useState(null);

  const handleScan = (qrCodeText) => {
    console.log("Scanned QR code:", qrCodeText);

    TicketApiRest.checkTicket(trip, qrCodeText.split("=")[1], token)
      .then((response) => {
        if (response.message === "true") {
          setTicket(qrCodeText.split("=")[1]);
        } else {
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid container justifyContent="center" alignContent="center">
          <Grid item xs={12} sm={8}>
            <Card
              sx={{
                width: "95%",
                backgroundColor: "#f3f6f4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Grid container alignItems="center" justifyContent="center">
                  <QrReader onScan={handleScan} />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <TicketDisplay
        openDialog={ticket !== null}
        onClose={() => setTicket(null)}
        trip={trip}
        ticket={ticket}
      />
      {showAlert && (
        <AlertDialogSlide
          onClose={() => setShowAlert(false)}
          title="Boleto Inválido"
          text="El ticket escaneado no es válido o ya fue utilizado"
          button="Ok"
        />
      )}
    </>
  );
};

export default TicketReadingPage;
