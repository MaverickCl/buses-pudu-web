import React from "react";
import { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

import CityFetcher from "../services/CityFetcher";

const CitySelector = ({ label, setCity, city }) => {
  const [data, setData] = useState(CityFetcher.fetchJSON());

  const options = data.regiones.flatMap((region) => [
    ...region.comunas.map((comuna) => ({
      group: region.region,
      title: comuna,
    })),
  ]);

  const handleCityChange = (event, value) => {
    if (value) {
      setCity(value.title);
    } else {
      setCity("");
    }
  };

  return (
    <Autocomplete
      id="citySelector"
      options={options}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      value={city && { title: city }}
      groupBy={(option) => (option.group ? option.group : "")}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={handleCityChange}
      fullWidth
    />
  );
};

export default CitySelector;
