// frontend/src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Use dark mode
    primary: {
      main: '#ffeba7', // Light yellow color from the design
    },
    background: {
      default: '#1f2029', // Dark background color from the design
      paper: '#2b2e38', // Slightly lighter dark for cards
    },
    text: {
      primary: '#ffeba7',
      secondary: '#c4c3ca',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Use Poppins font
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '1px',
    },
  },
});

export default theme;
