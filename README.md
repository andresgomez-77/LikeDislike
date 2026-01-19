# Like/Dislike - Frontend

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Material-UI](https://img.shields.io/badge/MUI-5.0-007FFF?style=for-the-badge&logo=mui)


Interfaz de usuario estilo **arcade retro** para sistema de votación de personajes. Vote por sus personajes favoritos de Rick & Morty, Pokémon y Superhéroes mientras la IA aprende sus preferencias.

> **Demo en vivo**: [https://andresgomez-77.github.io/LikeDislike/](https://andresgomez-77.github.io/LikeDislike/)

## Back - End: https://github.com/andresgomez-77/likedislike-backend

---

## Características

- **Diseño retro arcade** estilo años 80/90
- **Sistema de recomendación IA** que aprende tus preferencias
- **Totalmente responsive** (móvil, tablet, escritorio)
- **Animaciones fluidas** con Framer Motion
- **Estadísticas en tiempo real** de votaciones
- **3 fuentes de personajes**: Rick & Morty, Pokémon, Superhéroes
- **Persistencia local** de preferencias


---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.2.0 | Framework UI |
| **TypeScript** | 5.0 | Tipado estático |
| **Vite** | 5.0 | Build tool ultra rápido |
| **Material-UI (MUI)** | 5.x | Componentes UI |
| **Framer Motion** | 11.x | Animaciones |
| **Axios** | 1.x | Cliente HTTP |
| **React Router** | 6.x | Navegación (opcional) |

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 14.0.0 ([Descargar aquí](https://nodejs.org/))
- **npm** >= 6.0.0 (viene con Node.js)
- **Git** ([Descargar aquí](https://git-scm.com/))

Verifica las versiones instaladas:
```bash
node --version
npm --version
git --version
```

---

## Instalación

### 1- Clonar el repositorio

```bash
git clone https://github.com/andresgomez-77/LikeDislike.git
cd LikeDislike
```

### 2- Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- React y ReactDOM
- Material-UI y componentes relacionados
- Framer Motion para animaciones
- Axios para peticiones HTTP
- TypeScript y tipos relacionados
- Vite y plugins necesarios

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

**Para desarrollo local:**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Para producción:**
```env
VITE_API_BASE_URL=https://tu-backend-en-produccion.com/api
```

> **Nota**: Las variables en Vite deben comenzar con `VITE_` para ser expuestas al cliente.

---

## Ejecución

### Modo Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### Preview del Build

Previsualiza el build de producción localmente:
```bash
npm run preview
```

### Linting

Verifica errores de código:
```bash
npm run lint
```

---

## Estructura del Proyecto

```
LikeDislike/
├── public/                    
│   └── vite.svg
├── src/
│   ├── components/             
│   │   ├── Cards.tsx          
│   │   ├── CRTScreen.tsx     
│   │   ├── PantallaInicio.tsx 
│   │   ├── MenuLateral.tsx    
│   │   ├── ModalEstadisticos.tsx 
│   │   └── PanelPreferencia.tsx 
│   ├── contexts/             
│   │   └── ContextoPreferencias.tsx 
│   ├── services/             
│   │   └── obtenerPersonaje.ts 
│   ├── types/                 
│   │   └── personaje.ts      
│   ├── styles/              
│   │   └── styles.ts       
│   ├── App.tsx              
│   ├── main.tsx               
│   └── vite-env.d.ts         
├── .env                      
├── .gitignore
├── index.html                
├── package.json               
├── tsconfig.json             
├── vite.config.ts            
└── README.md                   
```

---

## Componentes Principales

### 1. **CRTScreen**
Animación de encendido de monitor CRT retro.

**Características:**
- Flash blanco inicial
- Línea horizontal expandiéndose
- Texto "SYSTEM BOOTING..." con efecto typewriter
- Logo con efecto glow pulsante
- Duración total: 3.5 segundos
- Callback `onBootComplete` al finalizar

```typescript
<CRTScreen onBootComplete={handleBootComplete} />
```

---

### 2. **PantallaInicio**
Pantalla de bienvenida interactiva.

**Características:**
- Texto "PRESS START" parpadeante
- Click/touch para iniciar
- Fondo con estrellas animadas
- Efecto de scanlines retro
- Callback `onStart` al hacer click

```typescript
<PantallaInicio onStart={handleGameStart} />
```

---

### 3. **Cards**
Tarjeta principal de votación de personajes.

**Características:**
- Imagen del personaje cargada desde API
- Nombre y badge de fuente (Rick & Morty, Pokémon, Superhero)
- Botones circulares 3D de Like/Dislike
- Contadores de votos animados
- Animaciones de entrada/salida con Framer Motion
- Integración con sistema de preferencias IA

**Estados:**
- `loading`: Cargando personaje
- `voting`: Procesando voto
- `idle`: Listo para votar

---

### 4. **MenuLateral**
Menú lateral con acceso a estadísticas.

**Características:**
- Botón flotante hamburguesa (posición adaptativa)
- **Móvil**: Abajo-izquierda
- **Escritorio**: Arriba-izquierda
- Drawer deslizable con 4 opciones:
  - Personaje más gustado
  - Personaje menos gustado
  - Último evaluado
  - Estado de Pikachu
- Animaciones de entrada con Framer Motion

---

### 5. **ModalEstadisticos** 
Modal para visualizar estadísticas detalladas.

**Características:**
- **Móvil**: Pantalla completa
- **Escritorio**: Modal centrado
- Imagen y datos del personaje
- Contadores de likes/dislikes
- Loading state con CircularProgress
- Error handling con mensajes visuales
- Información especial de Pikachu

---

### 6. **PanelPreferencia** 
Panel lateral que muestra preferencias del usuario.

**Características:**
- **Móvil**: 
  - Oculto por defecto
  - Botón flotante FAB para mostrar/ocultar
  - Pantalla completa al abrirse
- **Escritorio**: 
  - Visible siempre
  - Posición fija derecha
- Barras de progreso por fuente
- Badge de "IA ACTIVA" cuando se alcanza el umbral
- Indicador de fuente favorita
- Contador de votos totales
- Botón de reiniciar preferencias

---

## Sistema de Preferencias (IA)

El sistema aprende las preferencias del usuario basándose en sus votos.

### Funcionamiento

1. **Registro de votos**: Cada like/dislike se registra por fuente
2. **Cálculo de preferencia**: Se determina la fuente favorita
3. **Activación de IA**: Después de 5 votos, la IA empieza a recomendar
4. **Persistencia**: Se guarda en `localStorage` del navegador

### Context API

```typescript
const {
  preferences,           // Objeto con todas las preferencias
  trackLike,            // Registra un like
  trackDislike,         // Registra un dislike
  resetPreferences,     // Reinicia todas las preferencias
  getTotalVotes,        // Obtiene total de votos
  shouldUseRecommendations // Verifica si usar IA (>= 5 votos)
} = usePreferences();
```

### Estructura de Datos

```typescript
interface PreferenciaUsuario {
  FuenteLikes: {
    RICK_MORTY: number;
    POKEMON: number;
    SUPERHERO: number;
  };
  FuenteDislikes: {
    RICK_MORTY: number;
    POKEMON: number;
    SUPERHERO: number;
  };
  FuentePreferida: PersonajeFuente | null;
  PorcentajePreferencia: number;
}
```

---

## Diseño y Estilo

### Tema Retro/Arcade

**Paleta de colores:**
- **Cyan neón**: `#16DBCC` (principal)
- **Amarillo dorado**: `#FFB800` (acentos)
- **Azul oscuro**: `#0A0E27` (fondo)
- **Azul medio**: `#1B2A4E` (tarjetas)
- **Negro**: `#000000` (bordes)

**Tipografía:**
- Fuente principal: **"Press Start 2P"** (pixel art de Google Fonts)
- Fallback: `monospace`

**Efectos visuales:**
- Bordes negros gruesos (3-4px)
- Sombras tipo 3D (`box-shadow: 4px 4px 0 #000`)
- Efectos glow con `text-shadow`
- Scanlines horizontales
- Viñeta en bordes
- Estrellas animadas de fondo

### Animaciones

Powered by **Framer Motion**:

```typescript
// Entrada de personaje
initial={{ scale: 0, rotate: -180 }}
animate={{ scale: 1, rotate: 0 }}
exit={{ scale: 0, rotate: 180 }}

// Hover en botones
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
```

---

## Responsive Design

### Breakpoints de Material-UI

```typescript
breakpoints: {
  xs: 0,  
  sm: 600,    
  md: 900,   
  lg: 1200,   
  xl: 1536,   
}
```

### Adaptaciones por Dispositivo

| Elemento | Móvil | Escritorio |
|----------|-------|------------|
| **Título principal** | 1.5rem | 2.5rem |
| **Botón menú** | 48px | 60px |
| **Drawer ancho** | 280px | 300px |
| **Modal** | Pantalla completa | 600px max |
| **Panel preferencias** | Oculto (FAB) | Visible fijo |
| **Botones flotantes** | Abajo | Según componente |

---

## APIs Consumidas

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Personajes

**Obtener personaje aleatorio**
```http
GET /api/personaje/aleatorio
```

**Con preferencias (IA activa)**
```http
GET /api/personaje/aleatorio?source=POKEMON
```

**Registrar voto**
```http
POST /api/personaje/votar
Content-Type: application/json

{
  "id": 123,
  "like": true
}
```

#### Estadísticas

**Personaje más gustado**
```http
GET /api/estadisticas/mas-gustado
```

**Personaje menos gustado**
```http
GET /api/estadisticas/menos-gustado
```

**Último personaje evaluado**
```http
GET /api/estadisticas/ultimo-evaluado
```

**Estado especial de Pikachu**
```http
GET /api/estadisticas/pikachu
```

---

## Flujo de Usuario

```
┌─────────────────────────┐
│ 1. CRT Boot Animation   │ (3.5 segundos)
│    "SYSTEM BOOTING..."  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ 2. Press Start Screen   │ (espera click)
│    "PRESS START"        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ 3. Juego Principal      │
│  ┌────────────────────┐ │
│  │ Ver personaje      │ │
│  │ Votar (👍/👎)     │ │
│  │ Ver estadísticas   │ │
│  │ Revisar gustos     │ │
│  └────────────────────┘ │
│         │ (loop)         │
│         └────────────────│
└─────────────────────────┘
```

---

## Troubleshooting

### Error: Cannot connect to backend

**Problema:** La app no puede conectarse a la API.

**Solución:**
```bash
# Verifica que el backend esté corriendo
# Revisa la URL en .env
VITE_API_BASE_URL=http://localhost:8080/api

# Reinicia el servidor de desarrollo
npm run dev
```

---

### Error: CORS Policy

**Problema:** Peticiones bloqueadas por CORS.

**Solución:**
- Asegúrate que el backend permita tu origen
- En desarrollo local, ambos deben estar en `localhost`
- Verifica configuración CORS en Spring Boot

---

### Fuente "Press Start 2P" no carga

**Problema:** La fuente retro no se aplica.

**Solución:**
```html
<!-- Verifica en index.html -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```

---

### Build falla en producción

**Problema:** `npm run build` genera errores.

**Solución:**
```bash
# Limpia caché y reinstala
rm -rf node_modules package-lock.json
npm install
npm run build
```
## Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m "Add: nueva funcionalidad increíble"
   ```
4. **Push** a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un **Pull Request**

---

## Licencia

© 2026 **Andrés Gómez**. Todos los derechos reservados.

Este proyecto fue creado con fines educativos y de demostración.

---

## Contacto

**Andrés Gómez**
- Portfolio: [En construcción]
- LinkedIn: www.linkedin.com/in/andrés-gómez
- Email: andresgomez-77@hotmail.com
- GitHub: [@andresgomez-77](https://github.com/andresgomez-77)

---

