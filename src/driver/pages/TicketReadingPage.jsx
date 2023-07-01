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
  const [alertMessage, setAlertMessage] = useState(
    "Hay algo mal con el pasaje"
  );
  const [ticket, setTicket] = useState({ name: "", seat: "" });

  const handleScan = (qrCodeText) => {
    console.log("Scanned QR code:", qrCodeText);

    TicketApiRest.checkTicket(trip, qrCodeText.split("=")[1], token)
      .then((response) => {
        console.log("response", response);
        if (response.estadoVerificacion) {
          setTicket({
            name: response.nombrePasajero,
            seat: response.asientoPasajero,
          });
        } else {
          console.log("response.mensaje", response.message);
          setAlertMessage(response.message);
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
        openDialog={ticket.name !== ""}
        onClose={() => setTicket({ name: "", seat: "" })}
        trip={trip}
        ticket={ticket}
      />
      {showAlert && (
        <AlertDialogSlide
          onClose={() => setShowAlert(false)}
          title="Boleto Inválido"
          text={alertMessage}
          button="Ok"
        />
      )}
    </>
  );
};

export default TicketReadingPage;
