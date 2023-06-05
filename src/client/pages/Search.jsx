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
} from "@mui/material";

import { getTrips } from "../services/SearchApiRest";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
  const { origin, destination, departureTime, arrivalTime, price, date } = trip;

  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

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
              {origin} - {destination}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Fecha: {date}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Salida: {departureTime} | Llegada: {arrivalTime}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Desde:</Typography>
            <Typography variant="h4" component="h3">
              ${price}
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
            <Link to="/viaje">
              <Button sx={{ width: "100%", marginTop: 1 }} variant="contained">
                Seleccionar Asiento
              </Button>
            </Link>
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
  // ------------------
  //  TEST VALUES
  // -----------------

  const oldTrips = [
    {
      id: 1,
      origin: "New York",
      destination: "Los Angeles",
      departureTime: "10:00 AM",
      arrivalTime: "12:30 PM",
      price: 250,
      date: "15-05-2023",
    },
    {
      id: 2,
      origin: "Chicago",
      destination: "Miami",
      departureTime: "12:00 PM",
      arrivalTime: "4:00 PM",
      price: 300,
      date: "16-05-2023",
    },
    {
      id: 3,
      origin: "Houston",
      destination: "Denver",
      departureTime: "8:00 AM",
      arrivalTime: "10:30 AM",
      price: 200,
      date: "17-05-2023",
    },
    {
      id: 4,
      origin: "San Francisco",
      destination: "Seattle",
      departureTime: "11:30 AM",
      arrivalTime: "1:00 PM",
      price: 150,
      date: "18-05-2023",
    },
    {
      id: 5,
      origin: "Boston",
      destination: "Washington DC",
      departureTime: "9:00 AM",
      arrivalTime: "11:30 AM",
      price: 175,
      date: "19-05-2023",
    },
    {
      id: 6,
      origin: "Dallas",
      destination: "Houston",
      departureTime: "2:30 PM",
      arrivalTime: "4:00 PM",
      price: 75,
      date: "28-05-2023",
    },
    {
      id: 7,
      origin: "Las Vegas",
      destination: "Phoenix",
      departureTime: "6:00 AM",
      arrivalTime: "7:30 AM",
      price: 120,
      date: "30-05-2023",
    },
    {
      id: 8,
      origin: "Atlanta",
      destination: "New Orleans",
      departureTime: "12:00 PM",
      arrivalTime: "2:00 PM",
      price: 200,
      date: "01-06-2023",
    },
    {
      id: 9,
      origin: "San Francisco",
      destination: "Seattle",
      departureTime: "8:30 AM",
      arrivalTime: "11:00 AM",
      price: 150,
      date: "18-05-2023",
    },
    {
      id: 10,
      origin: "Chicago",
      destination: "Denver",
      departureTime: "1:00 PM",
      arrivalTime: "3:15 PM",
      price: 175,
      date: "20-05-2023",
    },
    {
      id: 11,
      origin: "Boston",
      destination: "Miami",
      departureTime: "9:45 AM",
      arrivalTime: "12:30 PM",
      price: 300,
      date: "22-05-2023",
    },
    {
      id: 12,
      origin: "Seattle",
      destination: "Portland",
      departureTime: "11:00 AM",
      arrivalTime: "12:15 PM",
      price: 100,
      date: "25-05-2023",
    },
  ];

  const trips = oldTrips.map((trip) => {
    const departureTime = new Date(`01/01/2021 ${trip.departureTime}`);
    const arrivalTime = new Date(`01/01/2021 ${trip.arrivalTime}`);
    const duration = arrivalTime.getTime() - departureTime.getTime();

    return {
      ...trip,
      duration: duration,
    };
  });

  // ------------------
  // END OF THEST VALUES
  // -----------------

  const [filteredArray, setFilteredArray] = useState(trips);
  const [maxItems, setMaxItems] = useState(5);

  //const [trips, setTrips] = useState([]);
  const [origin, setOrigin] = useState(localStorage.getItem("origin"));
  const [destination, setDestination] = useState(
    localStorage.getItem("destination")
  );
  const [filterValues, setFilterValues] = useState({
    sortBy: "price",
    sortOrder: "asc",
  });

  const handleSearch = async (origin, destination) => {
    setOrigin(origin);
    setDestination(destination);
    localStorage.setItem("origin", origin);
    localStorage.setItem("destination", destination);

    //handle search
    // async () => {
    //   const results = await getTrips(origin, destination);
    //   setTrips(results);
    // };
  };

  const filterArrays = useMemo(() => {
    const auxArray = trips.sort((a, b) => {
      if (filterValues.sortBy === "price") {
        return filterValues.sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
      if (filterValues.sortBy === "duration") {
        return filterValues.sortOrder === "asc"
          ? a.duration - b.duration
          : b.duration - a.duration;
      }

      if (filterValues.sortBy === "departureTime") {
        const dateA = new Date(`01/01/2021 ${a.departureTime}`);
        const dateB = new Date(`01/01/2021 ${b.departureTime}`);
        return filterValues.sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      if (filterValues.sortBy === "arrivalTime") {
        const dateA = new Date(`01/01/2021 ${a.arrivalTime}`);
        const dateB = new Date(`01/01/2021 ${b.arrivalTime}`);
        return filterValues.sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      //return new Date(b.date).getTime() - new Date(a.date).getTime();
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
            {filteredArray.slice(0, maxItems).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
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
