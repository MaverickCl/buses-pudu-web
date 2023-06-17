import React, { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const InputCard = ({ handleSearch }) => {
  const [origin, setOrigin] = useState(localStorage.getItem("origin"));
  const [destination, setDestination] = useState(
    localStorage.getItem("destination")
  );

  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(origin, destination);
  };

  return (
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
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Origen"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            sx={{ margin: "0.25rem" }}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Destino"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            sx={{ margin: "0.25rem" }}
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
  );
};

export default InputCard;
