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

const LoggedPassengerSelection = ({
  passengers,
  setPassengers,
  setLoading,
  setUserPoints,
}) => {
  const [name, setName] = React.useState("");
  const [passengerData, setPassengerData] = React.useState({});
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    ProfileApiRest.getProfile(token)
      .then((response) => {
        setName(response.nombre);
        setUserPoints(response.puntos);

        const savedPassenger = {
          name: response.nombre,
          email: response.correo,
          phone: response.contacto,
          rut: response.rut,
          tne: response.estadoTne,
        };

        const updatedPassengers = {
          ...passengers,
          [Object.values(passengers).length]: savedPassenger,
        };

        setPassengers(updatedPassengers);
        setPassengerData(updatedPassengers);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      const updatedPassengers = { ...passengers };
      delete updatedPassengers[Object.values(passengers).length - 1]; //change for the index of the checkbox
      setPassengers(updatedPassengers);
    }

    if (!checked) {
      const updatedPassengers = {
        ...passengers,
        [Object.values(passengers).length]: Object.values(passengerData)[0], //change for the index of the checkbox
      };
      setPassengers(updatedPassengers);
    }
  };

  return (
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
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={name}
          />
        </FormGroup>
      </Grid>
    </Paper>
  );
};

export default LoggedPassengerSelection;
