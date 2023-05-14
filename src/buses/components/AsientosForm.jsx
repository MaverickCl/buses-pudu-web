import React, { useState } from 'react';
import { Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const AsientosForm = ({ numeroAsientos, onSubmit }) => {
  const [asientos, setAsientos] = useState([]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setAsientos((prevAsientos) => {
      const updatedAsientos = [...prevAsientos];
      updatedAsientos[index] = {
        ...updatedAsientos[index],
        [name]: value,
      };
      return updatedAsientos;
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(asientos);
  };

  const generateAsientosInputs = () => {
    const inputs = [];
    for (let i = 0; i < numeroAsientos; i++) {
      inputs.push(
        <Grid container spacing={2} key={i}>
          <Grid item xs={12}>
            <TextField
              name={`numero-${i}`}
              type="number"
              label="Número de asiento"
              onChange={(e) => handleInputChange(e, i)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Segundo piso</FormLabel>
              <RadioGroup
                name={`segundoPiso-${i}`}
                onChange={(e) => handleInputChange(e, i)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={`posicionX-${i}`}
              type="number"
              label="Posición X"
              onChange={(e) => handleInputChange(e, i)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={`posicionY-${i}`}
              type="number"
              label="Posición Y"
              onChange={(e) => handleInputChange(e, i)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={`porcentajeAdicional-${i}`}
              type="number"
              label="Porcentaje Adicional"
              onChange={(e) => handleInputChange(e, i)}
              required
            />
          </Grid>
        </Grid>
      );
    }
    return inputs;
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        {generateAsientosInputs()}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Crear Asientos
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AsientosForm;
