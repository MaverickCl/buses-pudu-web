import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Box, IconButton } from "@mui/material";
import BusSeatsApiRest from "../services/BusSeatsApiRest";
import Seat from "./Seat";

const BusComponent = ({ seatHandler }) => {
  const [busData, setBusData] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState({});

  //   useEffect(() => {
  //     const fetchBusSeats = async () => {
  //       try {
  //         const seats = await BusSeatsApiRest.getBusSeats(props.busId);
  //         setBusData(seats);
  //       } catch (error) {
  //         console.error("Error fetching bus seats:", error);
  //       }
  //     };

  //     fetchBusSeats();
  //   }, [props.busId]);

  const handleFloorChange = () => {
    setCurrentFloor(currentFloor === 1 ? 2 : 1);
  };

  if (!busData) {
    // Show loading indicator or return null while fetching data
    //console.log(props.meme);
    // MOCK DATA
    setBusData({
      floors: [
        [
          [
            { seatNumber: "01", status: "BLOCKED", type: "Cama", price: 100 },
            {
              seatNumber: "02",
              status: "RESERVED",
              type: "Semicama",
              price: 80,
            },
            { seatNumber: "", status: "" },
            { seatNumber: "03", status: "FREE", type: "Ejecutivo", price: 120 },
            { seatNumber: "04", status: "FREE", type: "Cama", price: 100 },
            { seatNumber: "05", status: "FREE", type: "Semicama", price: 80 },
            // ...
          ],
        ],
        [
          [
            {
              seatNumber: "26",
              status: "BLOCKED",
              type: "Semicama",
              price: 80,
            },
            {
              seatNumber: "27",
              status: "RESERVED",
              type: "Ejecutivo",
              price: 120,
            },
            { seatNumber: "", status: "" },
            { seatNumber: "28", status: "FREE", type: "Cama", price: 100 },
            {
              seatNumber: "29",
              status: "BLOCKED",
              type: "Semicama",
              price: 80,
            },
            { seatNumber: "30", status: "FREE", type: "Ejecutivo", price: 120 },
            // ...
          ],
        ],
      ],
    });
    // END MOCK DATA

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
        } else console.log("Sólo puede comprar 5 pasajes a la vez.");
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
    <Container maxWidth="md">
      <Grid container spacing={2} justifyContent="center">
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
        {floors[currentFloor - 1].map((row, rowIndex) => (
          <Grid
            key={rowIndex}
            item
            xs={12}
            container
            spacing={4}
            justifyContent="center"
          >
            {row.map((seat, seatIndex) => (
              <Grid key={seatIndex} item xs={2.3}>
                <IconButton
                  style={{
                    position: "relative",
                    color: "black",
                    opacity: seat.seatNumber === "" ? "0" : "1",
                    pointerEvents: seat.seatNumber === "" ? "none" : "",
                  }}
                  disabled={
                    seat.status === "BLOCKED" || seat.status === "RESERVED"
                  }
                  onClick={() => {
                    handleSeatSelect(currentFloor - 1, seatIndex);
                  }}
                >
                  <Seat
                    style={{
                      height: "3rem",
                    }}
                    color={getSeatColor(seat.status)}
                  />

                  <span
                    style={{
                      position: "absolute",
                      marginBottom: "-.5rem",
                      fontSize: "1.25rem",
                    }}
                  >
                    {seat.seatNumber}
                  </span>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BusComponent;
