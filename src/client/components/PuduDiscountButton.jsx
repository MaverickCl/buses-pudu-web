import React from "react";

import { Button, Divider, Grid, Tooltip, Typography } from "@mui/material";

import PointsMenu from "./PointsMenu";

const PuduDiscountButton = ({ total, setPoints, userPoints }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setShowMenu(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Grid container flexDirection="column">
        <Divider />
      </Grid>
      <Grid container alignItems="center" my={1}>
        <Typography variant="h6" mr={2}>
          Usar Pudú Points
        </Typography>
        <Tooltip title="Aplicar Pudú Points">
          <Button
            color="alert"
            variant="contained"
            onClick={(e) => handleOpen(e)}
            sx={{
              width: 50,
              height: 35,

              borderRadius: 50,
            }}
          >
            <img
              src="./Pudu Point.png"
              alt="pudu"
              width={35}
              height={35}
              style={{
                filter: "drop-shadow(0px 0px 5px #ffffff) brightness(0)",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) ";
              }}
            />
          </Button>
        </Tooltip>
        <PointsMenu
          showMenu={showMenu}
          handleClose={() => setShowMenu(false)}
          anchorEl={anchorEl}
          total={total}
          userPoints={userPoints}
          setParentPoints={(value) => setPoints(value)}
        />
      </Grid>
    </>
  );
};

export default PuduDiscountButton;
