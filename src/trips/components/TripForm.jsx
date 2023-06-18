import React from "react";
import { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";

import { es } from "date-fns/locale";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import CitySelector from "./CitySelector";
import DistanceCalculator from "../services/DistanceCalculator";

const TripForm = ({ setParentTrip }) => {
  const [trip, setTrip] = useState({
    origin: "",
    destination: "",
    distance: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    bus: "",
    driver: "",
    price: "",
  });

  const getDistance = (origin, destination) => {
    DistanceCalculator.calculateDistanceBetweenCities(origin, destination).then(
      (response) => {
        setTrip({ ...trip, distance: response });
      }
    );
  };

  DistanceCalculator.calculateDistanceBetweenCities("Temuco", "Santiago");

  const handleSubmit = (event) => {
    event.preventDefault();
    setParentTrip(trip);
  };

  return (
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Grid container p={3} spacing={2}>
          <Grid item xs={4.5}>
            <CitySelector
              label="Origen *"
              setCity={(value) =>
                setTrip({
                  ...trip,
                  origin: value,
                })
              }
            />
          </Grid>
          <Grid item xs={4.5}>
            <CitySelector
              label="Destino *"
              setCity={(value) =>
                setTrip({
                  ...trip,
                  destiny: value,
                })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              id="distance"
              label="Distancia"
              name="distance"
              autoComplete="distance"
              value={trip.distance}
              onChange={(event) =>
                setTrip({ ...trip, distance: event.target.value })
              }
            />
          </Grid>

          <Grid item xs={4}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
              required
            >
              <DatePicker
                sx={{ display: "flex" }}
                fullWidth
                id="departureDate"
                label="Fecha de salida"
                value={trip.departureDate}
                onChange={(date) => setTrip({ ...trip, departureDate: date })}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Hora de salida *"
                defaultValue={dayjs("2022-04-17T15:30")}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Hora de llegada *"
                defaultValue={dayjs("2022-04-17T15:30")}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="bus"
              label="Bus"
              name="bus"
              autoComplete="bus"
              value={trip.bus}
              onChange={(event) =>
                setTrip({ ...trip, bus: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="driver"
              label="Conductor"
              name="driver"
              autoComplete="driver"
              value={trip.driver}
              onChange={(event) =>
                setTrip({ ...trip, driver: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="price"
              label="Precio"
              name="price"
              autoComplete="price"
              value={trip.price}
              onChange={(event) =>
                setTrip({ ...trip, price: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Crear Viaje
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TripForm;
