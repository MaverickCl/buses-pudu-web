import React from "react";
import {
  Paper,
  Typography,
  Stepper,
  Step,
  StepContent,
  StepButton,
  Box,
  CircularProgress,
} from "@mui/material";
import InputForm from "./InputForm";

const PassengersInput = ({ seats, passengers, setPassengers, loading }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    handleNext();
  };

  const steps = [];

  Object.values(seats).map((seat, index) => {
    steps.push({
      label: "Pasajero en asiento " + seat.seatNumber,
    });
  });

  return (
    <>
      <Paper sx={{ padding: 4, backgroundColor: "#f8f8f8" }}>
        {loading ? (
          <Box
            style={{
              flex: 1,
              height: "90vh",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" size={90} />
          </Box>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Pasajero{" "}
              {activeStep == Object.keys(seats).length
                ? activeStep
                : activeStep + 1}{" "}
              de {Object.keys(seats).length}
            </Typography>

            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {step.label}
                  </StepButton>
                  <StepContent>
                    <InputForm
                      handleComplete={handleComplete}
                      completedSteps={completedSteps}
                      totalSteps={totalSteps}
                      handleBack={handleBack}
                      index={index}
                      passengers={passengers}
                      setPassengers={setPassengers}
                    />
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
          </>
        )}
      </Paper>
    </>
  );
};

export default PassengersInput;
