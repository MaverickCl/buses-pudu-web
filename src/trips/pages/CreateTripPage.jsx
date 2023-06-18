import React from "react";
import { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

import TripForm from "../components/TripForm";

const CreateTripPage = () => {
  const [trip, setTrip] = useState(null);

  return (
    <Container maxWidth="md">
      <Typography variant="h1" align="center">
        Creación de Viaje
      </Typography>

      <Grid container>
        <Grid item xs={10}>
          <TripForm setParentTrip={setTrip} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateTripPage;
