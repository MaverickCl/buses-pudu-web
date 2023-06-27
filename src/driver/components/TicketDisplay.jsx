import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Grid, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TicketDisplay({ openDialog, onClose, trip, ticket }) {
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    console.log("ticket", ticket);
  }, []);

  return (
    <>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <>
          <DialogTitle>Pasaje Verificado</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Grid container flexDirection="column">
                <Typography variant="h7" gutterBottom>
                  El pasaje corresponde al:
                </Typography>
                <Typography variant="h7" gutterBottom>
                  Pasajero:
                </Typography>
                <Typography variant="h7" gutterBottom>
                  en el Asiento:
                </Typography>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK!</Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}
