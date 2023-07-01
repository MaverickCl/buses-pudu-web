import React from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const FiltersCard = ({ filterValues, handleFilterChange }) => {
  const { sortBy, sortOrder } = filterValues;

  return (
    <Card
      style={{
        border: "solid 1px #f8f8f8",
        marginBottom: 5,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Filtros
        </Typography>
        <FormControl
          sx={{ marginBottom: "1rem", minWidth: 120, width: "100%" }}
        >
          <InputLabel id="sort-by-label">Ordenar</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={sortBy}
            label="Sort By"
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <MenuItem value="price">Precio</MenuItem>
            <MenuItem value="duration">Duración</MenuItem>
            <MenuItem value="departureTime">Hora Salida</MenuItem>
            <MenuItem value="arrivalTime">Hora Llegada</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <InputLabel id="sort-order-label">Orden</InputLabel>
          <Select
            labelId="sort-order-label"
            id="sort-order-select"
            value={sortOrder}
            label="Sort Order"
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FiltersCard;
