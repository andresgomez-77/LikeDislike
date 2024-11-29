import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useFecthPersonajes from "../../../hooks/obtenerPersonajes";
import { useDynamicStlyes } from "../../../components/Styles";
import Cards from "../../../components/Cards";
import { Title_1_Bold, Title_h3_Bold} from "../../../assets/Variable/TextVariable";
function BodyPrimary() {
  const styles = useDynamicStlyes();
  const { personajes, loading, error, setPersonajes } = useFecthPersonajes();
  const [personajeActual, setPersonajeActual] = useState(null);
  const [vota, setVota] = useState(false);

  const personajeAleatorios = () => {
    const categorias = ["rickMorty", "pokemon", "heroes"];
    const categoriaAleatoria =
      categorias[Math.floor(Math.random() * categorias.length)];
    const personajeAleatorio =
      personajes[categoriaAleatoria][
        Math.floor(Math.random() * personajes[categoriaAleatoria].length)
      ];
    setPersonajeActual(personajeAleatorio);
    setVota(false);
  };
  const actualizarContador = (id, tipo) => {
    const categorias = ["rickMorty", "pokemon", "heroes"];
    const nuevosPersonajes = { ...personajes };
    categorias.forEach((categoria) => {
      nuevosPersonajes[categoria] = personajes[categoria].map((personaje) => {
        if (personaje.id === id) {
          personaje[tipo] += 1;
        }
        return personaje;
      });
    });
    setPersonajes(nuevosPersonajes);
    setVota(true);
    personajeAleatorios();
  };
  useEffect(() => {
    if (
      personajes.rickMorty.length > 0 ||
      personajes.pokemon.length > 0 ||
      personajes.heroes.length > 0
    ) {
      personajeAleatorios();
    }
  }, [personajes]);
  if (loading) return <Typography variant="h3" sx={Title_h3_Bold}>Cargando ...</Typography>;
  if (error)
    return (
      <Typography variant="h3"sx={Title_h3_Bold} color="error">
        {error}
      </Typography>
    );
  return (
    <Box sx={styles.mainBox}>
      <Box sx={styles.secondBox}>
        <Typography variant="h1" sx={{...Title_1_Bold, ...styles.titlePrimary}}>
          Vota por tu personaje favorito:
        </Typography>
        {personajeActual ? (
          <Cards
            personaje={personajeActual}
            actualizarContador={actualizarContador}
          />
        ) : (
          <Typography variant="h3" sx={Title_h3_Bold}>
            No existen personajes para mostrar.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default BodyPrimary;
