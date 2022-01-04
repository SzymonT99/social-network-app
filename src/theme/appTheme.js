import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#001226',
      main: '#2A3C53',
      light: '#5A6B85',
    },
    secondary: {
      dark: '#D34125',
      main: '#FA6342',
      light: '#FFBA90',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '70px',
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '28px',
      fontWeight: 400,
    },
  },
});
export default theme;