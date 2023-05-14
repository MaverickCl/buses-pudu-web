import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import BusForm from '../components/BusForm';
import MatrizAsientos from '../components/MatrizAsientos';
import BusService from '../services/BusService';

const CreacionBusPage = () => {
  const [busData, setBusData] = useState(null);

  const handleFormSubmit = async (data) => {
    try {
      const createdBus = await BusService.crearBus(data);
      console.log('Bus creado:', createdBus);
      setBusData(createdBus);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAsientosSubmit = async (asientosData) => {
    const updatedAsientosData = asientosData.map((asiento) => {
      if (!asiento.tipoAsiento) {
        return {
          ...asiento,
          tipoAsiento: 'desocupado', // Cambia 'desocupado' por asiento.tipoAsiento para usar el tipo seleccionado en la matriz
        };
      }
      return asiento;
    });

    const updatedBusData = { patenteBus: busData.patente, asientos: updatedAsientosData };
    try {
      const updatedBus = await BusService.enviarAsientos(updatedBusData);
      console.log('Bus actualizado:', updatedBus);
      setBusData(updatedBus);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h1" align="center">
        Creación de Bus
      </Typography>

      <div style={{ marginTop: '100px' }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <BusForm onSubmit={handleFormSubmit} />
          </Grid>
          <Grid item xs={8}>
            {busData ? (
              <MatrizAsientos numRows={16} numCols={5} onSubmit={handleAsientosSubmit} />
            ) : (
              <Typography variant="body1" align="center">
                No se ha creado ningún bus aún.
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default CreacionBusPage;
