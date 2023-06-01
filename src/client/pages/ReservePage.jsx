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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  StepButton,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import TneButton from "../components/TneButton";
import { set } from "date-fns";

const TicketPage = () => {
  const [selectedSeats, setSelectedSeats] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [passengers, setPassengers] = useState([]);
  const [completed, setCompleted] = React.useState({});

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const InputPassengers = (seats) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);

    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };

    const totalSteps = () => {
      return steps.length;
    };

    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    const handleStep = (step) => () => {
      setActiveStep(step);
    };

    const completedSteps = () => {
      return Object.keys(completed).length;
    };

    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };

    const handleComplete = (e) => {
      handleSubmit(e);

      if (false) {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        //setCompleted(newCompleted);
        handleNext();
      }
    };

    const handleSubmit = (e) => {
      console.log("submitted");
      console.log(e.defaultPrevented);
      e.preventDefault();
    };

    const steps = [];

    Object.values(seats.seats).map((seat, index) => {
      steps.push({
        label: "Pasajero en asiento " + seat.seatNumber,
        description: (
          <>
            <InputForm handleSubmit={handleSubmit} />
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  sx={{ mt: 1, mr: 1 }}
                  variant="contained"
                  type="submit"
                  onClick={(e) => handleComplete(e)}
                >
                  {completedSteps() === totalSteps() - 1
                    ? "Finalizar"
                    : "Pasajero listo"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Atrás
                </Button>
              </div>
            </Box>
          </>
        ),
      });
    });

    return (
      <Paper sx={{ padding: 4 }}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {step.label}
              </StepButton>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              ¡Has completado el formulario! ¡Estás listo!
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Volver
            </Button>
          </Paper>
        )}
      </Paper>
    );
  };

  const InputForm = ({ handleSubmit }) => {
    const [name, setName] = useState("");
    const [rut, setRut] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [tne, setTne] = useState(false);
    const [tneMessage, setTneMessage] = useState("Tienes una TNE vigente?");

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

    // const handleSubmit = (e) => {
    //   console.log("submitted");
    //   e.preventDefault();
    // };

    return (
      <Grid container padding={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            required
          />
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rut"
                value={rut}
                onChange={handleRutChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <TneButton
                    onChange={(value) => setTne(value)}
                    setMessage={setTneMessage}
                    name="tne"
                    rut={rut}
                  />
                }
                label={tneMessage}
              />
            </Grid>
          </Grid>
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
            label="Teléfono"
            value={phone}
            onChange={handlePhoneChange}
            fullWidth
            margin="normal"
            required
          />
        </form>
      </Grid>
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
              <InputPassengers seats={selectedSeats} />
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper>
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

                  <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained" color="primary">
                      Pagar
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
