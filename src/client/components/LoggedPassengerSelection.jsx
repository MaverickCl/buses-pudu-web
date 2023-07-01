import React from "react";
import {
  Paper,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ProfileApiRest from "../services/ProfileApiRest";
import AlertDialogSlide from "./AlertDialog";

const LoggedPassengerSelection = ({
  passengers,
  setPassengers,
  setLoading,
  setUserPoints,
  maxSelected,
}) => {
  const [passengerData, setPassengerData] = React.useState({});
  const [checked, setChecked] = React.useState({
    0: true,
  });
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    ProfileApiRest.getProfile(token)
      .then((response) => {
        setUserPoints(response.puntos);

        const savedPassenger = {
          name: response.nombre,
          email: response.correo,
          phone: response.contacto,
          rut: response.rut,
          tne: response.estadoTne,
        };

        let updatedPassengers = {
          ...passengers,
          [Object.values(passengers).length]: savedPassenger,
        };

        setPassengers(updatedPassengers);

        let updatedChecked = checked;

        response.pasajeroRecurrenteDTOS.forEach((passenger, index) => {
          updatedPassengers = {
            ...updatedPassengers,
            [Object.values(updatedPassengers).length]: {
              name: passenger.nombre,
              email: passenger.correo,
              phone: passenger.contacto,
              rut: passenger.rut,
              tne: passenger.estadoTne,
            },
          };
          updatedChecked = {
            ...updatedChecked,
            [Object.values(updatedChecked).length]: false,
          };
        });

        setChecked(updatedChecked);
        setPassengerData(updatedPassengers);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event, index) => {
    const checkedValue = event.target.checked;
    setChecked((prevChecked) => ({ ...prevChecked, [index]: checkedValue }));

    if (!checkedValue) {
      const updatedPassengers = { ...passengers };
      delete updatedPassengers[index];
      setPassengers(updatedPassengers);
    } else {
      if (Object.values(passengers).length === maxSelected) {
        setChecked((prevChecked) => ({
          ...prevChecked,
          [index]: !checkedValue,
        }));

        setShowAlert(true);
        return;
      } else {
        const updatedPassengers = {
          ...passengers,
          [Object.values(passengers).length]:
            Object.values(passengerData)[index],
        };
        setPassengers(updatedPassengers);
      }
    }
  };

  return (
    <>
      <Paper
        style={{
          backgroundColor: "#f5f5f5",
          marginBottom: 5,
        }}
      >
        <Grid container padding={2} width="100%" flexDirection="column">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Pasajeros Guardados
          </Typography>

          <FormGroup>
            {Object.values(passengerData).map((passenger, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checked[index]}
                    onChange={(e) => handleChange(e, index)}
                  />
                }
                label={passenger.name}
              />
            ))}
          </FormGroup>
        </Grid>
      </Paper>
      {showAlert && (
        <AlertDialogSlide
          title="Máximo de pasajeros alcanzado"
          text={"Solo puede seleccionar " + maxSelected + " pasajeros"}
          button="OK"
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default LoggedPassengerSelection;
