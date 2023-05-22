import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControlLabel,
  CssBaseline,
} from "@mui/material";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

import TneButton from "../../client/components/TneButton";
import PhoneInput from "../../client/components/PhoneInput";
import ResponsiveAppBar from "../../client/components/ResponsiveAppBar";
import Footer from "../../client/components/Footer";

import { register } from "../services/SignUpApiRest";

const Registry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [tne, setTne] = useState(false);
  const [tneMessage, setTneMessage] = useState("Tienes una TNE vigente?");

  const formattedBirthDate = birthDate ? format(birthDate, "dd-MM-yyyy") : "";

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await registerLogic(
        name,
        rut,
        phoneNumber,
        formattedBirthDate,
        email,
        password
      );

      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  async function registerLogic(
    nombre,
    rut,
    contacto,
    birthDate,
    correo,
    contrasenia
  ) {
    const result = await register(
      nombre,
      rut,
      contacto,
      birthDate,
      correo,
      contrasenia
    );

    return true;
  }

  const formatRut = (value) => {
    // Remove all characters except numbers and the letter k or K
    const rutNumbers = value.replace(/[^0-9kK]/g, "");

    if (rutNumbers.length > 1) {
      // Format the RUT with dots and hyphen
      const formattedRut = `${rutNumbers
        .slice(0, -1)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${rutNumbers
        .slice(-1)
        .toUpperCase()}`;
      setRut(formattedRut);
    } else {
      setRut(rutNumbers.toUpperCase());
    }
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" />
      <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ marginTop: "-4.5rem" }}
          >
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
                  onChange={(event) => formatRut(event.target.value)}
                  InputProps={{
                    startAdornment: <BadgeIcon color="secondary" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <TneButton
                      onChange={(value) => setTne(value)}
                      setMessage={setTneMessage}
                      name="tne"
                      rut={rut}
                    />
                  }
                  label={tneMessage}
                />
              </Grid>

              <Grid item xs={12}>
                <PhoneInput
                  onChange={(value) => setPhoneNumber(value)}
                  icon={true}
                  number=""
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  type="email"
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
        </Grid>
      </Container>
      <Footer />
    </CssBaseline>
  );
};

export default Registry;
