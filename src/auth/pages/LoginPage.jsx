import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/SignInApiRest";

import ResponsiveAppBar from "../../client/components/ResponsiveAppBar";
import Footer from "../../client/components/Footer";
import { FormHelperText } from "@mui/material";
import ForgottenAlert from "../components/ForgottenAlert";

const theme = createTheme();

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginLogic(correo, contrasenia);

      if (!result) {
        return;
      } else navigate("/");
    } catch (error) {
      setLoginError(error.response.data);
    }
  };

  async function loginLogic(correo, contrasenia) {
    const result = await login(correo, contrasenia);

    if (result) {
      const token = result.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }

  const handleRecoverPass = async () => {
    setOpenAlert(true);
  };

  const LoginErrorDisplay = () => {
    let errorText = "";

    if (loginError !== "") {
      if (correo === "") {
        errorText = "Debe ingresar un correo";
      } else if (contrasenia === "") {
        errorText = "Debe ingresar una contraseña";
      } else {
        errorText = loginError;
      }
    }

    return errorText !== "" ? (
      <FormHelperText error>{errorText}</FormHelperText>
    ) : null;
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" isLoggedIn={isLoggedIn} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Grid container height="90vh" alignItems="center">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Ingreso
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Correo Eléctronico"
                  name="correo"
                  autoComplete="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="contrasenia"
                  label="Contraseña"
                  type="password"
                  id="contrasenia"
                  autoComplete="current-password"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                />
                <LoginErrorDisplay />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Recuérdame"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ingresar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link onClick={handleRecoverPass} variant="body2">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/auth/registro" variant="body2">
                      {"¿No tienes una cuenta? Regístrate"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>

      <ForgottenAlert open={openAlert} onClose={() => setOpenAlert(false)} />

      <Footer />
    </CssBaseline>
  );
}
