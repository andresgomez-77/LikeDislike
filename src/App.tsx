/**
 * ============================================
 * COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * ============================================
 *
 * Este es el componente raíz que orquesta toda la aplicación.
 * Maneja tres estados principales:
 * 1. Animación de arranque (CRT Boot)
 * 2. Pantalla de inicio (Press Start)
 * 3. Juego principal (votación de personajes)
 *
 * @author Andrés Gómez
 * @version 1.0.0
 */

import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { style } from "./styles/styles";
import Cards from "./components/Cards";
import CRTScreen from "./components/CRTScreen";
import { useState } from "react";
import { PantallaInicio } from "./components/PantallaInicio";
import MenuLateral from "./components/MenuLateral";
import PanelPreferencia from "./components/PanelPreferencia";
import { PreferenciasProvider } from "./contexts/ContextoPreferencias";
const App = () => {
  // ============================================
  // ESTADOS DE LA APLICACIÓN
  // ============================================

  /**
   * Controla si la animación de arranque CRT ha terminado
   * - false: Muestra la animación de boot estilo terminal retro
   * - true: La animación terminó, pasa a la siguiente pantalla
   */
  const [bootComplete, setBootComplete] = useState(false);
  /**
   * Controla si el usuario ha iniciado el juego
   * - false: Muestra la pantalla "Press Start"
   * - true: Muestra el juego principal (votación)
   */
  const [gameStarted, setGameStarted] = useState(false);
  // ============================================
  // FUNCIONES CALLBACK
  // ============================================

  /**
   * Callback que se ejecuta cuando termina la animación CRT
   * Transiciona de la pantalla de boot a "Press Start"
   */
  const handleBootComplete = () => {
    setBootComplete(true);
  };
  /**
   * Callback que se ejecuta cuando el usuario presiona Start
   * Transiciona de "Press Start" al juego principal
   */
  const handleGameStart = () => {
    setGameStarted(true);
  };
  // ============================================
  // RENDERIZADO CONDICIONAL
  // ============================================
  return (
    // Theme Provider: Aplica el tema personalizado a toda la app
    <ThemeProvider theme={style}>
      {/* CssBaseline: Normaliza estilos entre navegadores */}
      <CssBaseline />
      {/* Context Provider: Proporciona el estado de preferencias a toda la app */}
      <PreferenciasProvider>
        {/* 
          FASE 1: ANIMACIÓN DE BOOT
          Se muestra SOLO si bootComplete es false
          Simula un arranque de computadora retro
        */}
        {!bootComplete && <CRTScreen onBootComplete={handleBootComplete} />}

        {/* 
          FASE 2: PANTALLA "PRESS START"
          Se muestra SOLO si:
          - bootComplete es true (animación terminó)
          - gameStarted es false (usuario no ha iniciado)
        */}
        {bootComplete && !gameStarted && (
          <PantallaInicio onStart={handleGameStart} />
        )}

        {/* 
          FASE 3: JUEGO PRINCIPAL
          Se muestra SOLO si gameStarted es true
          Contiene todo el contenido de votación
        */}
        {gameStarted && (
          <Box
            sx={{
              minHeight: "100vh",
              backgroundColor: "background.default",
              position: "relative",
              overflow: "hidden",
              py: 4,
            }}
          >
            {/* Menú lateral */}
            <MenuLateral />
            {/* Panel de preferencias */}
            <PanelPreferencia />
            {/* Estrellas de fondo animadas */}
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
                radial-gradient(2px 2px at 90% 60%, white, transparent),
                radial-gradient(1px 1px at 33% 50%, white, transparent),
                radial-gradient(1px 1px at 66% 75%, white, transparent)
              `,
                backgroundSize: "200% 200%",
                animation: "stars 200s linear infinite",
                "@keyframes stars": {
                  "0%": { backgroundPosition: "0% 0%" },
                  "100%": { backgroundPosition: "100% 100%" },
                },
              }}
            />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: "#FFB800",
                    textShadow: `
                    0 0 10px #FFB800,
                    0 0 20px #FFB800,
                    4px 4px 0px #000
                  `,
                    mb: 2,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    animation: "glow 2s ease-in-out infinite alternate",
                    "@keyframes glow": {
                      "0%": {
                        textShadow: `
                        0 0 10px #FFB800,
                        0 0 20px #FFB800,
                        4px 4px 0px #000
                      `,
                      },
                      "100%": {
                        textShadow: `
                        0 0 20px #FFB800,
                        0 0 30px #FFB800,
                        0 0 40px #FFB800,
                        4px 4px 0px #000
                      `,
                      },
                    },
                  }}
                >
                  LIKE - DISLIKE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#16DBCC",
                    textShadow: "0 0 5px #16DBCC, 2px 2px 0px #000",
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  VOTA POR TU PERSONAJE FAVORITO:
                </Typography>
              </Box>

              {/* Componente principal de las tarjetas de personajes */}
              <Cards />

              {/* Footer */}
              <Box sx={{ textAlign: "center", mt: 4, opacity: 0.7 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
                    color: "#fff",
                    lineHeight: 1.6,
                  }}
                >
                  Desarrollado por Andrés Gómez © 2026
                  <br />
                  Todos los derechos reservados
                </Typography>
              </Box>
            </Container>

            {/* Efecto de scanlines */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </Box>
        )}
      </PreferenciasProvider>
    </ThemeProvider>
  );
};

export default App;
