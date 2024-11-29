export const obtenerPersonajesP = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=1010`;
  const resp = await fetch(url);
  const { results } = await resp.json();
  const aleatorio = results.sort(() => 0.5 - Math.random()).slice(0, 3);

  const detalles = await Promise.all(
    aleatorio.map(async (pokemon) => {
      const resp = await fetch(pokemon.url);
      const pokebola = await resp.json();
      return {
        id: pokebola.id,
        nombre: pokebola.name,
        tipo: pokebola.types[0].type.name,
        habilidades: pokebola.abilities.map(
          (habilidad) => habilidad.ability.name
        ),
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokebola.id}.png`,
      };
    })
  );
  return detalles;
};
