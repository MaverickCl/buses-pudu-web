import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import { AccountCircle, Email, Lock } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Registry= () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [tne, setTne] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ firstName, lastName, email, password });
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="Nombre"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              InputProps={{
                startAdornment: (
                  <AccountCircle color="secondary" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Apellidos"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              InputProps={{
                startAdornment: (
                  <AccountCircle color="secondary" />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="rut"
              label="RUT"
              value={rut}
              onChange={(event) => setRut(event.target.value)}
              InputProps={{
                startAdornment: (
                  <AccountCircle color="secondary" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="birthDate"
              label="Fecha Nacimiento"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              InputProps={{
                startAdornment: (
                  <AccountCircle color="secondary" />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phoneNumber"
              label="Numero de Teléfono"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              InputProps={{
                startAdornment: (
                  <Email color="secondary" />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              InputProps={{
                startAdornment: (
                  <Email color="secondary" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                startAdornment: (
                  <Lock color="secondary" />
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={tne}
                onChange={(event) => setTne(event.target.checked)}
                name="tne"
                color="primary"
              />
            }
            label="TNE"
          />
        </Grid>
        <Grid item xs>
          <span>Tienes una TNE vigente?</span>
        </Grid>
      </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
        >
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default Registry;
