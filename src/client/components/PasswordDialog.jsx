import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordDialog = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSave = () => {
    // Save password
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cambiar Contraseña</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="current-password">Contraseña actual</InputLabel>
          <OutlinedInput
            id="current-password"
            type={currentPasswordVisible ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle current password visibility"
                  onClick={handleCurrentPasswordVisibility}
                  edge="end"
                >
                  {currentPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña Actual"
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <OutlinedInput
            id="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            label="Contraseña"
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
                  {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirmar Contraseña"
          />
          {password !== confirmPassword && (
            <FormHelperText error>Las contraseñas no coinciden</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSave}
          disabled={password !== confirmPassword}
          variant="contained"
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordDialog;
