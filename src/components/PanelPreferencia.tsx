import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { Refresh, Psychology } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "../contexts/ContextoPreferencias";

const PanelPreferencia = () => {
  const {
    preferences,
    resetPreferences,
    getTotalVotes,
    shouldUseRecommendations,
  } = usePreferences();
  const totalVotes = getTotalVotes();

  // if (totalVotes < 1) return null;

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

  const getSourceEmoji = (source: string) => {
    switch (source) {
      case "RICK_MORTY":
        return "🧪";
      case "POKEMON":
        return "⚡";
      case "SUPERHERO":
        return "🦸";
      default:
        return "❓";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 100,
            right: 20,
            width: 280,
            backgroundColor: "#1B2A4E",
            border: "4px solid #16DBCC",
            borderRadius: 2,
            p: 2,
            boxShadow: "0 0 20px #16DBCC",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Psychology sx={{ color: "#FFB800", fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "0.6rem",
                  color: "#FFB800",
                }}
              >
                TUS GUSTOS
              </Typography>
            </Box>
            <Tooltip title="Reiniciar preferencias">
              <IconButton
                size="small"
                onClick={resetPreferences}
                sx={{
                  color: "#16DBCC",
                  "&:hover": {
                    backgroundColor: "rgba(22, 219, 204, 0.1)",
                  },
                }}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* AI Status Badge */}
          {shouldUseRecommendations() && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Chip
                icon={<Psychology />}
                label="IA ACTIVA"
                size="small"
                sx={{
                  mb: 2,
                  backgroundColor: "#00e676",
                  color: "#000",
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "0.5rem",
                  fontWeight: "bold",
                  width: "100%",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { boxShadow: "0 0 5px #00e676" },
                    "50%": { boxShadow: "0 0 20px #00e676" },
                  },
                }}
              />
            </motion.div>
          )}

          {/* Barras de progreso */}
          {Object.entries(preferences.FuenteLikes).map(([source, count]) => {
            const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

            return (
              <Box key={source} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      {getSourceEmoji(source)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: "0.5rem",
                        color: "#fff",
                      }}
                    >
                      {getSourceLabel(source)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "0.5rem",
                      color: getSourceColor(source),
                      fontWeight: "bold",
                    }}
                  >
                    {count} ({Math.round(percentage)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 10,
                    backgroundColor: "#0A0E27",
                    border: "2px solid #000",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: getSourceColor(source),
                    },
                  }}
                />
              </Box>
            );
          })}

          {/* Favorito badge */}
          {preferences.FuentePreferida &&
            preferences.PorcentajePreferencia > 0.4 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    backgroundColor: getSourceColor(
                      preferences.FuentePreferida
                    ),
                    border: "3px solid #000",
                    borderRadius: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "0.5rem",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    ❤️ FAVORITO
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "0.6rem",
                      color: "#fff",
                      textShadow: "1px 1px 0 #000",
                      mt: 0.5,
                    }}
                  >
                    {getSourceLabel(preferences.FuentePreferida)}
                  </Typography>
                </Box>
              </motion.div>
            )}

          {/* Votos totales */}
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "2px solid #16DBCC",
              textAlign: "center",
            }}
          >
            {totalVotes === 0 ? (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "0.5rem",
                  color: "#16DBCC",
                  lineHeight: 1.6,
                }}
              >
                ¡Empieza a votar para activar la IA!
              </Typography>
            ) : (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: "0.5rem",
                    color: "#16DBCC",
                    lineHeight: 1.6,
                  }}
                >
                  Total: {totalVotes} voto{totalVotes !== 1 ? "s" : ""}
                </Typography>
                {!shouldUseRecommendations() && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: "0.45rem",
                      color: "#FFB800",
                      mt: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {5 - totalVotes} votos más para IA
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default PanelPreferencia;
