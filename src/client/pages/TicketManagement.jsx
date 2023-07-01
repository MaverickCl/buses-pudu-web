import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";

const tickets = [
  {
    id: 1,
    from: "Santiago",
    to: "Valparaiso",
    date: "01/06/2023",
    price: 10000,
    canceled: false,
  },
  {
    id: 2,
    from: "Santiago",
    to: "Concepción",
    date: "05/07/2023",
    price: 15000,
    canceled: false,
  },
  {
    id: 3,
    from: "Santiago",
    to: "Puerto Montt",
    date: "15/08/2023",
    price: 25000,
    canceled: true,
  },
];

const TicketManagementPage = () => {
  const [cancelingTicketId, setCancelingTicketId] = React.useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = React.useState(false);

  const handleCancelClick = (ticketId) => {
    setCancelingTicketId(ticketId);
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    // TODO: implement cancel ticket logic
    setIsCancelDialogOpen(false);
  };

  const handleCancelCancel = () => {
    setIsCancelDialogOpen(false);
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" />

      <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Mis tickets
          </Typography>
          <Grid container spacing={2}>
            {tickets.map((ticket) => (
              <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {ticket.from} - {ticket.to}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Fecha: {ticket.date}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Precio: ${ticket.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {!ticket.canceled ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCancelClick(ticket.id)}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      <Typography color="error">Cancelado</Typography>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog open={isCancelDialogOpen} onClose={handleCancelCancel}>
            <DialogTitle>Confirmar cancelación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Está seguro que desea cancelar este ticket? El monto será
                devuelto a su cuenta.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelCancel}>Cancelar</Button>
              <Button onClick={handleCancelConfirm} color="secondary">
                {cancelingTicketId ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
      <Footer />
    </CssBaseline>
  );
};

export default TicketManagementPage;
