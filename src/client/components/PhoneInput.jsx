import React, { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, Box } from "@mui/material";
import { Phone } from "@mui/icons-material";

const PhoneInput = (props) => {
  const countryCodes = [
    { value: "+56", label: "CL +56" },
    { value: "+51", label: "PE +51" },
    { value: "+54", label: "AR +54" },
    { value: "+57", label: "CO +57" },
    { value: "+52", label: "MX +52" },
    { value: "+1", label: "US +1" },
    // add more country codes as needed
  ];

  const [phoneNumber, setPhoneNumber] = useState(props.number.substring(3));

  useEffect(() => {
    setPhoneNumber(props.number.substring(3));
  }, [props.number]);

  const extractCountryCode = (phoneNumber) => {
    const countryCode = countryCodes.findIndex((code) =>
      phoneNumber.startsWith(code.value)
    );

    if (countryCode === -1) {
      const customCode = phoneNumber.substring(0, 3).substring(1);
      setCustomCountryCode(customCode);
    }

    return countryCode !== -1 ? countryCodes[countryCode] : "+";
  };

  const [customCountryCode, setCustomCountryCode] = useState("");

  const [countryCode, setCountryCode] = useState(() =>
    extractCountryCode(props.number)
  );

  useEffect(() => {
    handlePhoneNumberChange();
  }, [customCountryCode, countryCode, phoneNumber]);

  const handlePhoneChange = (event) => {
    const regex = /^[0-9\b]+$/; // only allow numbers
    const input = event.target.value;
    if (input === "" || regex.test(input)) {
      setPhoneNumber(input);
    }
  };

  const handleCodeChange = (event) => {
    setCountryCode(
      event.target.value === "+"
        ? "+"
        : countryCodes.find((country) => country.value === event.target.value)
    );
  };

  const handlePhoneNumberChange = () => {
    let phone = "";
    if (countryCode === "+") {
      phone = `+${customCountryCode}${phoneNumber}`;
    } else {
      phone = `${countryCode.value}${phoneNumber}`;
    }
    props.onChange(phone);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FormControl variant="outlined" fullWidth sx={{ mr: 2, width: "9rem" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel htmlFor="countryCode-select">Código País</InputLabel>
          <Select
            native
            value={countryCode.value ? countryCode.value : countryCode}
            onChange={handleCodeChange}
            label="Country Code"
            inputProps={{
              name: "countryCode",
              id: "countryCode-select",
            }}
          >
            {countryCodes.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
            <option value="+">+</option>
          </Select>
          {countryCode === "+" && (
            <TextField
              value={customCountryCode}
              onChange={(event) => setCustomCountryCode(event.target.value)}
              sx={{ width: "6.5rem" }}
            />
          )}
        </Box>
      </FormControl>
      <TextField
        required
        fullWidth
        id="phoneNumber"
        label="Número de Teléfono"
        value={phoneNumber}
        onChange={handlePhoneChange}
        InputProps={{
          startAdornment: props.icon ? <Phone color="secondary" /> : null,
        }}
      />
    </Box>
  );
};

export default PhoneInput;
