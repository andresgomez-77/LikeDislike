export const obtenerPersonajesRM = async () => {
  const url = `https://rickandmortyapi.com/api/character`;
  const response = await fetch(url);
  const { results } = await response.json();
  const randomPersonajes = results.sort(() => 0.5- Math.random()).slice(0, 3);
  const randm = randomPersonajes.map((rm) => ({
    id: rm.id,
    nombre: rm.name,
    especie: rm.species,
    imagen: rm.image,
  }));
  return randm;
};
