import axios from 'axios';
import type { Personaje, VoteRequest, Estadisticas } from '../types/personaje';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const obtenerPersonaje = {
  // Obtener personaje aleatorio
  obtenerPersonajeAleatorio: async (): Promise<Personaje> => {
    const response = await api.get<Personaje>('/personaje/aleatorio');
    return response.data;
  },
  // Obtener personaje recomendado basado en preferencias
  getRecommendedCharacter: async (preferencias: any): Promise<Personaje> => {
    const response = await api.post<Personaje>('/personaje/recomendado', preferencias);
    return response.data;
  },
  // Votar por un personaje
  voteCharacter: async (vote: VoteRequest): Promise<Personaje> => {
    const response = await api.post<Personaje>('/personaje/vote', vote);
    return response.data;
  },
};

export const statsApi = {
  // Personaje con más likes
  getMostLiked: async (): Promise<Personaje> => {
    const response = await api.get<Personaje>('/estadisticas/mas-gustado');
    return response.data;
  },

  // Personaje con más dislikes
  getMostDisliked: async (): Promise<Personaje> => {
    const response = await api.get<Personaje>('/estadisticas/menos-gustado');
    return response.data;
  },

  // Último personaje evaluado
  getLastEvaluated: async (): Promise<Personaje> => {
    const response = await api.get<Personaje>('/estadisticas/ultimo-evaluado');
    return response.data;
  },

  // Estado de Pikachu
  getPikachuStatus: async (): Promise<Estadisticas> => {
    const response = await api.get<Estadisticas>('/estadisticas/pikachu');
    return response.data;
  },
};

export default obtenerPersonaje;