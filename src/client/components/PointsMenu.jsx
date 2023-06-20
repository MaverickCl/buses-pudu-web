import * as React from "react";

import {
  Avatar,
  Menu,
  Divider,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const PointsMenu = ({
  showMenu,
  handleClose,
  anchorEl,
  total,
  setParentPoints,
  userPoints,
}) => {
  //SET POINTS TO USER'S
  const [points, setPoints] = React.useState(userPoints);
  const [pointsToUse, setPointsToUse] = React.useState(0);

  React.useEffect(() => {
    setPoints(userPoints);
  }, [userPoints]);

  const handlePoints = (value) => {
    if (value >= 0 && value <= points) {
      if (value < total * 0.2) {
        setPointsToUse(value);
      } else {
        setPointsToUse(total * 0.2);
      }
    }
  };

  const handleSubmit = () => {
    setParentPoints(pointsToUse);
    handleClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={showMenu}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Grid
          container
          justifyContent="center"
          flexDirection="row"
          p={1}
          spacing={3}
        >
          <Grid item xs={2}>
            <Avatar sx={{ width: 30, height: 30 }} />
          </Grid>
          <Grid item xs={9} mt={0.4}>
            <Typography>Tus Pudú Points</Typography>
          </Grid>
        </Grid>

        <Divider />
        <Grid
          container
          justifyContent="space-between"
          flexDirection="row"
          p={1}
          pl={2}
          pb={0}
          spacing={3}
        >
          <Grid item xs={2}>
            <Typography mt={0.4}>Tienes</Typography>
          </Grid>
          <Grid item xs={9} mr={1.2} flexDirection="row">
            <Grid container justifyContent="flex-end" flexDirection="row">
              <img src="./Pudu Point.png" style={{ width: 30, height: 30 }} />
              <Typography mt={0.4}>{points - pointsToUse}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          flexDirection="row"
          p={1}
          pl={2}
          pb={0}
          spacing={3}
        >
          <Grid item xs={3}>
            <Typography mt={0.4}>Usar</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Points"
              type="number"
              variant="standard"
              size="small"
              helperText={pointsToUse == total * 0.2 && "Máximo 20%"}
              error={pointsToUse == total * 0.2}
              onChange={(e) => {
                handlePoints(e.target.value);
              }}
              value={pointsToUse}
              sx={{ maxWidth: 120, height: 30, mt: -2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: -1 }}>
                    <img
                      src="./Pudu Point.png"
                      style={{ width: 30, height: 30 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-around"
          flexDirection="row"
          p={1}
          mt={1}
          pl={2}
          pb={0}
          ml={2}
        >
          <Grid item xs={6}>
            <Tooltip title="Cancelar">
              <IconButton
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                <CancelRoundedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Aplicar Puntos">
              <IconButton
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                <CheckCircleRoundedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Menu>
    </>
  );
};

export default PointsMenu;
