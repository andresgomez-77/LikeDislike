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

function Cards({ personaje, actualizarContador }) {
  const styles = useDynamicStlyes();
  return (
    <Box key={personaje.id}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Typography sx={{ marginBottom: "6px"}}>{personaje.nombre}</Typography>
          <Divider/>
          <CardMedia
            component="img"
            alt={personaje.nombre}
            src={personaje.imagen}
            sx={styles.cardImagen}
          />
        </CardContent>
        <Typography>Vota:</Typography>
        <Divider />
        <Box sx={styles.cardButtons}>
          <ButtonLike
            contador={personaje.likes}
            onClick={() => actualizarContador(personaje.id, "likes")}
          />
          <ButtonDisLike
            contador={personaje.dislikes}
            onClick={() => actualizarContador(personaje.id, "dislikes")}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default Cards;
