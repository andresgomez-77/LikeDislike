/**
 * ============================================
 * PANEL DE PREFERENCIAS
 * ============================================
 *
 * Panel lateral que muestra las preferencias del usuario:
 * - Barras de progreso por fuente de personajes
 * - Indicador de IA activa
 * - Fuente favorita destacada
 * - Total de votos
 *
 * Características móviles:
 * - Se oculta automáticamente en móvil para no obstruir
 * - Botón flotante para mostrar/ocultar
 * - Diseño compacto y optimizado
 * - Animaciones suaves con framer-motion
 */

import { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  Tooltip,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Refresh, Psychology, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "../contexts/ContextoPreferencias";

const PanelPreferencia = () => {
  // ============================================
  // HOOKS Y ESTADO
  // ============================================

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    preferences,
    resetPreferences,
    getTotalVotes,
    shouldUseRecommendations,
  } = usePreferences();

  const totalVotes = getTotalVotes();

  // En móvil, el panel empieza oculto
  const [isOpen, setIsOpen] = useState(!isMobile);

  // ============================================
  // FUNCIONES DE UTILIDAD
  // ============================================

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

  // Si no hay votos, no mostrar nada
  // if (totalVotes < 1) return null;

  // ============================================
  // RENDERIZADO
  // ============================================

  return (
    <>
      {/* ============================================
          BOTÓN FLOTANTE (Solo en móvil)
          Para mostrar/ocultar el panel
          ============================================ */}
      {isMobile && (
        <Fab
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#FFB800",
            color: "#000",
            border: "3px solid #000",
            boxShadow: "3px 3px 0 #000",
            zIndex: 1100,
            "&:hover": {
              backgroundColor: "#16DBCC",
              transform: "translate(-2px, -2px)",
              boxShadow: "5px 5px 0 #000",
            },
            "&:active": {
              transform: "translate(1px, 1px)",
              boxShadow: "2px 2px 0 #000",
            },
          }}
        >
          {isOpen ? <Close /> : <Psychology />}
        </Fab>
      )}

      {/* ============================================
          PANEL DE PREFERENCIAS
          ============================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                position: "fixed",
                // En móvil: cubre más espacio y desde arriba
                top: isMobile ? 0 : 100,
                right: isMobile ? 0 : 20,
                bottom: isMobile ? 0 : "auto",
                width: isMobile ? "100%" : 280,
                maxWidth: isMobile ? "100%" : 280,
                backgroundColor: "#1B2A4E",
                border: isMobile ? "none" : "4px solid #16DBCC",
                borderLeft: isMobile
                  ? "4px solid #16DBCC"
                  : "4px solid #16DBCC",
                borderRadius: isMobile ? 0 : 2,
                p: isMobile ? 2 : 2,
                boxShadow: "0 0 20px #16DBCC",
                zIndex: 1000,
                // Scroll si el contenido es muy largo
                overflowY: "auto",
                maxHeight: isMobile ? "100vh" : "calc(100vh - 120px)",
              }}
            >
              {/* ============================================
                  HEADER
                  ============================================ */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  pb: 2,
                  borderBottom: isMobile ? "2px solid #16DBCC" : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Psychology
                    sx={{
                      color: "#FFB800",
                      fontSize: isMobile ? 18 : 20,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: isMobile ? "0.55rem" : "0.6rem",
                      color: "#FFB800",
                    }}
                  >
                    TUS GUSTOS
                  </Typography>
                </Box>

                {/* Botón de reiniciar */}
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

              {/* ============================================
                  BADGE DE IA ACTIVA
                  ============================================ */}
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
                      fontSize: isMobile ? "0.45rem" : "0.5rem",
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

              {/* ============================================
                  BARRAS DE PROGRESO POR FUENTE
                  ============================================ */}
              {Object.entries(preferences.FuenteLikes).map(
                ([source, count]) => {
                  const percentage =
                    totalVotes > 0 ? (count / totalVotes) * 100 : 0;

                  return (
                    <Box key={source} sx={{ mb: 2 }}>
                      {/* Label y porcentaje */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
                          >
                            {getSourceEmoji(source)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: '"Press Start 2P", monospace',
                              fontSize: isMobile ? "0.45rem" : "0.5rem",
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
                            fontSize: isMobile ? "0.45rem" : "0.5rem",
                            color: getSourceColor(source),
                            fontWeight: "bold",
                          }}
                        >
                          {count} ({Math.round(percentage)}%)
                        </Typography>
                      </Box>

                      {/* Barra de progreso */}
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: isMobile ? 8 : 10,
                          backgroundColor: "#0A0E27",
                          border: "2px solid #000",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: getSourceColor(source),
                          },
                        }}
                      />
                    </Box>
                  );
                },
              )}

              {/* ============================================
                  BADGE DE FAVORITO
                  ============================================ */}
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
                        p: isMobile ? 1 : 1.5,
                        backgroundColor: getSourceColor(
                          preferences.FuentePreferida,
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
                          fontSize: isMobile ? "0.45rem" : "0.5rem",
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
                          fontSize: isMobile ? "0.5rem" : "0.6rem",
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

              {/* ============================================
                  CONTADOR DE VOTOS TOTALES
                  ============================================ */}
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
                      fontSize: isMobile ? "0.45rem" : "0.5rem",
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
                        fontSize: isMobile ? "0.45rem" : "0.5rem",
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
                          fontSize: isMobile ? "0.4rem" : "0.45rem",
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

              {/* Botón de cerrar en móvil (alternativo) */}
              {isMobile && (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <IconButton
                    onClick={() => setIsOpen(false)}
                    sx={{
                      color: "#16DBCC",
                      border: "2px solid #16DBCC",
                      "&:hover": {
                        backgroundColor: "rgba(22, 219, 204, 0.1)",
                      },
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PanelPreferencia;
