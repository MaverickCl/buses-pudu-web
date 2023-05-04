
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ theme }>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline/>
    { children }
  </ThemeProvider>
  )
}
