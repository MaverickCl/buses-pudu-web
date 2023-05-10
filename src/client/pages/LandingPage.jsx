import * as React from "react";
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
  Link,
  TextField,
  //Grid2,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ResponsiveAppBar from "../components/ResponsiveAppBar";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {/* {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

const theme = createTheme();

const paperHeight = `min(70vh, ${42.08}vw)`;

export default function LandingPage() {
  const [orign, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

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
                  ¿A DONDE TE LLEVAMOS HOY?
                </Typography>
                <Grid container spacing={2}>
                  <Grid item sm={6} width="100%">
                    <TextField
                      required
                      fullWidth
                      id="origin"
                      label="Origen"
                      onChange={(event) => setOrigin(event.target.value)}
                      // InputProps={{
                      //   startAdornment: <BadgeIcon color="secondary" />,
                      // }}
                    />
                  </Grid>
                  <Grid item sm={6} width="100%">
                    <TextField
                      required
                      fullWidth
                      id="destination"
                      label="Destino"
                      onChange={(event) => setDestination(event.target.value)}
                      // InputProps={{
                      //   startAdornment: <BadgeIcon color="secondary" />,
                      // }}
                    />
                  </Grid>
                </Grid>
                <CardActions
                  style={{
                    justifyContent: isPortrait ? "center" : "flex-start",
                  }}
                >
                  <Button variant="contained" size="small">
                    ver viaje
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
