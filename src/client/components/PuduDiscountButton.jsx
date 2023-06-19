import React from "react";

import { Button, Tooltip } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import PointsMenu from "./PointsMenu";

const PuduDiscountButton = ({ total ,setPoints}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setShowMenu(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title="Aplicar Pudú Points">
        <Button
          color="alert"
          variant="contained"
          onClick={(e) => handleOpen(e)}
          sx={{
            mt: -2.5,
            mr: -2.5,
            width: 60,
            height: 60,
            position: "absolute",
            borderRadius: 50,
            paddingRight: 0.5,
          }}
          startIcon={
            <Brightness7Icon
              sx={{
                color: "orange",
                width: 90,
                height: 90,
              }}
            />
          }
        >
          <img
            src="./Pudu Point.png"
            alt="pudu"
            width={80}
            height={80}
            style={{
              position: "absolute",
              left: -7,
              transform: "rotate(25deg)",
              filter: "drop-shadow(0px 0px 5px #ffffff) brightness(0)",

              transition: "transform .2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1) rotate(25deg)";
            }}
          />
        </Button>
      </Tooltip>
      <PointsMenu
        showMenu={showMenu}
        handleClose={() => setShowMenu(false)}
        anchorEl={anchorEl}
        total={total}
        setParentPoints={(value) => setPoints(value)}
      />
    </>
  );
};

export default PuduDiscountButton;
