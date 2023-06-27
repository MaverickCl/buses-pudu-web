import React, { useEffect, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const QrReader = ({ onScan }) => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const decodeContinuously = () => {
      codeReader.decodeFromInputVideoDeviceContinuously(
        undefined,
        "video",
        (result, error) => {
          setLoading(false);
          if (result) {
            if (result.text.startsWith("pudu_qrcode=")) {
              onScan(result.text);
            } else {
              setOpen(true);
            }
          }
          if (error) {
            //console.error("Error decoding QR code:", error);
          }
        }
      );
    };

    decodeContinuously();

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="center" flexDirection="column">
        <Grid item>
          <Box display="flex" justifyContent="center" mb={2}>
            {loading && (
              <Box
                style={{
                  flex: 1,

                  margin: "auto",
                  height: isPortrait ? "30vh" : "65vh",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" gutterBottom textAlign="center">
                  Cargando Elemento...
                </Typography>
                <CircularProgress color="secondary" size={90} />
              </Box>
            )}
            <video
              id="video"
              width="100%"
              height="100%"
              style={{
                border: "5px solid #c54120",
                borderRadius: "10px",
                display: !loading ? "block" : "none",
              }}
            ></video>
          </Box>
          <Grid
            container
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              Escanea el código QR del boleto
            </Typography>
            <Typography variant="h7" textAlign="center" gutterBottom>
              Recuerda darle permiso a la cámara
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
        >
          El QR escaneado no es válido
        </Alert>
      </Snackbar>
    </>
  );
};

export default QrReader;
