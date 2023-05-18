import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import Asiento from './Asiento';

const MatrizAsientos = ({ numRows, numCols, onSubmit }) => {
  const [asientos, setAsientos] = useState([]);

  const generateAsientosMatrix = () => {
    const matrix = [];

    for (let row = 0; row < numRows; row++) {
      const fila = [];

      for (let col = 0; col < numCols; col++) {
        const index = row * numCols + col;
        const isSelected = asientos[index] !== undefined;
        const asiento = asientos[index] || {}; // Obtener el asiento si existe, o un objeto vacío si no existe
        const posicionX = row + 1; // Posición en la fila
        const posicionY = col + 1; // Posición en la columna

        fila.push(
          <Box key={col} sx={{ margin: '4px' }}>
            <Asiento
              isSelected={isSelected}
              onClick={() => handleEstadoChange(index)}
              onTipoAsientoChange={(tipoAsiento) => handleTipoAsientoChange(index, tipoAsiento)}
              tipoAsiento={asiento.tipoAsiento || 'Desocupado'} // Obtener el tipo de asiento si existe, o 'Desocupado' si no existe
            />
          </Box>
        );
      }

      matrix.push(
        <Grid key={row} container spacing={0} justifyContent="center">
          {fila}
        </Grid>
      );
    }

    return matrix;
  };

  const handleEstadoChange = (index) => {
    const newAsientos = [...asientos];
    if (newAsientos[index]) {
      newAsientos[index] = undefined; // Establecer el asiento como indefinido en lugar de eliminarlo
    } else {
      newAsientos[index] = {
        segundoPiso: false,
        posicionX: Math.floor(index / numCols) + 1,
        posicionY: (index % numCols) + 1,
        porcentajeAdicional: 0.0,
        tipoAsiento: asientos[index]?.tipoAsiento || 'Desocupado', // Obtener el tipo de asiento inicial si existe
      };
    }
    setAsientos(newAsientos);
  };

  const handleTipoAsientoChange = (index, tipoAsiento) => {
    const newAsientos = asientos.map((asiento, i) => {
      if (i === index) {
        return {
          ...asiento,
          tipoAsiento: tipoAsiento === '' ? null : tipoAsiento,
        };
      }
      return asiento;
    });
    setAsientos(newAsientos);
  };

  const handleSubmit = () => {
    const asientosData = [];

    for (let index = 0; index < numRows * numCols; index++) {
      const asiento = asientos[index];

      if (asiento) {
        asientosData.push({
          ...asiento,
          numero: asientosData.length + 1, // Agregar el número de asiento
        });
      } else {
        // Asiento des
        asientosData.push({
          segundoPiso: false,
          posicionX: Math.floor(index / numCols) + 1,
          posicionY: (index % numCols) + 1,
          porcentajeAdicional: 0.0,
          tipoAsiento: asientosData[index]?.tipoAsiento || 'Desocupado', // Obtener el tipo de asiento inicial si existe
          });
          }
          }
          onSubmit(asientosData);
        };

        return (
        <>
        {generateAsientosMatrix()}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        Enviar Asientos
        </Button>
        </>
        );
        };
        
        export default MatrizAsientos;