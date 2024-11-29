import { useEffect, useState } from "react";
import { obtenerPersonajesRM } from "../links/RickandMorty.jsx";
import { obtenerPersonajesP } from "../links/Pokemon.jsx";
import { obtenerPersonajesH } from "../links/Heroes.jsx";

const useFecthPersonajes = () => {
  const [personajes, setPersonajes] = useState({
    rickMorty: [],
    pokemon: [],
    heroes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPersonajes = async() => {
      try {
        const [rickMorty, pokemon, heroes] = await Promise.all([
          obtenerPersonajesRM(),
          obtenerPersonajesP(),
          obtenerPersonajesH(),
        ]);
        const contadores = (personajes)=>{
          return personajes.map((personaje)=>({
            ...personaje,
            likes: personaje.likes || 0,
            dislikes: personaje.dislikes ||0
          }));
        };
        setPersonajes({
          rickMorty: contadores(rickMorty),
          pokemon: contadores(pokemon),
          heroes: contadores(heroes)
        });
      }catch (e){
        console.log("No se encontro ningun personaje:",e);
        setError("No encontro ningun personaje");
      }finally{
        setLoading(false);
      }
    };
    obtenerPersonajes();
    }, []);
    return {personajes, loading, error, setPersonajes}
};

export default useFecthPersonajes;
