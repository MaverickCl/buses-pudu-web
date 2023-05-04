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
import { login } from "../services/ApiRest";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

/* interface DecodedData {
  roles: string[];
} */

async function loginLogic(correo, contrasenia) {
  const result = await login(correo, contrasenia);

  if (result) {
    const token = result.split(" ")[1];
    localStorage.setItem("token", token);
    return true;
  }

  return false;
}

/* function navigateToUserPage() {
  
}  */
export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loginError, setLoginError] = useState(false);

  //const data = new FormData(e.target);
  /* useEffect(() => {
    console.log({
      correo: data.get('correo'),
      contrasenia: data.get('contrasenia'),
  })
  }); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginLogic(correo, contrasenia);
    if (!result) {
      setLoginError(true);
      return;
    }

    //localStorage.setItem("roles", decodedData.roles.toString());

    // const roles = localStorage.getItem('roles') || "";
    // console.log(roles.split(',').includes('ROLE_COORDINADOR'))
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign in
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
              label="Email Address"
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
              label="password"
              type="password"
              id="contrasenia"
              autoComplete="current-password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
            />
            {loginError && "Error de login"}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
