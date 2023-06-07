    import React, { useState } from 'react';
    import { TextField, Checkbox, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

    const BusForm = ({ onSubmit }) => {
    const [nombre, setNombre] = useState('');
    const [modelo, setModelo] = useState('');
    const [patente, setPatente] = useState('');
    const [numeroAsientos, setNumeroAsientos] = useState(0);
    const [soloUnPiso, setSoloUnPiso] = useState(false);
    const [anioFabricacion, setAnioFabricacion] = useState(0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nombre') {
        setNombre(value);
        } else if (name === 'modelo') {
        setModelo(value);
        } else if (name === 'patente') {
        setPatente(value);
        } else if (name === 'numeroAsientos') {
        setNumeroAsientos(value);
        } else if (name === 'soloUnPiso') {
        setSoloUnPiso(event.target.checked);
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

        onSubmit(busData);
    };

    return (
        <form onSubmit={handleFormSubmit} style={{}}>
        <h1>Formulario Bus</h1>
        <Grid container spacing={4}>
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
            <FormControlLabel
                control={
                <Checkbox
                    name="soloUnPiso"
                    checked={soloUnPiso}
                    onChange={handleInputChange}
                />
                }
                label="Solo un piso"
            />
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
            <Button variant="contained" color="primary" type="submit">
                Crear Bus
            </Button>
            </Grid>
        </Grid>
        </form>
    );
    };

    export default BusForm;
