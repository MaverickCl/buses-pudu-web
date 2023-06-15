import React, { useState, useEffect, useMemo, isPortrait } from "react";
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
  CircularProgress,
  Box,
} from "@mui/material";

import SearchApiRest from "../services/SearchApiRest";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
  const { origen, destino, horaSalida, horaLlegada, precio, fecha } = trip;

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("trip", JSON.stringify(trip));
    window.location.href = "/viaje";
  };

  return (
    <Card
      style={{
        backgroundColor: "#f8f8f8",
        marginBottom: 5,
      }}
    >
      <CardContent sx={{ margin: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6" component="h2">
              {origen} - {destino}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Fecha: {fecha}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Salida: {horaSalida} | Llegada: {horaLlegada}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Desde:</Typography>
            <Typography variant="h4" component="h3">
              ${precio}
            </Typography>
            {!isPortrait && (
              <Link to="/viaje">
                <Button variant="contained">Seleccionar Asiento</Button>
              </Link>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isPortrait && (
            <Button
              onClick={handleSubmit}
              sx={{ width: "100%", marginTop: 1 }}
              variant="contained"
            >
              Seleccionar Asiento
            </Button>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

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

const FiltersCard = ({ filterValues, handleFilterChange }) => {
  const { sortBy, sortOrder } = filterValues;

  return (
    <Card
      style={{
        border: "solid 1px #f8f8f8",
        marginBottom: 5,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Filtros
        </Typography>
        <FormControl
          sx={{ marginBottom: "1rem", minWidth: 120, width: "100%" }}
        >
          <InputLabel id="sort-by-label">Ordenar</InputLabel>
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
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
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
  const [trips, setTrips] = useState([]);
  const [filteredArray, setFilteredArray] = useState(trips);
  const [maxItems, setMaxItems] = useState(5);
  const [origin, setOrigin] = useState(localStorage.getItem("origin"));
  const [destination, setDestination] = useState(
    localStorage.getItem("destination")
  );
  const [filterValues, setFilterValues] = useState({
    sortBy: "price",
    sortOrder: "asc",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTrips(origin, destination);
  }, []);

  const fetchTrips = async (origin, destination) => {
    setIsLoading(true);
    try {
      const trips = await SearchApiRest.getTrips(origin, destination);

      setTrips(
        trips.map((trip) => {
          const departureTime = new Date(`01/01/2021 ${trip.horaSalida}`);
          const arrivalTime = new Date(`01/01/2021 ${trip.horaLlegada}`);
          const duration = arrivalTime.getTime() - departureTime.getTime();

          return {
            ...trip,
            duration: duration,
          };
        })
      );

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (origin, destination) => {
    setOrigin(origin);
    setDestination(destination);
    localStorage.setItem("origin", origin);
    localStorage.setItem("destination", destination);

    fetchTrips(origin, destination);
  };

  const updateTrips = useMemo(() => {
    setFilteredArray(trips);
  }, [trips]);

  const filterArrays = useMemo(() => {
    const auxArray = trips.sort((a, b) => {
      if (filterValues.sortBy === "price") {
        return filterValues.sortOrder === "asc"
          ? a.precio - b.precio
          : b.precio - a.precio;
      }
      if (filterValues.sortBy === "duration") {
        return filterValues.sortOrder === "asc"
          ? a.duration - b.duration
          : b.duration - a.duration;
      }

      if (filterValues.sortBy === "departureTime") {
        const dateA = new Date(`01/01/2021 ${a.horaSalida}`);
        const dateB = new Date(`01/01/2021 ${b.horaSalida}`);
        return filterValues.sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      if (filterValues.sortBy === "arrivalTime") {
        const dateA = new Date(`01/01/2021 ${a.horaLlegada}`);
        const dateB = new Date(`01/01/2021 ${b.horaLlegada}`);
        return filterValues.sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
    });
    setFilteredArray(auxArray);
  }, [filterValues]);

  const handleFiltersChange = (key, value) => {
    setFilterValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const ButtonLoad = () => {
    if (maxItems < trips.length) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            setMaxItems(maxItems + 5);
          }}
        >
          Cargar Más
        </Button>
      );
    } else {
      return <></>;
    }
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
              handleSearch={handleSearch}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FiltersCard
              filterValues={filterValues}
              handleFilterChange={handleFiltersChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            {isLoading ? (
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
            ) : (
              <>
                {filteredArray.slice(0, maxItems).map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </>
            )}

            <Grid container justifyContent="center" alignItems="center">
              <ButtonLoad
                sx={{
                  justifyContent: "center",
                  margin: "auto",
                  display: "flex",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </CssBaseline>
  );
};

export default SearchResultPage;
