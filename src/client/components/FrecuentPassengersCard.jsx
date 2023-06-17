import React from "react";
import { Grid, TextField, Box, Button, Card, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import InputForm from "./InputForm";

const FrecuentPassengersCard = ({
  frecuentPassengers,
  setFrecuentPassengers,
}) => {
  const [passengers, setPassengers] = React.useState(0);

  const handleComplete = () => {
    // props.setFrecuentPassengers((prevPassengers) => {
    //   const newPassengers = [...prevPassengers];
    //   newPassengers[props.index] = passenger;
    //   return newPassengers;
    // });
    //props.handleNext();
  };

  const handleBack = () => {
    // props.setFrecuentPassengers((prevPassengers) => {
    //   const newPassengers = [...prevPassengers];
    //   newPassengers[props.index] = passenger;
    //   return newPassengers;
    // });
    //props.handleBack();
  };

  const addFrecuentPassenger = () => {
    setFrecuentPassengers((prevPassengers) => {
      const newPassengers = !prevPassengers
        ? [...prevPassengers]
        : prevPassengers;
      newPassengers.push({
        name: "",
        email: "",
        phone: "",
        rut: "",
        tne: false,
      });
      return newPassengers;
    });
    setPassengers(passengers + 1);
    console.log(passengers);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {Object.values(frecuentPassengers).map((passenger, index) => (
          <Grid item xs={12} key={index}>
            <h2>{index}</h2>
            <InputForm
              handleComplete={handleComplete}
              //completedSteps={completedSteps}
              //totalSteps={totalSteps}
              handleBack={handleBack}
              index={index}
              passengers={frecuentPassengers}
              setPassengers={setFrecuentPassengers}
              //setTneDiscount={setTneDiscount}
            />
          </Grid>
        ))}
        <Divider />
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            onClick={addFrecuentPassenger}
            sx={{ p: 2.5, borderRadius: 100 }}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FrecuentPassengersCard;
