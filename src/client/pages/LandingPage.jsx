import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
  Container,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import ImgMediaCard from "../components/ImgMediaCard";
import CitySelector from "../../trips/components/CitySelector";
import AlertDialogSlide from "../components/AlertDialog";

const theme = createTheme();

const paperHeight = `min(70vh, ${42.08}vw)`;

export default function LandingPage() {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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
      localStorage.setItem("destination", destination);
      localStorage.setItem("origin", origin);

      navigate("/busqueda");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar position="absolute" />

      <Paper
        elevation={3}
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: "#a3d1f5",
          zIndex: "0",
          height: paperHeight,
          overflow: "hidden",
        }}
        square
      >
        <img
          src="Banner.jpg"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            userSelect: "none",
            objectFit: "cover",
            width: "100%",
            pointerEvents: "none",
          }}
        />
      </Paper>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          marginTop: "2%",
          zIndex: "1",
          position: "relative",
          width: isPortrait ? "100%" : "55%",
          top: "10vh",
        }}
      >
        <Grid container justifyContent="space-around">
          <Container direction="column">
            <img
              src="Font.png"
              align="center"
              style={{
                position: "relative",
                userSelect: "none",
                objectFit: "cover",
                width: isPortrait ? "30vw" : "20vw",
                marginTop: isPortrait ? "0" : "7vh",
                marginLeft: isPortrait ? "0" : "7vh",
                marginBottom: isPortrait ? "1.5rem" : "0",
                pointerEvents: "none",
              }}
            />
          </Container>
          <Container>
            <Card
              sx={{
                marginTop: "1rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: ".8rem",
                position: "relative",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  marginBottom="1rem"
                  fontWeight="bold"
                  align={isPortrait ? "center" : "left"}
                >
                  ¿A DÓNDE TE LLEVAMOS HOY?
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item sm={6} width="100%">
                      <CitySelector
                        label="Origen *"
                        setCity={setOrigin}
                        required
                      />
                    </Grid>
                    <Grid item sm={6} width="100%">
                      <CitySelector
                        label="Destino *"
                        setCity={setDestination}
                        required
                      />
                    </Grid>
                  </Grid>
                  <CardActions
                    style={{
                      justifyContent: isPortrait ? "center" : "flex-start",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      // onClick={handleSearch}
                    >
                      ver viaje
                    </Button>
                  </CardActions>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Box>
      <Container position="relative" style={{ flex: 1 }} width="100%">
        <Grid
          marginTop="20vh"
          container
          spacing={4}
          justifyContent="space-evenly"
        >
          <Grid item>
            <ImgMediaCard
              image="pic_comfy.jpg"
              title="Comodidad Máxima"
              desc="Te aseguramos que contarás con los asientos mas comodos del mercado."
              imgHeight="500vh"
            />
          </Grid>
          <Grid item>
            <ImgMediaCard
              image="pic_modern.jpg"
              title="Buses Modernos"
              desc="Viaja con estilo en nuestros buses modernos y equipados con tecnología de última generación."
              imgHeight="500vh"
            />
          </Grid>
          <Grid item>
            <ImgMediaCard
              image="pic_arrive.jpg"
              title="Viaja sin complicaciones"
              desc="Deja las preocupaciones atrás y disfruta de un viaje sin contratiempos."
              imgHeight="500vh"
            />
          </Grid>
        </Grid>
      </Container>

      {showAlert && (
        <AlertDialogSlide
          title={alertData.title}
          text={alertData.message}
          button={alertData.button}
          onClose={() => setShowAlert(false)}
        />
      )}

      <Footer />
    </ThemeProvider>
  );
}
