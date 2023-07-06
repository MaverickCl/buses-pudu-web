import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import ResponsiveAppBar from '../../client/components/ResponsiveAppBar'
import Preview from '../components/Preview'
import theme from '../../theme/theme'
import { Button, Container, CssBaseline, Grid } from '@mui/material'
import ItinerarioApiRest from '../services/ItinerarioApiRest'



export const Itinerario = () => {

  const [trips, setTrips] = useState([]);
  const [filteredArray, setFilteredArray] = useState(trips);
  const [maxItems, setMaxItems] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchTrips(token);
  }, []);

  const fetchTrips = async (token) => {
    setIsLoading(true);
    try {
      const trips = await ItinerarioApiRest.getTrips(token);

      setTrips(
        trips.map((trip) => {
          

          return {
            ...trip,
            
          };
        })
      );

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const updateTrips = useMemo(() => {
    setFilteredArray(trips);
  }, [trips]);
  
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
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <ResponsiveAppBar position="absolute" />
    <Container
        maxWidth="sm"
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
    {filteredArray.slice(0, maxItems).map((trip) => (
                      <Preview key={trip.id} trip={trip} />
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
    </Container>
    </ThemeProvider>
  )
}
