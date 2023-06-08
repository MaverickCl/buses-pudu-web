import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Collapse,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import BusForm from "../components/BusForm";
import BusService from "../services/BusService";
import SeatMatrix from "../components/SeatMatrix";
import SelectionOptions from "../components/SelectionOptions";

import { set } from "date-fns";

const CreateBusPage = () => {
  const [busData, setBusData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [multiSelect, setMultiSelect] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      //Create bus in api

      // const createdBus = await BusService.crearBus(data);
      // console.log("Bus creado:", createdBus);
      // setBusData(createdBus);

      setBusData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = () => {
    setMultiSelect(!multiSelect);

    if (multiSelect) {
      setSelectedSeats({});
      Object.keys(selectedSeats).forEach((key) => {
        const status =
          Object.values(selectedSeats)[0].type === "Asiento"
            ? "FREE"
            : Object.values(selectedSeats)[0].type === "Pasillo"
            ? "HALL"
            : Object.values(selectedSeats)[0].type === "Vacío"
            ? "EMPTY"
            : Object.values(selectedSeats)[0].type === "Baño"
            ? "WC"
            : Object.values(selectedSeats)[0].type === "Escaleras" && "STAIRS";
        selectedSeats[key].status = status;
      });
    }
  };

  const handleAsientosSubmit = async (asientosData) => {
    const updatedAsientosData = asientosData.map((asiento) => {
      if (!asiento.tipoAsiento) {
        return {
          ...asiento,
          tipoAsiento: "desocupado", // Cambia 'desocupado' por asiento.tipoAsiento para usar el tipo seleccionado en la matriz
        };
      }
      return asiento;
    });

    const updatedBusData = {
      patenteBus: busData.patente,
      asientos: updatedAsientosData,
    };

    try {
      const updatedBus = await BusService.enviarAsientos(updatedBusData);
      console.log("Bus y asientos actualizados:", updatedBus);
      setBusData(updatedBus);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h1" align="center">
        Creación de Bus
      </Typography>

      <div style={{ marginTop: "100px" }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <BusForm onSubmit={handleFormSubmit} />
            <Collapse in={busData != null}>
              <Paper
                elevation={3}
                sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}
              >
                <Grid container margin={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={handleCheckboxChange}
                        checked={multiSelect}
                        style={{
                          position: "relative",
                          color: "green",
                        }}
                      />
                    }
                    label="Selección múltiple"
                  />
                </Grid>
              </Paper>
            </Collapse>

            <Collapse in={Object.keys(selectedSeats).length > 0}>
              <SelectionOptions
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            </Collapse>
          </Grid>

          <Grid item xs={8}>
            <Paper
              elevation={3}
              sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}
            >
              {busData ? (
                <SeatMatrix
                  seatAmount={busData.numeroAsientos}
                  floors={busData.soloUnPiso}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  multiSelect={multiSelect}
                />
              ) : (
                <Typography variant="body1" align="center">
                  No se ha creado ningún bus aún.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default CreateBusPage;
