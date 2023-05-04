import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { es } from "date-fns/locale";
import { parseISO } from "date-fns";
import {
  AccountCircle,
  Email,
  Lock,
  CalendarMonth,
  Phone,
} from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TneButton from "../components/TneButton";

//import ResponsiveAppBar from "../components/ResponsiveAppBar";

import { register } from "../services/ApiRest";

const Registry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [tne, setTne] = useState(false);
  const [tneMessage, setTneMessage] = useState("Tienes una TNE vigente?");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({ name, birthDate, rut, phoneNumber, email, password });
    registerLogic(name, rut, phoneNumber, email, password);
  };

  async function registerLogic(nombre, rut, contacto, correo, contrasenia) {
    const result = await register(nombre, rut, contacto, correo, contrasenia);

    return true;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registro
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="Name"
              label="Nombre Completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
              InputProps={{
                startAdornment: <AccountCircle color="secondary" />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DatePicker
                sx={{ display: "flex" }}
                required
                fullWidth
                id="birthDate"
                label="Fecha Nacimiento"
                value={birthDate}
                onChange={(date) => setBirthDate(date)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="rut"
              label="RUT"
              value={rut}
              onChange={(event) => setRut(event.target.value)}
              InputProps={{
                startAdornment: <BadgeIcon color="secondary" />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <TneButton
                  onChange={(event) => setTne(event.target.checked)}
                  setMessage={setTneMessage}
                  name="tne"
                  rut={rut}
                />
              }
              label={tneMessage}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phoneNumber"
              label="Numero de Teléfono"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              InputProps={{
                startAdornment: <Phone color="secondary" />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              InputProps={{
                startAdornment: <Email color="secondary" />,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <TextField
              required
              fullWidth
              id="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                startAdornment: <Lock color="secondary" />,
              }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center"></Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default Registry;