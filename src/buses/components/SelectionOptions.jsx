import React from "react";
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Button,
  Collapse,
} from "@mui/material";
import StairsIcon from "@mui/icons-material/Stairs";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import WcIcon from "@mui/icons-material/Wc";
import Seat from "../../client/components/Seat";

const SelectionOptions = ({ selectedSeats, setSelectedSeats }) => {
  const handleTypeOptions = (option) => {
    const updatedSeats = { ...selectedSeats };
    Object.keys(updatedSeats).forEach((seat) => {
      updatedSeats[seat].type = option;
      if (option === "Asiento") {
        updatedSeats[seat].seatType = "Estándar";
      }
    });
    setSelectedSeats(updatedSeats);
  };

  const handleSeatTypeOptions = (option) => {
    const updatedSeats = { ...selectedSeats };
    Object.keys(updatedSeats).forEach((seat) => {
      if (updatedSeats[seat].type === "Asiento") {
        updatedSeats[seat].seatType = option;
      }
    });
    setSelectedSeats(updatedSeats);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3, backgroundColor: "#f8f8f8" }}>
      <Typography variant="h6" gutterBottom>
        Opciones para Selección
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Cambiar Tipo:
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={2.4} display="flex" justifyContent="center">
            <Tooltip title="Asiento">
              <IconButton
                style={{
                  position: "relative",
                  color: "black",
                }}
                onClick={() => handleTypeOptions("Asiento")}
              >
                <Seat
                  style={{
                    height: "2.5rem",
                  }}
                  color="#000000"
                />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={2.4} display="flex" justifyContent="center">
            <Tooltip title="Pasillo">
              <IconButton
                style={{
                  position: "relative",
                  color: "black",
                }}
                onClick={() => handleTypeOptions("Pasillo")}
              >
                <CalendarViewDayIcon
                  style={{
                    height: "3rem",
                    width: "3rem",
                    transform: "rotate(90deg)",

                    color: "black",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={2.4} display="flex" justifyContent="center">
            <Tooltip title="Escaleras">
              <IconButton
                style={{
                  position: "relative",
                  color: "black",
                }}
                onClick={() => handleTypeOptions("Escaleras")}
              >
                <StairsIcon
                  style={{
                    height: "3rem",
                    width: "3rem",
                    color: "black",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={2.4} display="flex" justifyContent="center">
            <Tooltip title="Vacío">
              <IconButton
                style={{
                  position: "relative",
                  color: "black",
                }}
                onClick={() => handleTypeOptions("Vacío")}
              >
                <CheckBoxOutlineBlankIcon
                  style={{
                    height: "3rem",
                    width: "3rem",
                    color: "black",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={2.4} display="flex" justifyContent="center">
            <Tooltip title="Baño">
              <IconButton
                style={{
                  position: "relative",
                  color: "black",
                }}
                onClick={() => handleTypeOptions("Baño")}
              >
                <WcIcon
                  style={{
                    height: "3rem",
                    width: "3rem",
                    color: "black",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Collapse
          in={Object.values(selectedSeats).some(
            (seat) => seat.type === "Asiento"
          )}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Cambiar Tipo de Asiento:
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Grid item xs={6} mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleSeatTypeOptions("Estandar")}
                  >
                    Estándar
                  </Button>
                </Grid>

                <Grid item xs={6} mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleSeatTypeOptions("SemiCama")}
                  >
                    SemiCama
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleSeatTypeOptions("Cama")}
                  >
                    Cama
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleSeatTypeOptions("Premium")}
                  >
                    Premium
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Paper>
  );
};

export default SelectionOptions;
