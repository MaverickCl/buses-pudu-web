import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AlertDialog from "../components/AlertDialog";
import BusSeatsApiRest from "../services/BusSeatsApiRest";
import Seat from "./Seat";

const BusComponent = ({ seatHandler }, props) => {
  const [busData, setBusData] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  useEffect(() => {
    const fetchBusSeats = async () => {
      try {
        const seats = await BusSeatsApiRest.getBusSeats(props.busId);
        setBusData(seats);
      } catch (error) {}
    };

    fetchBusSeats();
  }, [props.busId]);

  const handleFloorChange = () => {
    setCurrentFloor(currentFloor === 1 ? 2 : 1);
  };

  if (!busData) {
    // Show loading indicator or return null while fetching data

    return null;
  }

  const handleSeatSelect = (floorIndex, seatIndex) => {
    if (
      busData &&
      busData.floors &&
      busData.floors[floorIndex] &&
      busData.floors[floorIndex][0] &&
      busData.floors[floorIndex][0][seatIndex]
    ) {
      const updatedFloors = [...busData.floors];
      const clickedSeat = updatedFloors[floorIndex][0][seatIndex];

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

      setBusData({ ...busData, floors: updatedFloors });
    }
  };

  const { floors, seats } = busData;

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
              sx={{ display: floors[1].length > 0 ? "all" : "none" }}
            >
              {currentFloor === 1 && floors[1].length > 0
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
            {floors[currentFloor - 1].map((row, rowIndex) => (
              <Grid
                key={rowIndex}
                width="100%"
                item
                xs={12}
                container
                justifyContent="space-between"
              >
                {row.map((seat, seatIndex) => (
                  <Tooltip
                    key={seatIndex}
                    title={
                      seat.status === "RESERVED"
                        ? "Asiento reservado"
                        : seat.status === "BLOCKED"
                        ? "Asiento ocupado"
                        : seat.type
                    }
                  >
                    <Grid item xs={2.3} mb={2}>
                      <span>
                        <IconButton
                          style={{
                            position: "relative",
                            color: "black",
                            opacity: seat.seatNumber === "" && "0",
                            pointerEvents: seat.seatNumber === "" && "none",
                          }}
                          disabled={
                            seat.status === "BLOCKED" ||
                            seat.status === "RESERVED"
                          }
                          onClick={() => {
                            handleSeatSelect(currentFloor - 1, seatIndex);
                          }}
                        >
                          <Seat
                            style={{
                              width: "100%",
                            }}
                            color={getSeatColor(seat.status)}
                          />

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
            ))}
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
