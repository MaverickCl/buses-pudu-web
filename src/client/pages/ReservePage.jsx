import React, { useState, isPortrait } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";

const TicketPage = () => {
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRutChange = (e) => {
    setRut(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform ticket purchase logic or validation here

    // Reset form fields
    setName("");
    setRut("");
    setEmail("");
    setPhone("");
  };

  const InputForm = () => {
    return (
      <Paper>
        <Grid container padding={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Rut"
              value={rut}
              onChange={handleRutChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              required
              type="email"
            />

            <TextField
              label="Phone"
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              margin="normal"
              required
            />
          </form>
        </Grid>
      </Paper>
    );
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
              <InputForm />
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper>
                <Grid container padding={2}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Ticket Purchase
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Price: $100
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Seats: Seat 1, Seat 2, Seat 3
                  </Typography>
                  <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained" color="primary">
                      Purchase
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </CssBaseline>
  );
};

export default TicketPage;
