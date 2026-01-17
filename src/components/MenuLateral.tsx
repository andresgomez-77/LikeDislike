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
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    fetchData: any;
    type: "character" | "pikachu";
  } | null>(null);

  const handleOpenModal = (
    title: string,
    fetchData: any,
    type: "character" | "pikachu" = "character"
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
          "pikachu"
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
          top: 20,
          left: 20,
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
            width: 60,
            height: 60,
          }}
        >
          <Menu sx={{ fontSize: 30, color: "#000" }} />
        </IconButton>
      </motion.div>

      {/* Drawer del menú */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0A0E27",
            width: 300,
            border: "4px solid #16DBCC",
            borderLeft: "none",
            boxShadow: "0 0 20px #16DBCC",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "0.9rem",
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
                <ListItem disablePadding sx={{ mb: 2 }}>
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
                      py: 2,
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{item.icon}</Box>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        sx: {
                          fontFamily: '"Press Start 2P", monospace',
                          fontSize: "0.6rem",
                          color: "#fff",
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
              mt: 4,
              p: 2,
              backgroundColor: "#1B2A4E",
              border: "2px solid #16DBCC",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "0.5rem",
                color: "#16DBCC",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Click en cualquier opción para ver las estadísticas
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
