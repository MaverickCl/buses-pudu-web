import * as React from "react";
import {
  Box,
  CircularProgress,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import PasswordRecoveryApiRest from "../services/PasswordRecoveryApiRest";

export default function ForgottenAlert({ open, onClose }) {
  const [email, setEmail] = React.useState("");
  const [allowContinue, setAllowContinue] = React.useState(false);
  const [title, setTitle] = React.useState("¿Olvidaste tu contraseña?");
  const [message, setMessage] = React.useState(
    "Ingresa tu correo electrónico y te enviaremos un enlace para que restablezcas tu contraseña."
  );
  const [isSending, setIsSending] = React.useState(false);

  const handleHideAlert = () => {
    onClose();
  };

  const handleSubmit = () => {
    if (title === "¿Olvidaste tu contraseña?") {
      setIsSending(true);

      setTitle("Enviando correo...");

      PasswordRecoveryApiRest.requestPasswordRecovery(email)
        .then((response) => {
          setIsSending(false);
          setTitle("Correo enviado!");
          setMessage(
            "El correo de restablecimiento se ha enviado exitosamente"
          );
        })
        .catch((error) => {
          setIsSending(false);
          setTitle("Ups!");
          setMessage(error.response.data.message);
        });
    } else handleHideAlert();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleHideAlert}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {isSending ? (
            <Box
              style={{
                flex: 1,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <CircularProgress color="secondary" size={90} />
            </Box>
          ) : (
            <>
              <DialogContentText>{message}</DialogContentText>
              {title == "¿Olvidaste tu contraseña?" && (
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Correo electrónico"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAllowContinue(true);
                  }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <>
            {!isSending && (
              <>
                {title !== "Ups!" && title !== "Correo enviado!" && (
                  <Button onClick={handleHideAlert}>Cancelar</Button>
                )}
                <Button onClick={handleSubmit} disabled={!allowContinue}>
                  Aceptar
                </Button>
              </>
            )}
          </>
        </DialogActions>
      </Dialog>
    </div>
  );
}
