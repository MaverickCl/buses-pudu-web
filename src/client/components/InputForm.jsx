import React, { useEffect, useState } from "react";
import { Grid, FormControlLabel, TextField, Box, Button } from "@mui/material";
import TneButton from "./TneButton";

const InputForm = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  // create json object with passenger data
  const [passenger, setPassenger] = useState(
    props.passengers[props.index]
      ? props.passengers[props.index]
      : {
          name: "",
          email: "",
          phone: "",
          rut: "",
          tne: false,
        }
  );

  const [tneMessage, setTneMessage] = useState("Tienes una TNE vigente?");

  useEffect(() => {
    props.setTneDiscount((prevTneDiscount) => { 
      const newTneDiscount = [...prevTneDiscount];
      newTneDiscount[props.index] = passenger.tne ? 0.7 : 1;
      return newTneDiscount;
      });
  }, [tneMessage]);

  const handleNameChange = (e) => {
    setPassenger({ ...passenger, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setPassenger({ ...passenger, email: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setPassenger({ ...passenger, phone: e.target.value });
  };

  const handleSubmit = (e) => {
    let a = true;
    e.preventDefault();
    // map passenger and verify if rut exist in one of the passengers
    Object.values(props.passengers).map((passengerMap, index) => {
      if (passengerMap.rut === passenger.rut && index !== props.index) {
        setShowAlert(true);
        a = false;
      }
    });

    if (a) {
      // create new passengers object and push to passengers json, if passenger already exists, replace it
      const updatedPassengers = {
        ...props.passengers,
        [props.index]: passenger,
      };

      props.setPassengers(updatedPassengers);

      props.handleComplete();
    }
  };

  const formatRut = (value) => {
    const rutNumbers = value.replace(/[^0-9kK]/g, "");

    if (rutNumbers.length > 1) {
      // Format the RUT with dots and hyphen
      const formattedRut = `${rutNumbers
        .slice(0, -1)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${rutNumbers
        .slice(-1)
        .toUpperCase()}`;
      setPassenger({ ...passenger, rut: formattedRut });
    } else {
      setPassenger({ ...passenger, rut: rutNumbers });
    }
  };

  return (
    <Grid container padding={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={passenger.name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          required
        />
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rut"
              value={passenger.rut}
              onChange={(event) => formatRut(event.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <TneButton
                  onChange={(value) =>
                    setPassenger({ ...passenger, tne: value })
                  }
                  setMessage={setTneMessage}
                  name="tne"
                  rut={passenger.rut}
                  isValid={passenger.tne}
                />
              }
              label={passenger.tne ? "TNE válida" : tneMessage}
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          value={passenger.email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          required
          type="email"
        />

        <TextField
          label="Teléfono"
          value={passenger.phone}
          onChange={handlePhoneChange}
          fullWidth
          margin="normal"
          required
        />

        <Box sx={{ mb: 2 }}>
          <div>
            <Button sx={{ mt: 1, mr: 1 }} variant="contained" type="submit">
              {props.completedSteps() === props.totalSteps() - 1
                ? "Finalizar"
                : "Pasajero listo"}
            </Button>
            <Button
              disabled={props.index === 0}
              onClick={props.handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Atrás
            </Button>
          </div>
        </Box>
      </form>
      {showAlert && (
        <AlertDialog
          title="
            Rut ya existe"
          text="
            El rut ingresado ya existe en otro pasajero, por favor ingrese otro rut."
          button="OK"
          onClose={() => setShowAlert(false)}
        />
      )}
    </Grid>
  );
};

export default InputForm;
