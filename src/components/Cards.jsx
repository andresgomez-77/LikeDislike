import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useDynamicStlyes } from "./Styles";
import ButtonLike from "./ButtonLike";
import ButtonDisLike from "./ButtonDisLike";
import { Color } from "../assets/Variable/ColorVariable";
import { NavBar_1 } from "../assets/Variable/TextVariable";

function Cards({ personaje, actualizarContador }) {
  const styles = useDynamicStlyes();
  return (
    <Box key={personaje.id} sx={{ width: { xs: "100%", sm: "50%" }, padding: "10px", }}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Box sx={{backgroundColor:Color.Gray_100, padding:"10px 20px", border:"4px solid #000"}}>
            <Typography sx={{ marginBottom: "6px", ...NavBar_1, border:"1px solid #000", backgroundColor:Color.Gray_400}}>
              {personaje.nombre}
            </Typography>
            <CardMedia
              component="img"
              alt={personaje.nombre}
              src={personaje.imagen}
              sx={styles.cardImagen}
            />
          </Box>
        </CardContent>
        <Divider />
        <Box sx={styles.cardButtons}>
          <ButtonLike
            contador={personaje.likes}
            onClick={() => actualizarContador(personaje.id, "likes")}
            sx={styles.buttonsCard}
          />
          <ButtonDisLike
            contador={personaje.dislikes}
            onClick={() => actualizarContador(personaje.id, "dislikes")}
            sx={styles.buttonsCard}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default Cards;
