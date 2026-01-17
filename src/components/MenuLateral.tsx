/**
 * ============================================
 * MENÚ LATERAL / BOTÓN FLOTANTE
 * ============================================
 *
 * Componente que maneja el menú de opciones de la aplicación.
 * - En ESCRITORIO: Botón lateral fijo
 * - En MÓVIL: Botón flotante compacto que despliega opciones
 *
 * Características:
 * - Diseño responsivo adaptado a cada dispositivo
 * - Estilo retro/cyberpunk consistente
 * - Menú desplegable en móvil para ahorrar espacio
 */
import { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  EmojiEvents,
  ThumbDown,
  History,
  Star,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import ModalEstadisticos from "./ModalEstadisticos";
import { statsApi } from "../services/obtenerPersonaje";

const MenuLateral = () => {
  // ============================================
  // HOOKS Y DETECCIÓN DE DISPOSITIVO
  // ============================================

  const theme = useTheme();
  // Detecta si la pantalla es menor a 900px (móvil/tablet)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Estado del drawer (menú lateral)
  const [open, setOpen] = useState(false);
  // Estado del modal de estadísticas
  const [modalOpen, setModalOpen] = useState(false);
  // Configuración del modal actual
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    fetchData: any;
    type: "character" | "pikachu";
  } | null>(null);
  // ============================================
  // FUNCIONES
  // ============================================

  /**
   * Abre el modal de estadísticas con la configuración específica
   * @param title - Título del modal
   * @param fetchData - Función para obtener los datos
   * @param type - Tipo de datos ("character" o "pikachu")
   */
  const handleOpenModal = (
    title: string,
    fetchData: any,
    type: "character" | "pikachu" = "character",
  ) => {
    setModalConfig({ title, fetchData, type });
    setModalOpen(true);
    setOpen(false);
  };

  const menuItems = [
    {
      title: "MÁS GUSTADO",
      icon: <EmojiEvents sx={{ color: "#FFB800" }} />,
      onClick: () =>
        handleOpenModal("PERSONAJE MÁS GUSTADO", statsApi.getMostLiked),
    },
    {
      title: "MÁS DISGUSTADO",
      icon: <ThumbDown sx={{ color: "#E74C3C" }} />,
      onClick: () =>
        handleOpenModal("PERSONAJE MENOS GUSTADO", statsApi.getMostDisliked),
    },
    {
      title: "ÚLTIMO EVALUADO",
      icon: <History sx={{ color: "#16DBCC" }} />,
      onClick: () =>
        handleOpenModal("ÚLTIMO EVALUADO", statsApi.getLastEvaluated),
    },
    {
      title: "ESTADO PIKACHU",
      icon: <Star sx={{ color: "#FFB800" }} />,
      onClick: () =>
        handleOpenModal(
          "ESTADO DE PIKACHU",
          statsApi.getPikachuStatus,
          "pikachu",
        ),
    },
  ];

  return (
    <>
      {/* Botón flotante para abrir menú */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "fixed",
          // En móvil: más pequeño y pegado al borde
          top: isMobile ? "auto" : 20,
          bottom: isMobile ? 20 : "auto",
          left: isMobile ? 16 : 20,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#16DBCC",
            border: "4px solid #000",
            boxShadow: "4px 4px 0 #000",
            "&:hover": {
              backgroundColor: "#FFB800",
              transform: "translate(-2px, -2px)",
              boxShadow: "6px 6px 0 #000",
            },
            "&:active": {
              transform: "translate(2px, 2px)",
              boxShadow: "2px 2px 0 #000",
            },
            // Tamaño adaptado: 48px en móvil, 60px en escritorio
            width: isMobile ? 48 : 60,
            height: isMobile ? 48 : 60,
            transition: "all 0.2s ease",
          }}
        >
          <Menu sx={{ fontSize: 30, color: "#000" }} />
        </IconButton>
      </motion.div>

      {/* ============================================
          DRAWER - Menú lateral deslizable
          ============================================ */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0A0E27",
            // Ancho adaptado: 280px en móvil, 300px en escritorio
            width: isMobile ? 280 : 300,
            // Bordes más finos en móvil
            border: isMobile ? "3px solid #16DBCC" : "4px solid #16DBCC",
            borderLeft: "none",
            boxShadow: "0 0 20px #16DBCC",
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(22, 219, 204, 0.03) 2px,
                rgba(22, 219, 204, 0.03) 4px
              )
            `,
          },
        }}
      >
        <Box sx={{ p: isMobile ? 2 : 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: isMobile ? "0.75rem" : "0.9rem",
              color: "#FFB800",
              textShadow: "0 0 10px #FFB800",
              mb: 3,
              textAlign: "center",
            }}
          >
            ESTADÍSTICAS
          </Typography>

          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem disablePadding sx={{ mb: isMobile ? 1.5 : 2 }}>
                  <ListItemButton
                    onClick={item.onClick}
                    sx={{
                      backgroundColor: "#1B2A4E",
                      border: "3px solid #16DBCC",
                      borderRadius: 1,
                      boxShadow: "3px 3px 0 #000",
                      "&:hover": {
                        backgroundColor: "#2A3F6E",
                        transform: "translate(-2px, -2px)",
                        boxShadow: "5px 5px 0 #000",
                      },
                      "&:active": {
                        transform: "translate(1px, 1px)",
                        boxShadow: "2px 2px 0 #000",
                      },
                      py: isMobile ? 1.5 : 2,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* Icono */}
                    <Box
                      sx={{
                        mr: isMobile ? 1.5 : 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                    {/* Texto */}
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        sx: {
                          fontFamily: '"Press Start 2P", monospace',
                          fontSize: isMobile ? "0.55rem" : "0.6rem",
                          color: "#fff",
                          lineHeight: 1.3,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* Información adicional */}
          <Box
            sx={{
              mt: isMobile ? 3 : 4,
              p: isMobile ? 1.5 : 2,
              backgroundColor: "#1B2A4E",
              border: "2px solid #16DBCC",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: isMobile ? "0.45rem" : "0.5rem",
                color: "#16DBCC",
                textAlign: "center",
                lineHeight: isMobile ? 1.4 : 1.6,
              }}
            >
              {isMobile
                ? "Toca para ver stats"
                : "Click en cualquier opción para ver las estadísticas"}{" "}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Modal de estadísticas */}
      {modalConfig && (
        <ModalEstadisticos
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalConfig.title}
          fetchData={modalConfig.fetchData}
          type={modalConfig.type}
        />
      )}
    </>
  );
};
export default MenuLateral;
