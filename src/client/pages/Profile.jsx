import * as React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

import ResponsiveAppBar from "../components/ResponsiveAppBar";

const perfil = {
  name: "Juan Pérez",
  email: "juan.perez@busespudu.com",
  phone: "+56 9 1234 5678",
};

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState(perfil);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    // TODO: Save changes to backend
    setIsEditing(false);
  };

  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" />

      <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Box sx={{ maxWidth: "600px", mx: "auto", py: 8 }}>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  alt={profileData.name}
                  src="pudu.jpeg"
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Grid
                container
                spacing={2}
                sx={{ textAlign: { xs: "center", sm: "initial" } }}
              >
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    {profileData.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Typography variant="h5">{profileData.email}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Teléfono
                  </Typography>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <Typography>{profileData.phone}</Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              {isEditing ? (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<LockIcon />}
                  onClick={handleSave}
                  sx={{ mr: 1 }}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<AccountCircleIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
              )}
              <Button variant="outlined" color="error" startIcon={<LockIcon />}>
                <Link to="/auth/logout" style={{ textDecoration: "none" }}>
                  Cerrar Sesión
                </Link>
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </CssBaseline>
  );
};

export default Profile;
