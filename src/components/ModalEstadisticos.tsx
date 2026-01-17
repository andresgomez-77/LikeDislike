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
  const [data, setData] = useState<Personaje | Estadisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

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

  const getCharacterData = (): Personaje | null => {
    if (!data) return null;
    if (type === "pikachu") {
      return (data as Estadisticas).personaje;
    }
    return data as Personaje;
  };

  const character = getCharacterData();
  const pikachuStats = type === "pikachu" ? (data as Estadisticas) : null;
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1B2A4E",
          border: "4px solid #16DBCC",
          borderRadius: 2,
          boxShadow: "0 0 20px #16DBCC",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#0A0E27",
          borderBottom: "2px solid #16DBCC",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "0.9rem",
            color: "#FFB800",
            textShadow: "0 0 10px #FFB800",
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#16DBCC" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress sx={{ color: "#FFB800" }} />
          </Box>
        )}

        {error && (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              backgroundColor: "#E74C3C",
              borderRadius: 2,
              border: "2px solid #000",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "0.7rem",
                color: "#fff",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {!loading && !error && character && (
          <Card
            sx={{
              backgroundColor: "#16DBCC",
              border: "4px solid #000",
              boxShadow: "4px 4px 0 #000",
            }}
          >
            <Box
              sx={{ p: 2, backgroundColor: "#fff", border: "4px solid #000" }}
            >
              <CardMedia
                component="img"
                image={character.imagen}
                alt={character.nombre}
                sx={{
                  height: 250,
                  objectFit: "contain",
                  border: "2px solid #000",
                }}
              />
            </Box>

            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "1rem",
                  color: "#000",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                {character.nombre}
              </Typography>

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
                    fontSize: "0.6rem",
                    border: "2px solid #000",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#4A90E2",
                    border: "3px solid #000",
                    borderRadius: 2,
                    p: 2,
                    flex: 1,
                  }}
                >
                  <ThumbUp sx={{ fontSize: 30, color: "#fff" }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "1.5rem",
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
                      fontSize: "0.6rem",
                      color: "#fff",
                      mt: 1,
                    }}
                  >
                    LIKES
                  </Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#E74C3C",
                    border: "3px solid #000",
                    borderRadius: 2,
                    p: 2,
                    flex: 1,
                  }}
                >
                  <ThumbDown sx={{ fontSize: 30, color: "#fff" }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "1.5rem",
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
                      fontSize: "0.6rem",
                      color: "#fff",
                      mt: 1,
                    }}
                  >
                    DISLIKES
                  </Typography>
                </Box>
              </Box>

              {pikachuStats && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
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
                      fontSize: "0.6rem",
                      color: "#fff",
                      textAlign: "center",
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
