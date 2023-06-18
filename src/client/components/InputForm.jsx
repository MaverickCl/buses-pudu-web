import React, { useEffect, useState, useMemo } from "react";
import { Grid, FormControlLabel, TextField, Box, Button } from "@mui/material";

import TneButton from "./TneButton";
import PhoneInput from "./PhoneInput";

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
    {
      props.setTneDiscount &&
        props.setTneDiscount((prevTneDiscount) => {
          const newTneDiscount = [...prevTneDiscount];
          newTneDiscount[props.index] = passenger.tne ? 0.75 : 1;
          return newTneDiscount;
        });
    }
  }, [tneMessage]);

  useMemo(() => {
    setPassenger(
      props.passengers[props.index]
        ? props.passengers[props.index]
        : {
            name: "",
            email: "",
            phone: "+56",
            rut: "",
            tne: false,
          }
    );
  }, [props.passengers]);

  const handleNameChange = (e) => {
    setPassenger({ ...passenger, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setPassenger({ ...passenger, email: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setPassenger({ ...passenger, phone: e });
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
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            value={passenger.name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
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
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={passenger.email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
            type="email"
          />
        </Grid>

        <Grid item xs={12} my={2}>
          <PhoneInput
            onChange={(e) => handlePhoneChange(e)}
            icon={false}
            number={passenger.phone}
          />
        </Grid>

        <Box sx={{ mb: 2 }}>
          <div>
            <Button sx={{ mt: 1, mr: 1 }} variant="contained" type="submit">
              {props.completedSteps &&
              props.completedSteps() === props.totalSteps() - 1
                ? "Finalizar"
                : "Pasajero listo"}
            </Button>
            <Button
              disabled={props.back ? false : props.index === 0}
              onClick={props.handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              {props.back ? "Cancelar" : "Atrás"}
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
