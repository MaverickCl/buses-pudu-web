import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FormControlLabel,
  useMediaQuery,
  TextField,
  useTheme,
  CircularProgress,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

import PhoneInput from "../../client/components/TneButton";
import TneButton from "../../client/components/TneButton";
import ResponsiveAppBar from "../../client/components/ResponsiveAppBar";
import Footer from "../../client/components/Footer";

import EditApiRest from "../services/EditApiRest";




export const AdminEdit = () => {
    const Values = window.location.search
    const urlParams = new URLSearchParams(Values)

    
    const [isEditing, setIsEditing] = React.useState(false);
    const [profileData, setProfileData] = React.useState(null);
    const [nombre, setNombre] = React.useState(null);
    const [puntos, setPuntos] = React.useState(null);
    const [rut, setRut] = React.useState(null);
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const id = urlParams.get('id')
    if (!token) {
      navigate("/auth/login");
      return;
    }

    EditApiRest.getProfile(token,id)
      .then((response) => {
        // Handle success
        setProfileData(response);

        setNombre(response.nombre);
        setPuntos(response.puntos);
        setRut(response.rut);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleSave = () => {
    const id = urlParams.get('id')
    profileData.nombre = nombre;
    profileData.puntos = puntos;
    profileData.rut = rut;
    

    const tempProfile = {
        nombre: profileData.nombre,
        puntos: profileData.puntos,
        rut: profileData.rut,
        // estadoTne : profileData.estadoTne
      };
      EditApiRest.updateProfile(localStorage.getItem("token"), id, tempProfile)
      .then((response) => {
        // Handle success
        setIsEditing(false);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
        setIsEditing(false);
    };

  if (!profileData) {
    return (
            <CssBaseline>
                <ResponsiveAppBar position="absolute" />

                <Box
                style={{
                    flex: 1,
                    height: "90vh", 

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <CircularProgress color="secondary" size={90} />
                </Box>
                <Footer />
            </CssBaseline>
        );
    }

    const handleLogout = () => {
        const appbar = document.getElementById("appbar");
        localStorage.removeItem("token");
        if (appbar) {
        appbar.setAttribute("isLoggedIn", "false");
        }
    };

    return (
    <CssBaseline>
    <ResponsiveAppBar id="appbar" position="absolute" />

    <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
        <Box sx={{ maxWidth: "600px", mx: "auto", py: 8 }}>
        <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                alt={profileData.nombre}
                src="pudu.jpeg"
                sx={{ width: 100, height: 100 }}
                />
            </Box>
            <Grid
                container
                spacing={2}
                sx={{ textAlign: { xs: "center", sm: "center" } }}
            >
                <Grid item xs={12} sm={6}>
                <Typography variant="h5" gutterBottom>
                {isEditing ? (
                    <TextField
                    required
                    fullWidth
                    id="nombre"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    />
                ) : (
                    <Typography>{profileData.nombre}</Typography>
                )}
                </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                {isEditing ? (
                    <TextField
                    required
                    fullWidth
                    id="rut"
                    value={rut}
                    onChange={(event) => setNombre(event.target.value)}
                    />
                ) : (
                    <Typography>{profileData.rut}</Typography>
                )}
                </Typography>
                </Grid>

                <Grid item xs={12}>
                <Divider />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" gutterBottom>
                    Teléfono
                </Typography>
               
                    <Typography>{profileData.contacto}</Typography>
            
                </Grid>

                <Grid
                item
                xs={12}
                sm={6}
                textAlign={isPortrait ? "left" : "right"}
                >
                <Typography variant="subtitle1" gutterBottom>
                    Email
                </Typography>
                
                    <Typography>{profileData.correo}</Typography>
                
                </Grid>
            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                }}
            >
                <Typography sx={{ mr: 1 }} variant="subtitle1">
                Pudú Points
                </Typography>
                <img
                src="Pudu Point.png"
                alt="Pudú Points"
                fill="#DAA520"
                sx={{ mr: 1, height: 24 }}
                width="50rem"
                />
                {isEditing ? (
                    <PhoneInput
                      onChange={(value) => setPuntos(value)}
                      icon={false}
                      number={profileData.puntos}
                    />
                  ) : (
                    <Typography fontSize="2rem">{profileData.puntos}</Typography>
                  )}
            </Grid>
            </CardContent>

            <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
            marginBottom={"1rem"}
            >
           
            <Grid
                item
                xs={12}
                sm="auto"
                display="flex"
                justifyContent="center"
            >
                {isEditing ? (
                <Button
                    type="submit"
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
            </Grid>
            <Grid
                item
                xs={12}
                sm="auto"
                display="flex"
                justifyContent="center"
            >
                <Button
                variant="outlined"
                color="error"
                startIcon={<LockIcon />}
                onClick={handleLogout}
                >
                <Link to="/" style={{ textDecoration: "none" }}>
                    Cerrar Sesión
                </Link>
                </Button>
            </Grid>
            </Grid>
        </Card>
        </Box>
    </Container>
    <Footer />
    </CssBaseline>
    )
    }

