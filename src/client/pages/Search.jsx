import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { getTrips } from "../services/SearchApiRest";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";

const TripCard = ({ trip }) => {
  const { origin, destination, departureTime, arrivalTime, price } = trip;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {origin} - {destination}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {departureTime} - {arrivalTime}
        </Typography>
        <Typography variant="h5" component="h3">
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

const InputCard = ({ handleSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(origin, destination);
  };

  return (
    <Card variant="outlined">
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
            variant="outlined"
            label="Origen"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            sx={{ margin: "0.25rem" }}
          />
          <TextField
            fullWidth
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
              justifyContent: "center",
            }}
          >
            Buscar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const FiltersCard = ({ filterValues, handleFilterChange }) => {
  const { sortBy, sortOrder } = filterValues;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Filtros
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={sortBy}
            label="Sort By"
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <MenuItem value="price">Precio</MenuItem>
            <MenuItem value="duration">Duración</MenuItem>
            <MenuItem value="departureTime">Hora Salida</MenuItem>
            <MenuItem value="arrivalTime">Hora Llegada</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-order-label">Orden</InputLabel>
          <Select
            labelId="sort-order-label"
            id="sort-order-select"
            value={sortOrder}
            label="Sort Order"
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendiente</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

const SearchResultPage = () => {
  // ------------------
  //  TEST VALUES
  // -----------------

  const trips = [
    {
      id: 1,
      origin: "New York",
      destination: "Los Angeles",
      departureTime: "10:00 AM",
      arrivalTime: "12:30 PM",
      price: 250,
    },
    {
      id: 2,
      origin: "Chicago",
      destination: "Miami",
      departureTime: "12:00 PM",
      arrivalTime: "4:00 PM",
      price: 300,
    },
    {
      id: 3,
      origin: "Houston",
      destination: "Denver",
      departureTime: "8:00 AM",
      arrivalTime: "10:30 AM",
      price: 200,
    },
    {
      id: 4,
      origin: "San Francisco",
      destination: "Seattle",
      departureTime: "11:30 AM",
      arrivalTime: "1:00 PM",
      price: 150,
    },
    {
      id: 5,
      origin: "Boston",
      destination: "Washington DC",
      departureTime: "9:00 AM",
      arrivalTime: "11:30 AM",
      price: 175,
    },
  ];

  // ------------------
  // END OF THEST VALUES
  // -----------------

  //const [trips, setTrips] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [filterValues, setFilterValues] = useState({
    sortBy: "price",
    sortOrder: "asc",
  });

  //   useEffect(() => {
  //     const fetchTrips = async () => {
  //       const results = await getTrips(origin, destination);
  //       setTrips(results);
  //     };
  //     fetchTrips();
  //   }, [origin, destination]);

  const handleSearch = () => {
    // Do something with the search input values
  };

  const handleFiltersChange = (key, value) => {
    setFilterValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" />
      <Container sx={{ marginTop: "5rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={13}>
            <InputCard
              origin={origin}
              destination={destination}
              onSearch={handleSearch}
              onOriginChange={(value) => setOrigin(value)}
              onDestinationChange={(value) => setDestination(value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FiltersCard
              filterValues={filterValues}
              handleFilterChange={handleFiltersChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </CssBaseline>
  );
};

export default SearchResultPage;
