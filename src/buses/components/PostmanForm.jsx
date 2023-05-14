import React, { useState } from 'react';
import { TextField, Checkbox, Grid, Button } from '@mui/material';

const PostmanForm = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [modelo, setModelo] = useState('');
  const [patente, setPatente] = useState('');
  const [numeroAsientos, setNumeroAsientos] = useState(0);
  const [soloUnPiso, setSoloUnPiso] = useState(false);
  const [anioFabricacion, setAnioFabricacion] = useState(0);

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'nombre') {
      setNombre(value);
    } else if (name === 'modelo') {
      setModelo(value);
    } else if (name === 'patente') {
      setPatente(value);
    } else if (name === 'numeroAsientos') {
      setNumeroAsientos(value);
    } else if (name === 'soloUnPiso') {
      setSoloUnPiso(checked);
    } else if (name === 'anioFabricacion') {
      setAnioFabricacion(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const busData = {
      nombre,
      modelo,
      patente,
      numeroAsientos: parseInt(numeroAsientos),
      soloUnPiso,
      anioFabricacion: parseInt(anioFabricacion),
    };

    // Enviar los datos a través de la función onSubmit proporcionada por el componente padre
    onSubmit(busData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="nombre"
            label="Nombre"
            value={nombre}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="modelo"
            label="Modelo"
            value={modelo}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="patente"
            label="Patente"
            value={patente}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="numeroAsientos"
            type="number"
            label="Número de asientos"
            value={numeroAsientos}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            name="soloUnPiso"
            checked={soloUnPiso}
            onChange={handleInputChange}
          />
          <label>Solo un piso</label>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="anioFabricacion"
            type="number"
            label="Año de fabricación"
            value={anioFabricacion}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Crear Bus
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostmanForm;
