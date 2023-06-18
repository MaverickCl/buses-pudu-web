import React, { useEffect, useMemo } from "react";
import {
  Grid,
  Button,
  Card,
  Divider,
  Collapse,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import InputForm from "./InputForm";
import AlertDialogSlide from "./AlertDialog";

const FrecuentPassengersCard = ({
  frecuentPassengers,
  setFrecuentPassengers,
}) => {
  const [currentPassenger, setCurrentPassenger] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    title: "Finaliza primero",
    message: "Primero debes completar el formulario actual",
    button: "Ok",
  });
  const [deleteIndex, setDeleteIndex] = React.useState();

  const handleComplete = () => {
    setCurrentPassenger(Object.values(frecuentPassengers).length);
  };

  const handleBack = () => {
    if (Object.values(frecuentPassengers)[currentPassenger].name === "") {
      deletePassenger(currentPassenger);
    } else {
      setCurrentPassenger(Object.values(frecuentPassengers).length);
    }
  };

  const handleDelete = (index) => {
    setAlertMessage({
      title: "Eliminar pasajero",
      message: "Estas seguro que quieres eliminar este pasajero?",
      button: "Eliminar",
      cancelButton: "Cancelar",
    });

    setDeleteIndex(index);

    setAlertStatus(null);
    setShowAlert(true);
  };

  useEffect(() => {
    if (alertStatus) {
      deletePassenger();
    }
  }, [alertStatus]);

  const deletePassenger = (i) => {
    const updatedPassengers = { ...frecuentPassengers };
    {
      !i ? delete updatedPassengers[deleteIndex] : delete updatedPassengers[i];
    }

    const newPassengers = {};

    Object.keys(updatedPassengers).forEach((key, index) => {
      newPassengers[index] = updatedPassengers[key];
    });

    setFrecuentPassengers(newPassengers);
    setCurrentPassenger(Object.values(newPassengers).length);
  };

  const handleEdit = (index) => {
    setCurrentPassenger(index);
  };

  const handleCloseAlert = (status) => {
    setShowAlert(false);
    setAlertStatus(status);
  };

  const addFrecuentPassenger = () => {
    if (currentPassenger === Object.values(frecuentPassengers).length) {
      setFrecuentPassengers(() => {
        const updatedPassengers = {
          ...frecuentPassengers,
          [Object.values(frecuentPassengers).length]: {
            name: "",
            email: "",
            phone: "+56",
            rut: "",
            tne: false,
          },
        };
        return updatedPassengers;
      });

      setCurrentPassenger(Object.values(frecuentPassengers).length);
    } else {
      setAlertMessage({
        title: "Finaliza primero",
        message: "Primero debes completar el formulario actual",
        button: "Ok",
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      <Card sx={{ p: 2, mt: -3, backgroundColor: "#f8f8f8" }}>
        <Grid container justifyContent="space-between">
          <Typography variant="h5" sx={{ mb: 3 }}>
            Pasajeros frecuentes
          </Typography>
          <Tooltip title="Pasajeros Frecuentes?" sx={{ p: 0 }}>
            <IconButton
              color="alert"
              onClick={() => {
                setAlertMessage({
                  title: "Agrega pasajeros frecuentes",
                  message:
                    "Sueles viajar acompañado? Agrega pasajeros frecuentes para no tener que ingresar sus datos cada vez que compres un pasaje.",
                  button: "Ok",
                });
                setShowAlert(true);
              }}
              sx={{ mb: 2 }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid container display="contents">
          {Object.values(frecuentPassengers).map((passenger, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{ padding: 0, marginBottom: -2 }}
            >
              <Divider light />
              {passenger.name !== "" && (
                <Grid container justifyContent="space-between" mb={2}>
                  <Grid item xs={8} sm={10}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      {passenger.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3.2} sm={2} mt={0.5} flexDirection="row">
                    <Tooltip title="Editar">
                      <IconButton
                        color="success"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Eliminar"
                      onClick={() => handleDelete(index)}
                    >
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              )}

              <Collapse in={currentPassenger == index}>
                <InputForm
                  handleComplete={handleComplete}
                  handleBack={handleBack}
                  index={index}
                  passengers={frecuentPassengers}
                  setPassengers={setFrecuentPassengers}
                  back={true}
                />
              </Collapse>
            </Grid>
          ))}
          <Divider light />
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            sx={{ mt: 1 }}
          >
            <Tooltip title="Agregar pasajero frecuente">
              <Button
                variant="contained"
                type="submit"
                onClick={() => addFrecuentPassenger()}
                sx={{ p: 2.5, borderRadius: 100 }}
              >
                <AddIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>

      {showAlert && (
        <AlertDialogSlide
          title={alertMessage.title}
          text={alertMessage.message}
          onClose={() => handleCloseAlert(true)}
          button={alertMessage.button}
          cancelButton={alertMessage.cancelButton}
          onCancel={() => handleCloseAlert(false)}
        />
      )}
    </>
  );
};

export default FrecuentPassengersCard;
