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
  FormControlLabel,
  useMediaQuery,
  TextField,
  useTheme,
  CircularProgress,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import PhoneInput from "../components/PhoneInput";
import TneButton from "../components/TneButton";
import PasswordDialog from "../components/PasswordDialog";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";

import ProfileApiRest from "../services/ProfileApiRest";

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState(null);
  const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);
  const [tneMessage, setTneMessage] = React.useState("Tienes una TNE vigente?");
  const [tne, setTne] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    // TODO: Save changes to backend

    const emailFormat = new RegExp(
      "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}(\\.[a-z]{2,})?$",
      "i"
    );
    if (!emailFormat.test(email)) {
      // show error message or handle the invalid format case
      alert("Ingresa un formato de correo válido");
      return;
    }

    // Update profile data
    profileData.phone = phoneNumber;
    profileData.email = email;
    profileData.hasTneDiscount = tne;

    // Save changes to backend
    ProfileApiRest.editProfile(profileData)
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

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/auth/register");
      return;
    }

    ProfileApiRest.getProfile(token)
      .then((response) => {
        // Handle success
        setProfileData(response.data);
        setTne(response.data.hasTneDiscount);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phone);
      })
      .catch((error) => {
        // Handle error
        console.error(error);

        //-----------------
        //TEMP TEST DATA
        //-----------------
        const tempData = {
          name: "John Doe",
          hasTneDiscount: true,
          email: "johndoe@example.com",
          rut: "12.345.678-9",
          phone: "+56912345678",
          puduPoints: 500,
        };

        setProfileData(tempData);
        setTne(tempData.hasTneDiscount);
        setEmail(tempData.email);
        setPhoneNumber(tempData.phone);
        //-----------------
        //TEMP TEST DATA
        //-----------------
      });
  }, []);

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
                sx={{ textAlign: { xs: "center", sm: "center" } }}
              >
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    {profileData.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {profileData.rut}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Teléfono
                  </Typography>
                  {isEditing ? (
                    <PhoneInput
                      onChange={(value) => setPhoneNumber(value)}
                      icon={false}
                      number={profileData.phone.substring(3)}
                    />
                  ) : (
                    <Typography>{profileData.phone}</Typography>
                  )}
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
                  {isEditing ? (
                    <TextField
                      required
                      fullWidth
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  ) : (
                    <Typography>{profileData.email}</Typography>
                  )}
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: "flex", justifyContent: "flex-end" }}
                marginTop="1rem"
                marginBottom="1rem"
              >
                {profileData.hasTneDiscount ? (
                  <Typography variant="subtitle2">
                    <VerifiedIcon
                      color="success"
                      sx={{
                        ml: 1,
                        fontSize: "1.5rem",
                        verticalAlign: "middle",
                        marginRight: "0.5rem",
                      }}
                    />
                    Acceso a descuento TNE
                  </Typography>
                ) : isEditing ? (
                  <FormControlLabel
                    control={
                      <TneButton
                        onChange={(value) => setTne(value)}
                        setMessage={setTneMessage}
                        name="hastnediscount"
                        rut={profileData.rut}
                      />
                    }
                    label={tneMessage}
                  />
                ) : (
                  <Typography variant="subtitle2" color="error">
                    Sin acceso a descuento TNE
                  </Typography>
                )}
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
                <Typography fontSize="2rem">
                  {profileData.puduPoints}
                </Typography>
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
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<VpnKeyIcon />}
                  onClick={() => setOpenPasswordDialog(true)}
                  sx={{ mr: 1 }}
                >
                  Cambiar Contraseña
                </Button>
                <PasswordDialog
                  open={openPasswordDialog}
                  onClose={() => setOpenPasswordDialog(false)}
                />
              </Grid>
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
                >
                  <Link to="/auth/logout" style={{ textDecoration: "none" }}>
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
  );
};

export default Profile;
