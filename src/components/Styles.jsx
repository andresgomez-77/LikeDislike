import { Spaces } from "../assets/Variable/SpaceVariables";
import { Color } from "../assets/Variable/ColorVariable";
import FondoAzul from "../assets/Images/fondo_azul.jpg";
import { useTheme } from "@mui/material/styles";
export const useDynamicStlyes = () => {
  const theme = useTheme();
  return {
    InitialBox: {
      display: "grid",
      minHeight: "100vh",
      gridTemplateRows: "auto 1fr auto",
      justifyContent: "center",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        display: "flex", // En pantallas pequeñas cambiará a flex
        flexDirection: "column", 
      },
      [theme.breakpoints.up("md")]: {
        display: "grid", // En pantallas medianas o más grandes será grid
      }
    },
    mainBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      gap: Spaces.Size_3,
      backgroundImage: `url(${FondoAzul})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      padding: "2rem",
      padding: { xs: "1rem", sm: "2rem" },
      flexDirection: { xs: "column", sm: "row" }, 
    },
    secondBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
     width: { xs: "100%", sm: "80%", md: "70%" },
      padding: Spaces.Size_10,
      backgroundColor: Color.Blue_900,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: { xs: "100%", sm: "70%" },  // Ocupa todo el ancho en pantallas pequeñas y 70% en pantallas grandes
      padding: { xs: Spaces.Size_5, sm: Spaces.Size_10 }, 
    },
    titlePrimary:{
      color: Color.Yellow_500,
      textShadow: `3px 3px 0 ${Color.Gray_700}`,
      textTransform: "uppercase",
      fontSize: Spaces.Size_7
    },
    //NavBar
    navBar: {
      width:"100vw", 
      height:"auto",
      backgroundColor: Color.Yellow_500,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    textColor:{
      color:Color.Gray_100,
      textTransform: "uppercase",
    },

    //Estilos de las cartas
    card: {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "50px",
      margin: Spaces.Size_17,
      padding: `${Spaces.Size_5} ${Spaces.Size_5} ${Spaces.Size_15}`,
      backgroundColor: Color.Cyan_700,
      transition: "transform 0.3s ease",
      boxShadow: "0 -8px 0 8px #000",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: Spaces.Size_10,
    },
    cardImagen: {
      height: "300px",
      width: "300px",
      marginTop: "20px",
      borderRadius: "10px",
      backgroundColor: Color.Gray_100,
      maxWidth: "100%",
      height:"auto"
    },
    cardButtons: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "70px",
    },
    buttonsCard:{
      border: "2px solid #000",
      borderRadius: "100%",       
      backgroundColor: "#333",   
      padding: "10px 15px",
      boxShadow: "0 -1px #000",   
      cursor: "pointer",
      transition: "transform 0.1s, box-shadow 0.1s",
      "&:hover": {
        backgroundColor: "#555", 
      },
      "&:active": {
        transform: "translateY(-1px)", 
        boxShadow: "0 1px #000",
      },
    },

    //Footer
    primaryFooterBox:{
      display: "flex", alignItems: "center", justifyContent: "center" 
    },
    secondFooterBox:{
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "0 20px",
      gap: "10px",
      backgroundImage: `url(${FondoAzul})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
    },
    thirdFooterBox:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonFooter:{
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "100%",
    },
    "@media (max-width: 600px)": {
      mainBox: {
        flexDirection: "column",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "flex-start", // Asegura que se alinee correctamente
      },
      secondBox: {
        width: "95%",  // Ajuste adicional en pantallas pequeñas
        padding: "1rem",
      },
      titlePrimary: {
        fontSize: "1.5rem", // Ajuste del tamaño en móviles
        textAlign: "center",
      },
      card: {
        margin: Spaces.Size_5, // Ajustar márgenes
        padding: `${Spaces.Size_2} ${Spaces.Size_2} ${Spaces.Size_8}`,
        width: "100%",
      },
      cardTitle: {
        fontSize: "20px", // Ajustar tamaño de título
      },
      cardImagen: {
        height: "250px", // Ajustar imagen para móviles
        width: "250px",
      },
      cardButtons: {
        flexDirection: "column", // Organizar los botones en columna
        marginTop: "30px",
      },
    },
  };
};
