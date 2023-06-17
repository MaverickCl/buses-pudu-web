import * as React from "react";

import {
  Grid,
  Button,
  Typography,
  CssBaseline,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Container,
  InputAdornment,
  IconButton,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { login } from "../services/SignInApiRest";

import ResponsiveAppBar from "../../client/components/ResponsiveAppBar";
import Footer from "../../client/components/Footer";
import ForgottenAlert from "../components/ForgottenAlert";

const theme = createTheme();

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginMessage, setLoginMessage] = useState("Ingresar");
  const [loginIcon, setLoginIcon] = useState(<LockOutlinedIcon />);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginMessage("Ingresando...");
    setLoginIcon(<CircularProgress size={24} color="inherit" />);

    try {
      const result = await loginLogic(correo, contrasenia);

      if (!result) {
        return;
      } else navigate("/");
    } catch (error) {
      setLoginError(error.response.data);
      setLoginMessage("Ingresar");
      setLoginIcon(<LockOutlinedIcon />);
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
              <Box onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <form>
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
                  <FormControl fullWidth sx={{ mb: 2 }} required>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                      id="confirm-password"
                      type={passwordVisible ? "text" : "password"}
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handlePasswordVisibility}
                            edge="end"
                          >
                            {passwordVisible ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Contraseña"
                    />
                  </FormControl>
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
                    startIcon={loginIcon}
                  >
                    {loginMessage}
                  </Button>
                </form>
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
