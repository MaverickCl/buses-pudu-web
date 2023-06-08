import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Collapse,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import BusForm from "../components/BusForm";
import BusService from "../services/BusService";
import SeatMatrix from "../components/SeatMatrix";
import SelectionOptions from "../components/SelectionOptions";
import SaveIcon from "@mui/icons-material/Save";

import { set } from "date-fns";

const CreateBusPage = () => {
  const [busData, setBusData] = useState(null);
  const [seatData, setSeatData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [multiSelect, setMultiSelect] = useState(false);
  const [seats, setSeats] = useState({
    floors: [],
  });

  const handleFormSubmit = async (data) => {
    try {
      //Create bus in api

      const createdBus = await BusService.crearBus(
        data,
        localStorage.getItem("token")
      );
      console.log("Bus creado:", createdBus);
      setBusData(createdBus);

      setSeatData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = () => {
    setMultiSelect(!multiSelect);

    if (multiSelect) {
      Object.keys(selectedSeats).forEach((key) => {
        const status =
          selectedSeats[key].type === "Asiento"
            ? "FREE"
            : selectedSeats[key].type === "Pasillo"
            ? "HALL"
            : selectedSeats[key].type === "Vacío"
            ? "EMPTY"
            : selectedSeats[key].type === "Baño"
            ? "WC"
            : selectedSeats[key].type === "Escaleras" && "STAIRS";

        selectedSeats[key].status = status;
      });
      setSelectedSeats({});
    }
  };

  const handleSeatsSubmit = async () => {
    let transformedSeats;
    for (let i = 0; i < Object.values(seats.floors).length; i++) {
      console.log(i);
      transformedSeats = Object.values(seats.floors[0]).map((seat) => ({
        id: seat.index,
        numero: seat.seatNumber,
        segundoPiso: !seat.floor,
        posicionX: 2,
        posicionY: 2,
        porcentajeAdicional:
          seat.seatType === "Estándar"
            ? 0
            : seat.seatType === "SemiCama"
            ? 1.25
            : seat.seatType === "Cama"
            ? 1.5
            : 2,
        tipoAsiento: seat.seatType,
        bus: busData,
      }));
    }

    console.log(transformedSeats);

    const updatedBusData = {
      patenteBus: busData.patente,
      asientos: seats,
    };

    try {
      const updatedBus = await BusService.enviarAsientos(
        updatedBusData,
        localStorage.getItem("token")
      );
      console.log("Bus y asientos actualizados:", updatedBus);
      //setBusData(updatedBus);
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
                  <Grid item xs={12} align="center">
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
                  <Grid item xs={12} align="center">
                    <Button
                      variant="contained"
                      color="buttonBlue"
                      sx={{ fontWeight: "bold", color: "white" }}
                      onClick={() => handleSeatsSubmit()}
                      startIcon={<SaveIcon />}
                    >
                      Guardar Bus
                    </Button>
                  </Grid>
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
                  seatAmount={seatData.numeroAsientos}
                  floors={seatData.soloUnPiso}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  multiSelect={multiSelect}
                  seats={seats}
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
