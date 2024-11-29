export const obtenerPersonajesH = async () => {
  const url = `/api/2648e74d6106278362f373210efdca82/search/all`;
  const resp = await fetch(url);
  const { results } = await resp.json();
  const random = results.sort(() => 0.5 - Math.random()).slice(0, 3);
  const heroes = random.map((hero) => ({
    id: hero.id,
    nombre: hero.name,
    alias: hero.biography.aliases[0],
    imagen: hero.image.url,
  }));
  return heroes;
};
