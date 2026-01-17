import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface CRTScreenProps {
  onBootComplete: () => void;
}

const CRTScreen = ({ onBootComplete }: CRTScreenProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500), // Flash blanco
      setTimeout(() => setStage(2), 800), // Línea horizontal
      setTimeout(() => setStage(3), 1500), // Texto de boot
      setTimeout(() => setStage(4), 2500), // Logo
      setTimeout(() => onBootComplete(), 3500), // Completo
    ];

    return () => timers.forEach(clearTimeout);
  }, [onBootComplete]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Flash blanco inicial */}
      {stage >= 1 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
          }}
        />
      )}

      {/* Línea horizontal expandiéndose */}
      {stage >= 2 && stage < 4 && (
        <motion.div
          initial={{ scaleX: 0, scaleY: 0.01 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0A0E27",
            border: "2px solid #16DBCC",
            boxShadow: "0 0 20px #16DBCC, inset 0 0 20px #16DBCC",
          }}
        />
      )}

      {/* Texto de boot */}
      {stage >= 3 && stage < 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#16DBCC",
              fontFamily: "monospace",
              textShadow: "0 0 10px #16DBCC",
              mb: 2,
            }}
          >
            ARRANCANDO EL SISTEMA...
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#16DBCC",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px #16DBCC",
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      )}

      {/* Logo/Título final */}
      {stage >= 4 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
          }}
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
              mb: 2,
            }}
          >
            LIKE - DISLIKE
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#16DBCC",
              textShadow: "0 0 5px #16DBCC",
            }}
          >
            PRESIONA 
          </Typography>
        </motion.div>
      )}

      {/* Efecto de scanlines */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* Vignette effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default CRTScreen;
