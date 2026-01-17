/**
 * ============================================
 * MODAL DE ESTADÍSTICAS
 * ============================================
 *
 * Modal que muestra información detallada de personajes:
 * - Personaje más gustado
 * - Personaje menos gustado
 * - Último personaje evaluado
 * - Estado especial de Pikachu
 *
 * Características:
 * - Diseño responsivo adaptado a móvil
 * - Scroll automático si el contenido es muy largo
 * - Efecto de carga con CircularProgress
 * - Manejo de errores visualizado
 */

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, ThumbUp, ThumbDown } from "@mui/icons-material";
import type { Personaje, Estadisticas } from "../types/personaje";

interface ModalEstadisticosProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fetchData: () => Promise<Personaje | Estadisticas>;
  type: "character" | "pikachu";
}

export const ModalEstadisticos = ({
  open,
  onClose,
  title,
  fetchData,
  type,
}: ModalEstadisticosProps) => {
  // ============================================
  // HOOKS Y ESTADO
  // ============================================

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState<Personaje | Estadisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // EFECTOS
  // ============================================

  /**
   * Carga los datos cuando el modal se abre
   */
  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  // ============================================
  // FUNCIONES
  // ============================================

  /**
   * Obtiene los datos del servidor
   */
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Extrae los datos del personaje según el tipo
   */
  const getCharacterData = (): Personaje | null => {
    if (!data) return null;
    if (type === "pikachu") {
      return (data as Estadisticas).personaje;
    }
    return data as Personaje;
  };

  /**
   * Obtiene el color según la fuente del personaje
   */
  const getSourceColor = (source: string) => {
    switch (source) {
      case "RICK_MORTY":
        return "#00b0c8";
      case "POKEMON":
        return "#ffcb05";
      case "SUPERHERO":
        return "#ff1744";
      default:
        return "#757575";
    }
  };

  /**
   * Obtiene la etiqueta legible de la fuente
   */
  const getSourceLabel = (source: string) => {
    switch (source) {
      case "RICK_MORTY":
        return "Rick & Morty";
      case "POKEMON":
        return "Pokémon";
      case "SUPERHERO":
        return "Superhero";
      default:
        return source;
    }
  };

  const character = getCharacterData();
  const pikachuStats = type === "pikachu" ? (data as Estadisticas) : null;

  // ============================================
  // RENDERIZADO
  // ============================================

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      // fullScreen en móviles muy pequeños para mejor experiencia
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          backgroundColor: "#1B2A4E",
          border: isMobile ? "none" : "4px solid #16DBCC",
          borderRadius: isMobile ? 0 : 2,
          boxShadow: "0 0 20px #16DBCC",
          // Limita la altura máxima en escritorio
          maxHeight: isMobile ? "100vh" : "90vh",
        },
      }}
    >
      {/* ============================================
          HEADER DEL MODAL
          ============================================ */}
      <DialogTitle
        sx={{
          backgroundColor: "#0A0E27",
          borderBottom: "2px solid #16DBCC",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: isMobile ? 1.5 : 2,
          px: isMobile ? 2 : 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: isMobile ? "0.65rem" : "0.9rem",
            color: "#FFB800",
            textShadow: "0 0 10px #FFB800",
            lineHeight: 1.4,
            pr: 2, // Espacio para el botón de cerrar
          }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#16DBCC",
            minWidth: isMobile ? 40 : 48,
          }}
        >
          <Close fontSize={isMobile ? "medium" : "large"} />
        </IconButton>
      </DialogTitle>

      {/* ============================================
          CONTENIDO DEL MODAL
          ============================================ */}
      <DialogContent
        sx={{
          py: isMobile ? 2 : 3,
          px: isMobile ? 2 : 3,
        }}
      >
        {/* ESTADO: Cargando */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress sx={{ color: "#FFB800" }} />
          </Box>
        )}

        {/* ESTADO: Error */}
        {error && (
          <Box
            sx={{
              textAlign: "center",
              py: isMobile ? 3 : 4,
              backgroundColor: "#E74C3C",
              borderRadius: 2,
              border: "2px solid #000",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: isMobile ? "0.6rem" : "0.7rem",
                color: "#fff",
                lineHeight: 1.5,
                px: 2,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* ESTADO: Datos cargados */}
        {!loading && !error && character && (
          <Card
            sx={{
              backgroundColor: "#16DBCC",
              border: isMobile ? "3px solid #000" : "4px solid #000",
              boxShadow: isMobile ? "3px 3px 0 #000" : "4px 4px 0 #000",
            }}
          >
            {/* Imagen del personaje */}
            <Box
              sx={{
                p: isMobile ? 1.5 : 2,
                backgroundColor: "#fff",
                border: isMobile ? "3px solid #000" : "4px solid #000",
              }}
            >
              <CardMedia
                component="img"
                image={character.imagen}
                alt={character.nombre}
                sx={{
                  height: isMobile ? 200 : 250,
                  objectFit: "contain",
                  border: "2px solid #000",
                }}
              />
            </Box>

            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              {/* Nombre del personaje */}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  color: "#000",
                  mb: 2,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {character.nombre}
              </Typography>

              {/* Chip de fuente */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Chip
                  label={getSourceLabel(character.source)}
                  sx={{
                    backgroundColor: getSourceColor(character.source),
                    color: "#fff",
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: isMobile ? "0.5rem" : "0.6rem",
                    border: "2px solid #000",
                    height: isMobile ? 28 : 32,
                  }}
                />
              </Box>

              {/* Estadísticas de likes/dislikes */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: isMobile ? 1 : 2,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                {/* LIKES */}
                <Box
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#4A90E2",
                    border: "3px solid #000",
                    borderRadius: 2,
                    p: isMobile ? 1.5 : 2,
                    flex: 1,
                  }}
                >
                  <ThumbUp
                    sx={{
                      fontSize: isMobile ? 24 : 30,
                      color: "#fff",
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: isMobile ? "1.2rem" : "1.5rem",
                      color: "#fff",
                      mt: 1,
                    }}
                  >
                    {character.likes}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: isMobile ? "0.5rem" : "0.6rem",
                      color: "#fff",
                      mt: 1,
                    }}
                  >
                    LIKES
                  </Typography>
                </Box>

                {/* DISLIKES */}
                <Box
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#E74C3C",
                    border: "3px solid #000",
                    borderRadius: 2,
                    p: isMobile ? 1.5 : 2,
                    flex: 1,
                  }}
                >
                  <ThumbDown
                    sx={{
                      fontSize: isMobile ? 24 : 30,
                      color: "#fff",
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: isMobile ? "1.2rem" : "1.5rem",
                      color: "#fff",
                      mt: 1,
                    }}
                  >
                    {character.dislikes}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: isMobile ? "0.5rem" : "0.6rem",
                      color: "#fff",
                      mt: 1,
                    }}
                  >
                    DISLIKES
                  </Typography>
                </Box>
              </Box>

              {/* Mensaje especial de Pikachu */}
              {pikachuStats && (
                <Box
                  sx={{
                    mt: 2,
                    p: isMobile ? 1.5 : 2,
                    backgroundColor: pikachuStats.existe
                      ? "#4A90E2"
                      : "#E74C3C",
                    border: "2px solid #000",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: isMobile ? "0.5rem" : "0.6rem",
                      color: "#fff",
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    {pikachuStats.mensaje}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalEstadisticos;
