import React, { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

const Asiento = ({ isSelected, onTipoAsientoChange, tipoAsiento }) => {
  const [tipo, setTipo] = useState(tipoAsiento || 'Desocupado');

  const handleTipoAsiento = (event) => {
    const selectedTipo = event.target.value;
    setTipo(selectedTipo);
    onTipoAsientoChange(selectedTipo);
  };

  let color = '';
  switch (tipo) {
    case 'Desocupado':
      color = 'gray';
      break;
    case 'Estandar':
      color = 'green';
      break;
    case 'Semicama':
      color = 'orange';
      break;
    case 'Cama':
      color = 'purple';
      break;
  }

  return (
    <div className={`asiento ${isSelected ? 'selected' : ''}`} style={{ backgroundColor: color, marginRight: '10px', maxWidth: '70px' }}>
      <FormControl sx={{ width: '50px' }}>
        <Select value={tipo} onChange={handleTipoAsiento}>
          <MenuItem value="Desocupado">Desocupado</MenuItem>
          <MenuItem value="Estandar">Estándar</MenuItem>
          <MenuItem value="Semicama">Semicama</MenuItem>
          <MenuItem value="Cama">Cama</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Asiento;
