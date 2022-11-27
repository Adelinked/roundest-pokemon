export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne
) => {
  const MAX_DEX_ID = 493;
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  else return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
  const firstID = getRandomPokemon();
  const secondId = getRandomPokemon(firstID);
  return [firstID, secondId];
};
