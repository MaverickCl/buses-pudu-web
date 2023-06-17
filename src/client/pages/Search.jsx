import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  Button,
  CssBaseline,
  CircularProgress,
  Box,
} from "@mui/material";

import SearchApiRest from "../services/SearchApiRest";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import TripCard from "../components/TripCard";
import InputCard from "../components/InputCard";
import FiltersCard from "../components/FiltersCard";

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
