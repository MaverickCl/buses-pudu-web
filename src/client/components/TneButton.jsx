import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red, blue, orange } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function CircularIntegration(props) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const timer = React.useRef();
  //const { setMessage } = props;

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    },
    loading && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    },
    invalid && {
      bgcolor: orange[500],
      "&:hover": {
        bgcolor: orange[700],
      },
    },
    failed && {
      bgcolor: red[500],
      "&:hover": {
        bgcolor: red[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    //FIX REQUEST OPOTIONS TO WORK WITH API
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzg3NjM4LCJpYXQiOjE2ODMxODc2MzgsImp0aSI6ImNiZDA0MGI1MjI5ZTQwNTc4M2MxMTI2NzQwMDU2MzdjIiwidXNlcl9pZCI6Mn0.CHnMOZ_ywCobzdNBAOefKChFhwW2-Jy3Og28JHgaGDw",
      },
      body: JSON.stringify({
        rut: props.rut,
      }),
    };

    //FIX URL TO WORK WITH API
    const apiUrl =
      "https://592f-190-5-45-133.ngrok-free.app/api/v1/random/test/";

    setFailed(false);

    if (props.rut !== "") {
      if (!loading) {
        props.setMessage("...Revisando");
        setSuccess(false);
        setLoading(true);

        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data) {
              // revisar si esta el rut
              if (data.tneValidity) {
                // revisar si el rut tiene tne valida
                props.setMessage("TNE válida");
                setSuccess(true);
                setLoading(false);
                setInvalid(false);
                setFailed(false);
              } else {
                props.setMessage("TNE vencida");
                setSuccess(false);
                setLoading(false);
                setInvalid(true);
                setFailed(false);
              }
            } else {
              props.setMessage("El rut ingresado no posee TNE");
              setSuccess(false);
              setLoading(false);
              setInvalid(true);
              setFailed(false);
            }
          })
          .catch((error) => {
            console.error("Error checking TNE:", error);
            props.setMessage("No fué posible revisar tu RUT");
            setSuccess(false);
            setLoading(false);
            setInvalid(false);
            setFailed(true);
            return false;
          });
      }
    } else {
      props.setMessage("Ingrese un RUT para revisar");
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          m: -0.3,
          marginLeft: "0.7rem",
          marginRight: "0.5rem",
          position: "relative",
        }}
      >
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
          onMouseOver={() => setHovering(true)}
          onMouseOut={() => setHovering(false)}
        >
          {success ? (
            <CheckRoundedIcon />
          ) : loading ? (
            <AutorenewRoundedIcon />
          ) : failed && !hovering ? (
            <PriorityHighRoundedIcon />
          ) : failed && hovering ? (
            <AutorenewRoundedIcon />
          ) : invalid ? (
            <CancelRoundedIcon />
          ) : (
            <CreditCardIcon />
          )}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
