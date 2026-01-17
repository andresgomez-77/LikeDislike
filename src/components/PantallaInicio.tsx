import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface PantallaInicioProps {
  onStart: () => void;
}

export const PantallaInicio = ({ onStart }: PantallaInicioProps) => {
  return (
    <Box
      onClick={onStart}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0A0E27",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 9998,
      }}
    >
      {/* Estrellas de fondo */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent)
          `,
          backgroundSize: "200% 200%",
          animation: "stars 100s linear infinite",
        }}
      />

      {/* Logo principal */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ zIndex: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#FFB800",
            textShadow: `
              0 0 10px #FFB800,
              0 0 20px #FFB800,
              0 0 30px #FFB800,
              4px 4px 0px #000
            `,
            mb: 6,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            textAlign: "center",
            px: 2,
          }}
        >
          LIKE - DISLIKE
        </Typography>
      </motion.div>

      {/* Texto "Press Start" parpadeante */}
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ zIndex: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#16DBCC",
            textShadow: "0 0 10px #16DBCC, 2px 2px 0px #000",
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            textAlign: "center",
            px: 2,
          }}
        >
          PRESS START
        </Typography>
      </motion.div>

      {/* Instrucciones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ zIndex: 1 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            opacity: 0.6,
            mt: 4,
            fontSize: { xs: "0.5rem", sm: "0.6rem" },
            textAlign: "center",
            px: 2,
          }}
        >
          Presiona cualquier parte para comenzar
        </Typography>
      </motion.div>

      {/* Scanlines effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};