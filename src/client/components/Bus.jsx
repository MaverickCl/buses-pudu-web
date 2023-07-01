import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import AlertDialog from "../components/AlertDialog";
import BusSeatsApiRest from "../services/BusSeatsApiRest";
import Seat from "./Seat";
import StairsIcon from "@mui/icons-material/Stairs";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import WcIcon from "@mui/icons-material/Wc";

const BusComponent = ({ seatHandler, createdSeats, trip }, props) => {
  const [adminMode, setAdminMode] = useState(createdSeats ? true : false);
  const [busData, setBusData] = useState(adminMode ? createdSeats : null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  useEffect(() => {
    if (busData === null) {
      fetchBusSeats();
    }
  }, [props.busId]);

  const fetchBusSeats = async () => {
    try {
      const seats = await BusSeatsApiRest.getBusSeats(trip);
      setBusData(seats);
    } catch (error) {}
  };

  const handleFloorChange = () => {
    setCurrentFloor(currentFloor === 1 ? 2 : 1);
  };

  if (!busData) {
    return (
      <>
        <Box
          style={{
            flex: 1,
            height: "90vh",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" size={90} />
        </Box>
      </>
    );
  }

  const handleSeatSelect = (floorIndex, seatIndex) => {
    const updatedSeats = [...busData.floors[floorIndex].seats];
    const clickedSeat = updatedSeats[seatIndex];

    if (!adminMode) {
      if (clickedSeat.status === "FREE") {
        if (Object.keys(selectedSeats).length < 5) {
          clickedSeat.status = "SELECTED";

          setSelectedSeats((prevSelectedSeats) => ({
            ...prevSelectedSeats,
            [`${floorIndex}-${seatIndex}`]: clickedSeat,
          }));

          seatHandler(clickedSeat);
        } else {
          setShowAlert(true);
        }
      } else if (clickedSeat.status === "SELECTED") {
        clickedSeat.status = "FREE";

        setSelectedSeats((prevSelectedSeats) => {
          const updatedSelectedSeats = { ...prevSelectedSeats };
          delete updatedSelectedSeats[`${floorIndex}-${seatIndex}`];
          return updatedSelectedSeats;
        });
        seatHandler(clickedSeat);
      }

      let updatedFloors = [];
      if (floorIndex === 0) {
        if (busData.floors.length > 1) {
          updatedFloors = [
            { seats: (busData.floors[floorIndex].seats = updatedSeats) },
            busData.floors[1],
          ];
        } else {
          updatedFloors = [
            { seats: (busData.floors[floorIndex].seats = updatedSeats) },
          ];
        }
      } else {
        updatedFloors = [
          busData.floors[0],
          { seats: (busData.floors[floorIndex].seats = updatedSeats) },
        ];
      }

      setBusData({ floors: updatedFloors });
    } else {
      if (clickedSeat.status !== "SELECTED") {
        clickedSeat.status = "SELECTED";
        setSelectedSeats((prevSelectedSeats) => ({
          ...prevSelectedSeats,
          [`${floorIndex}-${seatIndex}`]: clickedSeat,
        }));
        seatHandler(clickedSeat);
      } else if (clickedSeat.status === "SELECTED") {
        clickedSeat.type === "Asiento" && (clickedSeat.status = "FREE");
        clickedSeat.type === "Pasillo" && (clickedSeat.status = "HALL");
        clickedSeat.type === "Baño" && (clickedSeat.status = "WC");
        clickedSeat.type === "Escaleras" && (clickedSeat.status = "STAIRS");
        clickedSeat.type === "Vacío" && (clickedSeat.status = "EMPTY");

        setSelectedSeats((prevSelectedSeats) => {
          const updatedSelectedSeats = { ...prevSelectedSeats };
          delete updatedSelectedSeats[`${floorIndex}-${seatIndex}`];
          return updatedSelectedSeats;
        });

        seatHandler(clickedSeat);
      }
    }
  };

  const getSeatColor = (seat) => {
    if (seat == "SELECTED") {
      return "#2f911d";
    }
    if (seat == "RESERVED") {
      return "#bf6313";
    }
    if (seat == "BLOCKED") {
      return "#c21515";
    }
    if (seat == "HALL") {
      return "#878787";
    }
    if (seat == "WC") {
      return "#0e7eed";
    }
    if (seat == "STAIRS") {
      return "#5e1787";
    }
    if (seat == "FREE") {
      return "#000000";
    }
    if (seat == "EMPTY") {
      return "#dedede";
    }
    return "#000000";
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid container justifyContent="center" width="100%">
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              onClick={handleFloorChange}
              sx={{ display: busData.floors.length > 1 ? "all" : "none" }}
            >
              {currentFloor === 1 && busData.floors.length > 0
                ? "Ver 2ᵈᵒ piso"
                : "Ver 1ᵉʳ piso"}
            </Button>
          </Grid>
          <Box
            sx={{
              mt: 5,
              mb: 3,
              paddingTop: 5,
              paddingBottom: 4,
              borderRadius: 15,
              border: "2px solid #000",
              backgroundColor: "#efefef",
            }}
          >
            <Grid
              width="100%"
              item
              xs={12}
              container
              justifyContent="space-between"
            >
              {busData.floors[currentFloor - 1].seats.map((seat, seatIndex) => (
                <Tooltip
                  key={seatIndex}
                  title={
                    seat.status === "RESERVED"
                      ? "Asiento reservado"
                      : seat.status === "BLOCKED"
                      ? "Asiento ocupado"
                      : createdSeats != undefined
                      ? seat.type + "\n" + seat.seatType
                      : seat.type !== "Vacío" && seat.type !== "Asiento"
                      ? seat.type
                      : seat.seatType
                  }
                >
                  <Grid item xs={2.3} mb={2}>
                    <span>
                      <IconButton
                        style={{
                          position: "relative",
                          color: "black",

                          pointerEvents: createdSeats
                            ? "all"
                            : seat.type !== "Asiento" && "none",
                        }}
                        disabled={
                          seat.status === "BLOCKED" ||
                          seat.status === "RESERVED"
                        }
                        onClick={() => {
                          handleSeatSelect(currentFloor - 1, seatIndex);
                        }}
                      >
                        {seat.type === "Pasillo" && (
                          <CalendarViewDayIcon
                            style={{
                              width: "100%",
                              transform: "rotate(90deg)",
                              height: "100%",
                              color: getSeatColor(seat.status),
                            }}
                          />
                        )}
                        {seat.type === "Escaleras" && (
                          <StairsIcon
                            style={{
                              width: "100%",
                              height: "100%",
                              color: getSeatColor(seat.status),
                            }}
                          />
                        )}
                        {seat.type === "Vacío" && (
                          <CheckBoxOutlineBlankIcon
                            style={{
                              width: "100%",
                              height: "100%",
                              color: getSeatColor(seat.status),
                            }}
                          />
                        )}
                        {seat.type === "Asiento" && (
                          <Seat
                            style={{
                              width: "100%",
                            }}
                            color={getSeatColor(seat.status)}
                          />
                        )}
                        {seat.type === "Baño" && (
                          <WcIcon
                            style={{
                              width: "100%",
                              height: "100%",
                              color: getSeatColor(seat.status),
                            }}
                          />
                        )}

                        <span
                          style={{
                            position: "absolute",
                            marginBottom: "-.5rem",
                            fontSize: isPortrait ? "1rem" : "1.25rem",
                          }}
                        >
                          {seat.seatNumber}
                        </span>
                      </IconButton>
                    </span>
                  </Grid>
                </Tooltip>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
      {showAlert && (
        <AlertDialog
          title="Límite de pasajes alcanzado"
          text="Sólo puede comprar 5 pasajes a la vez."
          button="OK"
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default BusComponent;
