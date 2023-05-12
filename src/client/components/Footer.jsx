import * as React from "react";
import { Typography, Container, Box, Link } from "@mui/material";

import theme from "../../theme/theme";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Buses Pudú
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        marginTop: "2rem",
        bgcolor: theme.palette.secondaryLight.main,
        width: "100%",
        color: "white",
        bottom: "0",
        right: "0",
        left: "0",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{ bgcolor: theme.palette.secondaryLight.main, p: 6 }}
          component="footer"
        >
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Buses Pudú
          </Typography>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;