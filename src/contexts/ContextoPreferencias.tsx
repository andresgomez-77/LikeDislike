import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { PersonajeFuente, PreferenciaUsuario } from "../types/personaje";

const STORAGE_KEY = "personaje_preferencia";
const MIN_VOTES_FOR_RECOMMENDATIONS = 5;

interface TipoContextoPreferencias {
  preferences: PreferenciaUsuario;
  trackLike: (source: PersonajeFuente) => void;
  trackDislike: (source: PersonajeFuente) => void;
  resetPreferences: () => void;
  getTotalVotes: () => number;
  shouldUseRecommendations: () => boolean;
}

const ContextoPreferencias = createContext<
  TipoContextoPreferencias | undefined
>(undefined);

export const PreferenciasProvider = ({ children }: { children: ReactNode }) => {
  const [preferencias, setPreferencias] = useState<PreferenciaUsuario>(() => {
    const almacen = localStorage.getItem(STORAGE_KEY);
    return almacen
      ? JSON.parse(almacen)
      : {
          FuenteLikes: { RICK_MORTY: 0, POKEMON: 0, SUPERHERO: 0 },
          FuenteDislikes: { RICK_MORTY: 0, POKEMON: 0, SUPERHERO: 0 },
          FuentePreferida: null,
          PorcentajePreferencia: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencias));
    console.log("✅ Preferences saved:", preferencias);
  }, [preferencias]);

  const trackLike = (source: PersonajeFuente) => {
    setPreferencias((prev) => {
      const newLikes = {
        ...prev.FuenteLikes,
        [source]: (prev.FuenteLikes[source] || 0) + 1,
      };

      const totalLikes = Object.values(newLikes).reduce((a, b) => a + b, 0);
      const sortedSources = Object.entries(newLikes).sort(
        (a, b) => b[1] - a[1],
      );
      const [preferredSource, preferredCount] = sortedSources[0];
      const preferencePercentage =
        totalLikes > 0 ? preferredCount / totalLikes : 0;

      console.log(
        `👍 LIKE registered for ${source}. New total: ${newLikes[source]}`,
      );

      return {
        ...prev,
        FuenteLikes: newLikes,
        FuentePreferida: preferredSource as PersonajeFuente,
        PorcentajePreferencia: preferencePercentage,
      };
    });
  };

  const trackDislike = (source: PersonajeFuente) => {
    setPreferencias((prev) => {
      const newDislikes = {
        ...prev.FuenteDislikes,
        [source]: (prev.FuenteDislikes[source] || 0) + 1,
      };

      console.log(
        `👎 DISLIKE registered for ${source}. New total: ${newDislikes[source]}`,
      );

      return {
        ...prev,
        FuenteDislikes: newDislikes,
      };
    });
  };

  const resetPreferences = () => {
    setPreferencias({
      FuenteLikes: { RICK_MORTY: 0, POKEMON: 0, SUPERHERO: 0 },
      FuenteDislikes: { RICK_MORTY: 0, POKEMON: 0, SUPERHERO: 0 },
      FuentePreferida: null,
      PorcentajePreferencia: 0,
    });
    localStorage.removeItem(STORAGE_KEY);
    console.log("🔄 Preferences reset");
  };

  const getTotalVotes = () => {
    const likes = Object.values(preferencias.FuenteLikes).reduce(
      (a, b) => a + b,
      0,
    );
    const dislikes = Object.values(preferencias.FuenteDislikes).reduce(
      (a, b) => a + b,
      0,
    );
    return likes + dislikes;
  };

  const shouldUseRecommendations = () => {
    const total = getTotalVotes();
    const should = total >= MIN_VOTES_FOR_RECOMMENDATIONS;
    console.log(`🤔 Total votes: ${total}, Should use AI: ${should}`);
    return should;
  };

  return (
    <ContextoPreferencias.Provider
      value={{
        preferences: preferencias,
        trackLike,
        trackDislike,
        resetPreferences,
        getTotalVotes,
        shouldUseRecommendations,
      }}
    >
      {children}
    </ContextoPreferencias.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(ContextoPreferencias);
  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return context;
};
