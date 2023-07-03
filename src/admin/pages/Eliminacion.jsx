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
import DeleteApiRest from "../services/DeleteApiRest";
import DeleteTripApiRest from "../services/DeleteTripApiRest";




export const Eliminacion = () => {
    const Values = window.location.search
    const urlParams = new URLSearchParams(Values)

    
    const [isEditing, setIsEditing] = React.useState(false);
    const [profileData, setProfileData] = React.useState(null);
    const [destino, setDestino] = React.useState(null);
    const [origen, setOrigen] = React.useState(null);
    const [codigo, setCodigo] = React.useState(null);
    const [fecha, setFecha] = React.useState(null);
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
    const codigo = urlParams.get('codigo')
    if (!token) {
      navigate("/auth/login");
      return;
    }

    DeleteTripApiRest.getTrip(token,codigo)
      .then((response) => {
        // Handle success
        setProfileData(response);

        setOrigen(response.origen);
        setDestino(response.destino);
        setFecha(response.fecha);
        setCodigo(response.codigo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleSave = () => {
    const id = urlParams.get('id')
    profileData.nombre = nombre;
    //profileData.puntos = puntos;
    profileData.rut = rut;

    

    const tempProfile = {
        nombre: profileData.nombre,
        //puntos: profileData.puntos,
        correo:profileData.correo,
        id:profileData.id,
        contacto:profileData.contacto,
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

    const handleDelete = () => {
        const token = localStorage.getItem("token");
        const codigo = urlParams.get('codigo')
        DeleteTripApiRest.getTrip(token,codigo)
        .then((response) => {
          // Handle success
          const id = response.id
          DeleteTripApiRest.deleteTrip(localStorage.getItem("token"), id)
          .then((response) => {
            // Handle success
            navigate("/admin");
            setIsEditing(false);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
            setIsEditing(false);
        })
        .catch((error) => {
          console.error(error);
        });
   
        
      
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
                src="/pudu.jpeg"
                sx={{ width: 100, height: 100 }}
                />
            </Box>
            <Grid
                container
                spacing={2}
                sx={{ textAlign: { xs: "center", sm: "center" } }}
            >
               <Grid item xs={12}>
                <Divider />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" gutterBottom>
                    Origen
                </Typography>
               
                    <Typography>{profileData.origen}</Typography>
            
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" gutterBottom>
                    Destino
                </Typography>
               
                    <Typography>{profileData.destino}</Typography>
            
                </Grid>

                <Grid item xs={12}>
                <Divider />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" gutterBottom>
                    Fecha
                </Typography>
               
                    <Typography>{profileData.fecha}</Typography>
            
                </Grid>

                <Grid
                item
                xs={12}
                sm={6}
                textAlign={isPortrait ? "left" : "right"}
                >
                <Typography variant="subtitle1" gutterBottom>
                    Codigo Viaje
                </Typography>
                
                    <Typography>{profileData.codigo}</Typography>
                
                </Grid>
            </Grid>

            {/* <Grid
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
                  </Grid>*/}    
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
                <Button
                variant="outlined"
                color="error"
                startIcon={<LockIcon />}
                onClick={handleDelete}
                >
                <Link to="/admin" style={{ textDecoration: "none" }}>
                    Eliminar
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

