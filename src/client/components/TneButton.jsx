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

import { validateTne } from "../services/TneApiRest";

export default function CircularIntegration(props) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const timer = React.useRef();

  async function tneLogic(rut) {
    const result = await validateTne(rut);
    setLoading(false);

    if (result) {
      props.setMessage("TNE válida");
      setSuccess(true);
    } else {
      props.setMessage("TNE vencida");
      setSuccess(false);
      setInvalid(true);
    }

    return result;
  }

  const buttonSx = {
    "&:hover": {
      backgroundColor: "buttonBlue.hover",
    },
    ...(success && {
      bgcolor: "success.main",
      "&:hover": {
        bgcolor: "success.hover",
      },
    }),
    ...(loading && {
      bgcolor: "buttonBlue.main",
      "&:hover": {
        bgcolor: "buttonBlue.hover",
      },
    }),
    ...(invalid && {
      bgcolor: "alert.main",
      "&:hover": {
        bgcolor: "alert.hover",
      },
    }),
    ...(failed && {
      bgcolor: "error.hover",
      "&:hover": {
        bgcolor: "error.hover",
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    setFailed(false);
    setInvalid(false);
    setSuccess(false);

    if (props.rut !== "") {
      setLoading(true);

      props.setMessage("... Revisando");

      tneLogic(props.rut);
    } else {
      props.setMessage("Ingrese un RUT para revisar");
      setSuccess(false);
      setFailed(true);
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
          color="buttonBlue"
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
              color: "success.main",
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
