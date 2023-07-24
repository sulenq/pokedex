import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, SimpleGrid, VStack } from '@chakra-ui/react';
import Item from './Item';

export default function ItemList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPokemonList, setNextPokemonList] = useState();
  const offset = 0;
  const limit = 20;

  useEffect(() => {
    const api = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

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
  }, []);

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
    <VStack h={'calc(100% + 102px)'} pt={2} pb={4} overflow={'auto'}>
      <SimpleGrid columns={[2, null, 3, 4]} gap={4}>
        {pokemonList?.map((p, i) => {
          return <Item key={i} data={p} />;
        })}
      </SimpleGrid>

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
    </VStack>
  );
}
