import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Container, Typography } from '@mui/material';
import DishGrid from './components/QRGenerator/DishGrid';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          pt: 3,
          pb: 6,
        }}
      >
        <Container maxWidth={false}>
          {/* Header Section */}
          <Box
            component="header"
            sx={{
              textAlign: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h2" color="primary" gutterBottom>
              Restaurant Menu
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Scan QR codes to view detailed information
            </Typography>
          </Box>

          {/* Main Content */}
          <Box component="main">
            <DishGrid />
          </Box>

          {/* Footer Section */}
          <Box
            component="footer"
            sx={{
              mt: 6,
              py: 3,
              textAlign: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © 2025 Restaurant Name. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;