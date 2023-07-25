import { useEffect } from 'react';
import axios from 'axios';
import { Button, SimpleGrid, VStack } from '@chakra-ui/react';
import Item from './Item';

export default function ItemList({
  pokemonList,
  setPokemonList,
  nextPokemonList,
  setNextPokemonList,
  isSearchEmpty,
}) {
  useEffect(() => {
    const api = `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`;

    axios
      .get(api)
      .then(r => {
        const newPokemonList = r.data.results;
        setPokemonList(prevPokemonList => {
          const uniquePokemonList = newPokemonList.filter(
            pokemon =>
              !prevPokemonList.some(
                prevPokemon => prevPokemon.name === pokemon.name
              )
          );
          return [...prevPokemonList, ...uniquePokemonList];
        });
        setNextPokemonList(r.data.next);
      })
      .catch(e => console.log(e));
  }, [setPokemonList, setNextPokemonList]);

  function handleLoadMore() {
    console.log(pokemonList);
    axios
      .get(nextPokemonList)
      .then(r => {
        const newPokemonList = r.data.results;
        setPokemonList([...pokemonList, ...newPokemonList]);
        setNextPokemonList(r.data.next);
      })
      .catch(e => console.log(e));
  }

  return (
    <VStack pt={2} pb={4}>
      <SimpleGrid columns={[2, 3, 3, 4]} gap={4}>
        {pokemonList?.map((p, i) => {
          return <Item key={i} data={p} />;
        })}
      </SimpleGrid>

      {isSearchEmpty && (
        <Button
          onClick={handleLoadMore}
          flexShrink={0}
          w={'100%'}
          variant={'outline'}
          colorScheme="p"
          mt={4}
        >
          Load More
        </Button>
      )}
    </VStack>
  );
}
