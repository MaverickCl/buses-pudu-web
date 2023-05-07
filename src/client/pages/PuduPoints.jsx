import * as React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CssBaseline,
} from "@mui/material";

import ResponsiveAppBar from "../components/ResponsiveAppBar";

function Puntos() {
  const [puntos, setPuntos] = React.useState(150);
  const [historial, setHistorial] = React.useState([
    { fecha: "01/01/2022", puntos: 100 },
    { fecha: "01/02/2022", puntos: 50 },
  ]);

  const canjearPuntos = () => {
    setPuntos(0);
    setHistorial((prevHistorial) => [
      ...prevHistorial,
      { fecha: new Date().toLocaleDateString(), puntos: -150 },
    ]);
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" />

      <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tus Puntos
              </Typography>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {puntos}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={canjearPuntos}
                disabled={puntos < 150}
              >
                Canjear Puntos
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Historial de Puntos
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell align="right">Puntos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historial.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.fecha}
                        </TableCell>
                        <TableCell align="right">{item.puntos}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
}

export default Puntos;
