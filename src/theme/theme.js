import { createTheme } from '@mui/material/styles';
import { green, red, blue, orange } from "@mui/material/colors";
import Kanit from '/fonts/Kanit-ExtraBold.ttf';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#c54120',
      hover: '#a32b13',
    },
    primaryLight: {
      main: '#FA927B',
      hover: '#c3513d',
    },
    primaryClear: {
      main: '#FAA994',
      hover: '#c3513d',
    },
    secondary: {
      main: '#31AD84',
      hover: '#1e7a55',
    },
    secondaryLight: {
      main: '#7BFACF',
      hover: '#31AD84',
    },
    error: {
      main: red.A400,
      hover: red[700],
    },
    success : {
      main: green[500],
      hover: green[700],
    },
    buttonBlue : {
      main: blue[500],
      hover: blue[700],
    },
    alert : {
      main: orange[500],
      hover: orange[700],
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          {
            fontFamily: 'Kanit',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `
              local('Kanit'),
              local('Kanit-Regular'),
              url(${Kanit}) format('truetype')
            `,
            unicodeRange:
              'U+0-FF, U+200-2FF, U+600-6FF, U+FB00-FB4F, U+FE00-FE0F, U+FE70-FEFF',
          },
        ],
      },
    },
  },
});

export default theme;
