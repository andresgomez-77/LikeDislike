// src/theme/theme.ts

import { createTheme } from "@mui/material/styles";

export const style = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4A90E2",
      light: "#6AAFE6",
      dark: "#2E5C8A",
    },
    secondary: {
      main: "#E74C3C",
      light: "#EC7063",
      dark: "#C0392B",
    },
    background: {
      default: "#0A0E27",
      paper: "#1B2A4E",
    },
    info: {
      main: "#16DBCC",
    },
    warning: {
      main: "#FFB800",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFB800",
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", "Courier New", monospace',
    h3: {
      fontSize: "2rem",
      fontWeight: 400,
      letterSpacing: "0.1em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      letterSpacing: "0.05em",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.8,
    },
    body2: {
      fontSize: "0.75rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: 0,
          border: "4px solid",
          padding: "12px 24px",
          fontSize: "0.875rem",
          fontWeight: 400,
          boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
          "&:hover": {
            transform: "translate(-2px, -2px)",
            boxShadow: "6px 6px 0px rgba(0,0,0,0.5)",
          },
          "&:active": {
            transform: "translate(2px, 2px)",
            boxShadow: "2px 2px 0px rgba(0,0,0,0.5)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#16DBCC",
          border: "8px solid #000000",
          borderRadius: 16,
          boxShadow: "8px 8px 0px rgba(0,0,0,0.8)",
        },
      },
    },
  },
});
