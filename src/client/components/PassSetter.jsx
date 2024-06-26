import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CssBaseline,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordRecoveryApiRest from "../../auth/services/PasswordRecoveryApiRest";
import AlertDialogSlide from "../components/AlertDialog";

const PassSetter = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [passError, setPassError] = useState("");
  const [allowSave, setAllowSave] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
    onClose();
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleSave = async () => {
    const tempProfile = {
      nuevaContrasenia: password,
      confirmacionContrasenia: confirmPassword,
    };

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    PasswordRecoveryApiRest.resetPassword(token, tempProfile)
      .then((response) => {
        handleShowAlert();
        onClose();
      })
      .catch((error) => {
        setPassError(error.response.data.message);
        setAllowSave(false);
      });
  };

  const SaveError = () => {
    if (!allowSave) {
      if (password !== confirmPassword) {
        setPassError("Las contraseñas no coinciden");
      }
      if (password == "") {
        setPassError("Debe ingresar una contraseña nueva");
      }

      return <FormHelperText error>{passError}</FormHelperText>;
    } else return <></>;
  };

  return (
    <CssBaseline>
      <Grid container spacing={2} justifyContent="center">
        <Grid item sm={6}>
          <Typography variant="h5" gutterBottom>
            Cambiar Contraseña
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="password">Contraseña Nueva</InputLabel>
            <OutlinedInput
              id="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAllowSave(true);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                    edge="end"
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña Nueva"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="confirm-password">
              Confirmar Contraseña
            </InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {confirmPasswordVisible ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmar Contraseña"
            />

            <SaveError />
          </FormControl>

          <Button
            onClick={handleSave}
            disabled={!allowSave}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
      {showAlert && (
        <AlertDialogSlide
          title="Contraseña cambiada correctamente"
          text="Su contraseña ha sido actualizada correctamente."
          button="OK"
          onClose={handleHideAlert}
        />
      )}
    </CssBaseline>
  );
};

export default PassSetter;
