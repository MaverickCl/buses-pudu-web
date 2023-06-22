import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Paper,
  Button,
  Collapse,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { es } from "date-fns/locale";

const BusForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [seatAmount, setSeatAmount] = useState(25);
  const [floors, setFloors] = useState(1);
  const [year, setYear] = useState(null);

  const [formSent, setFormSent] = useState(true);

  const currentYear = new Date().getFullYear();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nombre") {
      setName(value);
    } else if (name === "modelo") {
      setModel(value);
    } else if (name === "numeroAsientos") {
      setSeatAmount(value);
    } else if (name === "soloUnPiso") {
      setFloors(event.target.checked);
    } else if (name === "anioFabricacion") {
      setYear(value);
    }
  };

  const handleYearChange = (date) => {
    if (date.getFullYear() <= currentYear) {
      setYear(date.getFullYear());
    } else {
      setYear(new Date().getFullYear());
    }
  };

  const formatPlate = (value) => {
    console.log(year);

    // Remove all characters except letters and numbers
    let plateChars = value.replace(/[^a-zA-Z0-9]/g, "");

    if (plateChars.length > 6) {
      // Trim the value to a maximum of 6 characters
      plateChars = plateChars.slice(0, 6);
    }

    if (plateChars.length === 6) {
      var regex1 = /^[A-Za-z]{4}[0-9]{2}$/;
      var regex2 = /^[A-Za-z]{2}[0-9]{4}$/;

      if (regex1.test(plateChars)) {
        // Format as four letters and two numbers
        const formattedPlate = `${plateChars
          .slice(0, 4)
          .toUpperCase()}-${plateChars.slice(4).toUpperCase()}`;
        setPlate(formattedPlate);
      } else if (regex2.test(plateChars)) {
        // Format as four numbers and two letters
        const formattedPlate = `${plateChars
          .slice(0, 2)
          .toUpperCase()}-${plateChars.slice(2).toUpperCase()}`;
        setPlate(formattedPlate);
      }
    } else {
      // Set the plate without formatting
      setPlate(plateChars.toUpperCase());
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const busData = {
      nombre: name,
      modelo: model,
      patente: plate,
      numeroAsientos: parseInt(seatAmount),
      soloUnPiso: floors === 1,
      anioFabricacion: parseInt(year),
    };

    onSubmit(busData);

    setFormSent(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}>
      <form onSubmit={handleFormSubmit} style={{}}>
        <Typography variant="h4">Formulario Creación Bus</Typography>
        <Collapse in={formSent}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name="nombre"
                label="Nombre"
                value={name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <TextField
                name="modelo"
                label="Modelo"
                value={model}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <TextField
                name="patente"
                label="Patente"
                value={plate}
                onChange={(event) => formatPlate(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <TextField
                name="numeroAsientos"
                type="number"
                label="Número de asientos"
                value={seatAmount}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Typography variant="h5" align="center" mt={2}>
              Cantidad de Pisos : {floors}
            </Typography>
            <Grid item xs={12} mt={2}>
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setFloors(1)}
                    disabled={floors === 1}
                  >
                    1 Piso
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setFloors(2)}
                    disabled={floors === 2}
                  >
                    2 Pisos
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={es}
              >
                <DatePicker
                  views={["year"]}
                  required
                  fullWidth
                  id="anioFabricacion"
                  name="anioFabricacion"
                  label="Año de fabricación"
                  value={year ? new Date(year, 0, 1) : null}
                  maxDate={new Date(currentYear, 11, 31)}
                  onChange={(date) => handleYearChange(date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Crear Bus
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </form>
    </Paper>
  );
};

export default BusForm;
