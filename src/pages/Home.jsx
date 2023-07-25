import { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Input,
  IconButton,
  Icon,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import ItemList from '../components/ItemList';
import axios from 'axios';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPokemonList, setNextPokemonList] = useState();
  const [search, setSearch] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const { colorMode } = useColorMode();

  function searchPokemon(name) {
    if (name) {
      const api = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
      axios.get(api).then(r => {
        const pokemon = r.data.results.filter(pokemon =>
          pokemon.name.includes(name)
        );
        setPokemonList(pokemon);
        setIsSearchEmpty(false);
        // console.log(pokemon);
      });
    } else {
      getPokemon();
    }
  }

  function getPokemon() {
    const api = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    axios.get(api).then(r => {
      const pokemon = r.data.results;
      setPokemonList(pokemon);
      setIsSearchEmpty(true);
      // console.log(pokemon);
    });
  }

  return (
    <VStack pt={4} px={6} gap={0}>
      <Box lineHeight={1.7} mb={1} w={'100%'}>
        <HStack justifyContent={'space-between'}>
          <Text fontWeight={800} fontSize={32}>
            Pokédex
          </Text>
          <ColorModeSwitcher
            borderRadius={'full'}
            size={'sm'}
            fontSize={'md'}
          />
        </HStack>

        <Text fontSize={14} opacity={0.6}>
          Simple Pokédex with minimalism user interface and can search for a
          Pokémon by name.
        </Text>
      </Box>

      <HStack id="search" py={2} w={'100%'}>
        <Box position={'relative'} w={'100%'}>
          <Input
            className={colorMode === 'light' ? 'input' : 'input-dark'}
            // variant={'filled'}
            pr={14}
            borderRadius={12}
            bg={colorMode === 'light' ? 'white' : '#18191b'}
            placeholder="Search by Name"
            _placeholder={{ fontSize: 14 }}
            onChange={e => {
              setSearch(e.target.value);
            }}
            value={search}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                const searchBtn = document.querySelector('#searchBtn');
                searchBtn.click();
              }
            }}
          />

          <Box position={'absolute'} top={0} right={0} p={1}>
            <IconButton
              onClick={() => {
                setSearch('');
                getPokemon();
              }}
              colorScheme="gray"
              variant={'ghost'}
              aria-label="searchPokemonBtn"
              icon={<Icon as={ClearIcon} fontSize={'20'} />}
              borderRadius={12}
              size={'sm'}
              zIndex={99}
            />
          </Box>
        </Box>

        <IconButton
          // className="p-btn"
          id="searchBtn"
          onClick={() => {
            searchPokemon(search);
          }}
          colorScheme="p"
          aria-label="searchPokemonBtn"
          icon={<Icon as={SearchOutlinedIcon} />}
          borderRadius={12}
        />
      </HStack>

      <ItemList
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
        nextPokemonList={nextPokemonList}
        setNextPokemonList={setNextPokemonList}
        isSearchEmpty={isSearchEmpty}
      />
    </VStack>
  );
}
