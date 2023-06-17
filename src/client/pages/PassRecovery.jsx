import React from "react";
import { Box, CardContent, Card, Grid } from "@mui/material";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import PassSetter from "../components/PassSetter";

const PassRecovery = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  //PASS RECOVERY INPUT

  return (
    <div>
      <ResponsiveAppBar position="absolute" />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        marginTop="2rem"
      >
        <Card
          sx={{
            width: "80%",
            backgroundColor: "#f3f6f4",
            display: "flex",
            flexDirection: isPortrait ? "column" : "row",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={8}>
                <PassSetter />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src="/RecoverPass.png"
                  style={{
                    marginRight: "0.5rem",
                    width: "100%",
                  }}
                  alt="Recover Password"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  );
};

export default PassRecovery;
