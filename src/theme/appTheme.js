import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#001226',
      main: '#2A3C53',
      light: '#5A6B85',
      contrastText: '#fff',
    },
    secondary: {
      dark: '#D34125',
      main: '#FA6342',
      light: '#FFBA90',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '70px',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '28px',
      fontWeight: 400,
    },
    h6: {
      fontWeight: 400,
      fontSize: '20px',
    },
    subtitle1: {
      fontSize: '17px',
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body1: {
      fontSize: '15px',
    },
    body2: {
      fontSize: '13px',
    },
  },
});
export default theme;
