import * as React from "react";
import {
  Container,
  CssBaseline,
  Card,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";

const PointsCard = () => {
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card sx={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        flexDirection={isPortrait ? "column" : "row"}
        sx={{ width: "100%" }}
      >
        <Grid item xs={isPortrait ? 0 : 4}>
          <CardMedia
            component="img"
            height="500vh"
            image="pic_points.jpg"
            style={{ width: "100%", backgroundColor: "#75696d" }}
          />
        </Grid>
        <Grid item xs={isPortrait ? 0 : 8}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
            >
              En Buses Pudú cuidamos tu billetera
            </Typography>

            <Typography variant="body2" paragraph color="text.secondary">
              En Buses Pudú cuidamos tu billetera y por eso hemos implementado
              una serie de beneficios que te permitirán ahorrar en tus viajes.
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Si eres un cliente frecuente de Buses Pudú, te invitamos a unirte
              a nuestro programa de puntos Pudú Points. Al registrarte en este
              programa, podrás acumular puntos cada vez que compres un pasaje
              con nosotros. Estos puntos son canjeables por descuentos en tus
              compras futuras, con un máximo de hasta el 20% del valor de tu
              compra. ¡Así es, mientras más viajes con Buses Pudú, más ahorras
              en tus próximas compras!
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Pero eso no es todo, también queremos reconocer a nuestros jóvenes
              pasajeros que poseen la TNE vigente. Si ese es tu caso, podrás
              obtener descuentos especiales en tus pasajes. Así que no dudes en
              presentar tu tarjeta al momento de comprar tu boleto y disfruta de
              los beneficios de ser un estudiante con Buses Pudú.
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              En Buses Pudú queremos que viajes con seguridad y comodidad, pero
              también queremos que ahorres en tus viajes. Por eso, hemos creado
              estas oportunidades para que nuestros clientes puedan disfrutar de
              un servicio de calidad sin tener que preocuparse por el precio. No
              esperes más y únete a nuestro programa de puntos Pudú Points, y
              recuerda que si tienes tu TNE vigente, también podrás disfrutar de
              descuentos especiales.
            </Typography>
          </CardContent>
          <CardActions
            style={{
              justifyContent: isPortrait ? "center" : "flex-end",
              marginRight: isPortrait ? 0 : "2rem",
            }}
          >
            {/* <Link to="/auth/registro" style={{ textDecoration: "none" }}> For some ungodly reason the link is not working */}
            <Button variant="contained" size="small" href="/auth/registro">
              Registrarse en Buses Pudú
            </Button>
            {/* </Link> */}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

const Puntos = () => {
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <CssBaseline>
      <ResponsiveAppBar position="absolute" />

      <Container
        width="100%"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          marginTop: isPortrait ? "20rem" : "0",
          marginBottom: isPortrait ? "15rem" : "0",
        }}
      >
        <PointsCard />
      </Container>
      <Footer />
    </CssBaseline>
  );
};

export default Puntos;
