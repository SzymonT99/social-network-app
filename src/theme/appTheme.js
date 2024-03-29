import { createTheme } from '@mui/material/styles';
import { plPL } from '@mui/x-data-grid';

let theme = createTheme();
theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        xxl: 1900,
      },
    },
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
        [theme.breakpoints.down('lg')]: {
          fontSize: '55px',
        },
        [theme.breakpoints.down('md')]: {
          fontSize: '50px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '40px',
        },
      },
      h3: {
        fontSize: '50px',
        [theme.breakpoints.down('xl')]: {
          fontSize: '42px',
        },
        [theme.breakpoints.down('md')]: {
          fontSize: '35px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '28px',
        },
      },
      h4: {
        fontSize: '28px',
        fontWeight: 400,
        [theme.breakpoints.down('xl')]: {
          fontSize: '26px',
        },
        [theme.breakpoints.down('md')]: {
          fontSize: '24px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '20px',
        },
      },
      h5: {
        [theme.breakpoints.down('md')]: {
          fontSize: '26px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '18px',
        },
      },
      h6: {
        fontWeight: 400,
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '17px',
        },
      },
      subtitle1: {
        fontSize: '17px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '15px',
        },
      },
      subtitle2: {
        fontSize: '16px',
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
          fontSize: '13px',
        },
      },
      body1: {
        fontSize: '15px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '13px',
        },
      },
      body2: {
        fontSize: '13px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '11px',
        },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            textTransform: 'none',
            '&.MuiButton-root': {
              [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
            },
            borderRadius: '5px',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            marginBottom: '10px',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('sm')]: {
              fontSize: '18px',
            },
          },
        },
      },
    },
  },
  plPL
);
export default theme;
