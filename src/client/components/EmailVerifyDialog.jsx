import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, CircularProgress } from "@mui/material";
import EmailVerifyApiRest from "../services/EmailVerifyApiRest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmailVerifyDialog(props) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState(
    "Te enviaremos un correo para verificar tu e-mail, sólo debes abrirlo y presionar el botón"
  );
  const [title, setTitle] = useState("Verificar Correo");

  const handleClose = () => {
    props.onClose();
  };

  const handleVerify = () => {
    if (
      message !==
      "Su solicitud de validacion de correo se ha procesado exitosamente"
    ) {
      setIsVerifying(true);

      EmailVerifyApiRest.solicitarTokenValidacion(
        localStorage.getItem("token"),
        props.email
      )
        .then((response) => {
          setIsVerifying(false);
          setTitle("Correo enviado!");
          setMessage(response.message);
        })
        .catch((error) => {
          setIsVerifying(false);
          setTitle("Algo salió mal, intenta más tarde");
          setMessage(error.response.data);
        });
    } else handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {isVerifying ? (
          <>
            <DialogTitle display="flex" justifyContent="center">
              {"Te estamos mandando un correo"}
            </DialogTitle>
            <DialogContent>
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
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {message !==
              "Su solicitud de validacion de correo se ha procesado exitosamente" ? (
                <Button onClick={handleClose}>CANCELAR</Button>
              ) : (
                <></>
              )}

              <Button onClick={handleVerify}>OK!</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
