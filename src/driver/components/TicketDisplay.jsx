import React, { useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TicketDisplay({ openDialog, onClose, ticket }) {
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
            <DialogContentText
              id="alert-dialog-slide-description"
              display="flex"
              flexDirection="column"
            >
              <Typography variant="h7" gutterBottom>
                El pasaje corresponde al:
              </Typography>
              <Typography variant="h7" gutterBottom>
                Pasajero:{ticket.name}
              </Typography>
              <Typography variant="h7" gutterBottom>
                en el Asiento:{ticket.seat}
              </Typography>
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
