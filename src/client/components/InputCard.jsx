import React, { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import CitySelector from "../../trips/components/CitySelector";
import AlertDialogSlide from "./AlertDialog";

const InputCard = ({ handleSearch }) => {
  const [origin, setOrigin] = useState(localStorage.getItem("origin"));
  const [destination, setDestination] = useState(
    localStorage.getItem("destination")
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (origin === "" || destination === "") {
      setAlertData({
        title: "Rellena los campos",
        message: "Debes seleccionar un origen y un destino",
        button: "Aceptar",
      });
      setShowAlert(true);
    } else if (origin === destination) {
      setAlertData({
        title: "A donde vas?",
        message: "El origen y el destino no pueden ser iguales",
        button: "Aceptar",
      });
      setShowAlert(true);
    } else {
      handleSearch(origin, destination);
    }
  };

  return (
    <>
      <Card
        style={{
          border: "solid 2px #efefef",
          marginBottom: 5,
        }}
      >
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: isPortrait ? "block" : "flex",
              justifyContent: "center",
            }}
          >
            <CitySelector
              label="Origen *"
              setCity={setOrigin}
              city={origin}
              required
            />
            <CitySelector
              label="Destino *"
              setCity={setDestination}
              city={destination}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                margin: "0.25rem",
                padding: ".5rem 3rem",
                justifyContent: "center",
                width: isPortrait ? "100%" : "",
              }}
            >
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>

      {showAlert && (
        <AlertDialogSlide
          onClose={() => setShowAlert(false)}
          title={alertData.title}
          text={alertData.message}
          button={alertData.button}
        />
      )}
    </>
  );
};

export default InputCard;
