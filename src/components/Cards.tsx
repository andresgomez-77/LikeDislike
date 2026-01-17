// src/components/CharacterCard.tsx

import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";
import type { Personaje, TypeVote } from "../types/personaje";
import { obtenerPersonaje } from "../services/obtenerPersonaje";
import { usePreferences } from "../contexts/ContextoPreferencias";

const Cards = () => {
  const [personaje, setPersonaje] = useState<Personaje | null>(null);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);
  const { preferences, trackLike, trackDislike, shouldUseRecommendations } =
    usePreferences();
  useEffect(() => {
    fetchRandomCharacter();
  }, []);

  const fetchRandomCharacter = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let data: Personaje;

      if (shouldUseRecommendations()) {
        console.log("Usando recomendaciones IA con preferencias:", preferences);
        data = await obtenerPersonaje.getRecommendedCharacter(preferences);
      } else {
        console.log("Usando selección aleatoria");
        data = await obtenerPersonaje.obtenerPersonajeAleatorio();
      }
      setPersonaje(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (voteType: TypeVote) => {
    if (!personaje || voting) return;

    setVoting(true);

    try {
      await obtenerPersonaje.voteCharacter({
        idPersonaje: personaje.idPersonaje,
        typeVote: voteType,
      });
      if (voteType === "LIKE") {
        trackLike(personaje.source);
      } else {
        trackDislike(personaje.source);
      }
      setTimeout(() => {
        fetchRandomCharacter();
        setVoting(false);
      }, 300);
    } catch (error) {
      console.error("Error voting:", error);
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "#FFB800" }} size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <AnimatePresence mode="wait">
        {personaje && (
          <motion.div
            key={personaje.idPersonaje}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                width: 600,
                maxWidth: "90vw",
                backgroundColor: "#16DBCC",
                position: "relative",
              }}
            >
              {/* Marco interior blanco */}
              <Box
                sx={{
                  margin: "20px",
                  backgroundColor: "#fff",
                  border: "4px solid #000",
                  overflow: "hidden",
                }}
              >
                {/* Nombre del personaje */}
                <Box
                  sx={{
                    backgroundColor: "#E8E8E8",
                    border: "4px solid #000",
                    borderBottom: "none",
                    py: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "1rem",
                      color: "#000",
                      textTransform: "uppercase",
                    }}
                  >
                    {personaje.nombre}
                  </Typography>
                </Box>

                {/* Imagen del personaje */}
                <CardMedia
                  component="img"
                  image={personaje.imagen}
                  alt={personaje.nombre}
                  sx={{
                    height: 400,
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    border: "4px solid #000",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                />
              </Box>

              {/* Botones de votación */}
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  py: 3,
                }}
              >
                {/* Botón LIKE */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVote("LIKE")}
                  disabled={voting}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: "#4A90E2",
                        border: "6px solid #000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow:
                          "0 6px 0 #2E5C8A, 0 8px 10px rgba(0,0,0,0.5)",
                        transition: "all 0.1s",
                        "&:active": {
                          boxShadow:
                            "0 2px 0 #2E5C8A, 0 4px 5px rgba(0,0,0,0.5)",
                          transform: "translateY(4px)",
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#fff",
                          fontSize: "3rem",
                          fontWeight: "bold",
                          textShadow: "2px 2px 0 #000",
                        }}
                      >
                        👍
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: "0.7rem",
                        color: "#000",
                      }}
                    >
                      LIKE
                      <br />
                      {personaje.likes}
                    </Typography>
                  </Box>
                </motion.button>

                {/* Botón DISLIKE */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVote("DISLIKE")}
                  disabled={voting}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: "#E74C3C",
                        border: "6px solid #000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow:
                          "0 6px 0 #C0392B, 0 8px 10px rgba(0,0,0,0.5)",
                        transition: "all 0.1s",
                        "&:active": {
                          boxShadow:
                            "0 2px 0 #C0392B, 0 4px 5px rgba(0,0,0,0.5)",
                          transform: "translateY(4px)",
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#fff",
                          fontSize: "3rem",
                          fontWeight: "bold",
                          textShadow: "2px 2px 0 #000",
                        }}
                      >
                        👎
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: "0.7rem",
                        color: "#000",
                      }}
                    >
                      DISLIKE
                      <br />
                      {personaje.dislikes}
                    </Typography>
                  </Box>
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Cards;
