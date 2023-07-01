import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControlLabel,
  CssBaseline,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";

import { es } from "date-fns/locale";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import TneButton from "../../client/components/TneButton";
import PhoneInput from "../../client/components/PhoneInput";
import ResponsiveAppBar from "../../client/components/ResponsiveAppBar";
import Footer from "../../client/components/Footer";
import AlertDialog from "../../client/components/AlertDialog";

import { register } from "../services/SignUpApiRest";

const Registry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [tne, setTne] = useState(false);
  const [tneMessage, setTneMessage] = useState("Tienes una TNE vigente?");

  const [registerMessage, setRegisterMessage] = useState("Registrarse");
  const [registerIcon, setRegisterIcon] = useState(<PersonAddIcon />);
  const [showAlert, setShowAlert] = useState(false);

  const formattedBirthDate = birthDate ? format(birthDate, "dd-MM-yyyy") : "";

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!birthDate) {
      alert("Debes ingresar tu fecha de nacimiento");
    } else {
      setRegisterMessage("Registrando...");
      setRegisterIcon(<CircularProgress size={24} color="inherit" />);
      try {
        await registerLogic(
          name,
          rut,
          phoneNumber,
          formattedBirthDate,
          email,
          password,
          tne
        );

        setRegisterMessage("Registrado!");
        setRegisterIcon(<CheckIcon />);
        setShowAlert(true);
      } catch (error) {
        setRegisterMessage("Registrarse");
        setRegisterIcon(<PersonAddIcon />);
        console.error(error);
      }
    }
  };

  const handleShowAlert = () => {
    navigate("/auth/login");
    setShowAlert(false);
  };

  async function registerLogic(
    nombre,
    rut,
    contacto,
    birthDate,
    correo,
    contrasenia,
    estadoTne
  ) {
    const result = await register(
      nombre,
      rut,
      contacto,
      birthDate,
      correo,
      contrasenia,
      estadoTne
    );

    return true;
  }

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
                  required
                >
                  <DatePicker
                    sx={{ display: "flex" }}
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
                <FormControl fullWidth sx={{ mb: 2 }} required>
                  <InputLabel htmlFor="password">Contraseña</InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handlePasswordVisibility}
                          edge="end"
                        >
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock color="secondary" />
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="center"></Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={registerIcon}
            >
              {registerMessage}
            </Button>
          </form>
        </Grid>
      </Container>
      <Footer />

      {showAlert && (
        <AlertDialog
          title="Su cuenta se ha creado exitosamente!"
          text="Redireccionando a la página de inicio de sesión..."
          button="OK"
          onClose={() => handleShowAlert(false)}
        />
      )}
    </CssBaseline>
  );
};

export default Registry;
