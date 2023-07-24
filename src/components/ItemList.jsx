import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, SimpleGrid } from '@chakra-ui/react';
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
    <>
      <SimpleGrid columns={[2, null, 3, 4]} gap={4}>
        {pokemonList?.map((p, i) => {
          return <Item key={i} data={p} />;
        })}
      </SimpleGrid>

      <Button
        onClick={handleLoadMore}
        w={'100%'}
        variant={'outline'}
        colorScheme="p"
        mt={4}
      >
        Load More
      </Button>
    </>
  );
}
