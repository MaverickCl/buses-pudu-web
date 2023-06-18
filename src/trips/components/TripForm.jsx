import React, { useEffect } from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import es from "dayjs/locale/es";

dayjs.extend(localizedFormat);
dayjs.locale(es);

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import CitySelector from "./CitySelector";
import DistanceCalculator from "../services/DistanceCalculator";
import DataApiRest from "../services/DataApiRest";
import AlertDialogSlide from "../../client/components/AlertDialog";
import TripApiRest from "../services/TripApiRest";

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
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    button: "",
  });

  //GOTTA MAKE THIS WORK
  //DistanceCalculator.fetchDistance("Santiago", "Temuco");
  // IF THIS WORKS, THEN DISTANCE AND ARRIVAL TIME IS AUTOMATIC.

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      trip.origin === "" ||
      trip.destination === "" ||
      trip.departureDate === "" ||
      trip.departureTime === "" ||
      trip.arrivalTime === ""
    ) {
      let message =
        "falta ingresar los siguientes datos: " +
        (trip.origin === "" ? "origen" : "") +
        (trip.destination === "" ? ", destino" : "") +
        (trip.departureDate === "" ? ", fecha de salida" : "") +
        (trip.departureTime === "" ? ", hora de salida" : "") +
        (trip.arrivalTime === "" ? ", hora de llegada" : "");

      setAlertData({
        title: "Favor ingresa todos los datos",
        message: message,
        button: "Ok",
      });
      setShowAlert(true);
      return;
    } else {
      setParentTrip(trip);

      TripApiRest.createTrip(trip, localStorage.getItem("token")).then(
        (data) => {
          setAlertData({
            title: "Viaje creado correctamente",
            message: "El viaje ha sido creado correctamente",
            button: "Ok",
          });
          setShowAlert(true);
        }
      );
    }
  };

  useEffect(() => {
    try {
      DataApiRest.fetchBuses(localStorage.getItem("token")).then((data) => {
        setBuses(data);
      });
      DataApiRest.fetchDrivers(localStorage.getItem("token")).then((data) => {
        setDrivers(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
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
                    destination: value,
                  })
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="distance"
                required
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
              <LocalizationProvider dateAdapter={AdapterDayjs} required>
                <DatePicker
                  sx={{ display: "flex" }}
                  fullWidth
                  disablePast
                  id="departureDate"
                  format="DD-MM-YYYY"
                  label="Fecha de salida *"
                  value={
                    !trip.departureDate
                      ? null
                      : dayjs(trip.departureDate, "DD-MM-YYYY")
                  }
                  onChange={(date) =>
                    setTrip({
                      ...trip,
                      departureDate: date.format("DD-MM-YYYY"),
                    })
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Hora de salida *"
                  format="HH:mm"
                  onChange={(value) =>
                    setTrip({
                      ...trip,
                      departureTime: value.format("HH:mm"),
                    })
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Hora de llegada *"
                  format="HH:mm"
                  onChange={(value) =>
                    setTrip({ ...trip, arrivalTime: value.format("HH:mm") })
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id="bus-selector">Bus</InputLabel>
                <Select
                  labelId="bus-selector"
                  id="bus"
                  value={trip.bus}
                  label="Bus"
                  onChange={(event) =>
                    setTrip({ ...trip, bus: event.target.value })
                  }
                >
                  {buses.length === 0 && (
                    <MenuItem value="">Cargando...</MenuItem>
                  )}
                  {Object.values(buses).map((bus) => (
                    <MenuItem key={bus.id} value={bus}>
                      {bus.nombre} | modelo: {bus.modelo} | patente:{" "}
                      {bus.patente}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id="driver-selector">Conductor</InputLabel>
                <Select
                  labelId="driver-selector"
                  id="driver"
                  value={trip.driver}
                  label="Conductor"
                  onChange={(event) =>
                    setTrip({ ...trip, driver: event.target.value })
                  }
                >
                  {drivers.length === 0 && (
                    <MenuItem value="">Cargando...</MenuItem>
                  )}
                  {Object.values(drivers).map((driver) => (
                    <MenuItem key={driver.id} value={driver}>
                      {driver.nombre} | correo: {driver.correo} | RUT:{" "}
                      {driver.rut}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Precio"
                name="price"
                autoComplete="price"
                type="number"
                value={trip.price}
                onChange={(event) =>
                  setTrip({ ...trip, price: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Crear Viaje
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {showAlert && (
        <AlertDialogSlide
          title={alertData.title}
          text={alertData.message}
          button={alertData.button}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default TripForm;
