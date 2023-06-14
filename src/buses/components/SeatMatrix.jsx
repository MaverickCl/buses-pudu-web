import React, { useEffect, useMemo, useState } from "react";
import Bus from "../../client/components/Bus";
import { Button, Grid } from "@mui/material";

import seatCreator from "./SeatCreator";

const SeatMatrix = ({
  seatAmount,
  floors,
  setSelectedSeats,
  selectedSeats,
  multiSelect,
  seats,
  setSeats,
}) => {
  const addFloors = () => {
    for (let i = 0; i < (floors ? 1 : 2); i++) {
      if (seats.floors.length < (floors ? 1 : 2)) {
        seats.floors.push(seatCreator(seatAmount, floors, i));
      }
    }
  };

  const arrangeSeatNumbers = () => {
    const updatedSeats = { ...seats };

    let seatIndex = 1;

    updatedSeats.floors.forEach((floor) => {
      floor.seats.forEach((seat, index) => {
        if (seat.type === "Asiento") {
          seat.seatNumber = seatIndex.toString().padStart(2, "0");
          seatIndex++;
        } else {
          seat.seatNumber = "";
        }
      });
    });

    return updatedSeats;
  };

  useMemo(() => addFloors(), []);

  const reArrangeNumbers = useMemo(() => {
    arrangeSeatNumbers();
  }, [selectedSeats]);

  const seatHandler = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (
        seat.status === "SELECTED" &&
        Object.values(selectedSeats)[0] !== undefined
      ) {
        !multiSelect &&
          Object.keys(prevSelectedSeats).forEach((key) => {
            const status =
              Object.values(selectedSeats)[0].type === "Asiento"
                ? "FREE"
                : Object.values(selectedSeats)[0].type === "Pasillo"
                ? "HALL"
                : Object.values(selectedSeats)[0].type === "Vacío"
                ? "EMPTY"
                : Object.values(selectedSeats)[0].type === "Baño"
                ? "WC"
                : Object.values(selectedSeats)[0].type === "Escaleras" &&
                  "STAIRS";
            prevSelectedSeats[key].status = status;
          });
      }

      const updatedSelectedSeats = multiSelect ? { ...prevSelectedSeats } : {};

      if (seat.status === "SELECTED") {
        updatedSelectedSeats[`${seat.index}`] = seat;
      } else {
        delete updatedSelectedSeats[`${seat.index}`];
      }

      return updatedSelectedSeats;
    });
  };

  const handleRowOptions = (option) => {
    const updatedSeats = { ...seats };

    if (option === "add") {
      updatedSeats.floors.forEach((floor) => {
        for (let i = 0; i < 5; i++) {
          floor.push({
            seatNumber: "",
            status: i === 2 ? "HALL" : "EMPTY",
            type: i === 2 ? "Pasillo" : "Vacío",
            price: 0,
            index: floor.length,
            seatType: "",
          });
        }
      });
    } else {
      updatedSeats.floors.forEach((floor) => {
        for (let i = 0; i < 5; i++) {
          floor.pop();
        }
      });
    }

    setSeats(updatedSeats);
    arrangeSeatNumbers();
  };

  return (
    <div>
      <Bus seatHandler={seatHandler} createdSeats={seats} />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Grid item xs={6}>
          <Button
            onClick={() => handleRowOptions("add")}
            variant="contained"
            color="success"
            fullWidth
            sx={{ color: "white" }}
          >
            Agregar Fila
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => handleRowOptions("remove")}
            variant="contained"
            color="error"
            fullWidth
          >
            Quitar Fila
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SeatMatrix;
