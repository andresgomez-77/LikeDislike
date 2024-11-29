import { CardContent } from "@mui/material";

export const useDynamicStlyes = () => {
  return {
    InitialBox: {
      display: "grid",
      minHeight: "100dvh",
      gridTemplateRows: "auto 1fr auto",
      justifyContent: "center",
    },
    bodyPrimary: {
      display: "flex",
      flexWrap: "wrap",
      gap: 3,
      justifyContent: "center",
    },
    //Estilos de las cartas
    card: {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      margin: "20px",
      padding: "10px",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
      }},
    cardContent:{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardTitle:{
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    cardImagen:{
      height: "200px",
      width:"200px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    cardButtons:{
      display: "flex",
      justifyContent: "space-around",
      marginTop: "10px",
    }
  };
};
