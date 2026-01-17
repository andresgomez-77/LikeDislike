# Like/Dislike Frontend - React Arcade Interface

Interfaz de usuario estilo arcade retro para el sistema de votación de personajes.

## Stack Tecnológico

- **React 18**
- **TypeScript**
- **Vite** (build tool)
- **Material-UI (MUI) v5**
- **Framer Motion** (animaciones)
- **Axios** (HTTP client)

## Instalación

```bash
# Instalar dependencias
npm install

# O con yarn
yarn install
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Para producción:
```env
VITE_API_BASE_URL=https://tu-backend.railway.app/api
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

### Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

### Preview del Build

```bash
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── CRTScreen.tsx          # Animación de boot
│   ├── PantallaInicio.tsx        # Pantalla "Press Start"
│   ├── Cards.tsx      # Card principal de votación
│   ├── MenuLateral.tsx           # Menú lateral
│   └── ModalEstadisticos.tsx         # Modal de estadísticas
├── services/
│   └── obtenerPersonaje.ts                 # Cliente HTTP
├── types/
│   └── personaje.ts           # TypeScript types
├── theme/
│   └── styles.ts               # Tema MUI customizado
├── App.tsx                    # Componente raíz
└── main.tsx                   # Entry point
```

## 🎭 Componentes Principales

### CRTScreen
Animación de pantalla CRT encendiéndose:
- Flash blanco inicial
- Línea horizontal expandiéndose
- Texto "SYSTEM BOOTING..."
- Logo con efecto glow
- Duración: 3.5 segundos

### PantallaInicio
Pantalla de inicio interactiva:
- Texto "PRESS START" parpadeante
- Click para iniciar
- Fondo con estrellas animadas

### Cards
Tarjeta de personaje con votación:
- Imagen del personaje
- Nombre y fuente (Rick & Morty, Pokémon, Superhero)
- Botones de Like/Dislike circulares 3D
- Contadores de votos
- Animaciones de entrada/salida

### MenuLateral
Menú lateral con estadísticas:
- Botón flotante hamburguesa
- 4 opciones de estadísticas
- Animaciones de entrada
- Abre modales con datos

### ModalEstadisticos
Modal para mostrar estadísticas:
- Imagen y datos del personaje
- Contadores visuales
- Loading states
- Error handling

## Características de Diseño

### Tema Retro/Arcade
- Fuente: **Press Start 2P** (pixel art)
- Colores vibrantes: cyan (#16DBCC), amarillo (#FFB800)
- Bordes negros gruesos (4-8px)
- Sombras tipo 3D
- Efectos de scanlines y vignette

### Animaciones
- Entrada/salida de personajes (Framer Motion)
- Hover effects en botones
- Efecto de presión en botones circulares
- Glow pulsante en textos
- Estrellas animadas de fondo

### Responsive
- **Mobile**: Diseño adaptado, fuentes más pequeñas
- **Tablet**: Layout optimizado
- **Desktop**: Experiencia completa con todos los efectos

## 📱 Breakpoints

```typescript
const breakpoints = {
  xs: 0,      // Mobile
  sm: 600,    // Tablet
  md: 900,    // Desktop pequeño
  lg: 1200,   // Desktop
  xl: 1536,   // Desktop grande
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🌐 APIs Consumidas

### Personajes
- `GET /api/personaje/aleatorio` - Personaje random
- `POST /api/personaje/votar` - Registrar voto

### Estadísticas
- `GET /api/estadisticas/mas-gustado`
- `GET /api/estadisticas/menos-gustado`
- `GET /api/estadisticas/ultimo-evaluado`
- `GET /api/estadisticas/pikachu`

## 🎯 Flujo de Usuario

```
1. CRT Boot Animation (3.5s)
   ↓
2. Press Start Screen (espera click)
   ↓
3. Juego Principal:
   - Ver personaje aleatorio
   - Votar (Like/Dislike)
   - Abrir menú (☰)
   - Ver estadísticas
   ↓
4. Nuevo personaje se carga automáticamente
```

## 🐛 Troubleshooting

### Error: Cannot connect to backend

```typescript
// Verifica en .env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Error: CORS

- Asegúrate que el backend esté corriendo
- Verifica que CORS esté configurado en el backend

### Fuente no carga

```html
<!-- Verifica en index.html -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```
# Despliegue
npm run deploy
```

## Personalización

### Cambiar Colores

En `src/styles/styles.ts`:

```typescript
palette: {
  primary: {
    main: '#16DBCC',  // Cambiar cyan
  },
  secondary: {
    main: '#FFB800',  // Cambiar amarillo
  },
}
```

### Cambiar Fuente

```typescript
typography: {
  fontFamily: '"Tu Fuente", monospace',
}
```

## Licencia

© 2026 Andrés Gómez