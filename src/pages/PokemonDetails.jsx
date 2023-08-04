import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Badge,
  Box,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  // useColorMode,
} from '@chakra-ui/react';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function PokemonDetails(props) {
  const pokemonId = props?.id;
  const [pokemonDetails, setPokemonDetails] = useState();
  const [species, setSpecies] = useState();
  const detailTab = [
    'Details',
    'Stats',
    'Shiny',
    'Evolution',
    'Form',
    'Nature',
  ];
  const statsName = name => {
    switch (name) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'Attack';
      case 'defense':
        return 'Defense';
      case 'special-attack':
        return 'Special Attack';
      case 'special-defense':
        return 'Special Defense';
      case 'speed':
        return 'Speed';
      default:
        return name;
    }
  };
  const typeColor = type => {
    switch (type) {
      default:
        return type;
      case 'grass':
      case 'bug':
        return 'green';
      case 'poison':
      case 'ghost':
      case 'dragon':
        return 'purple';
      case 'fire':
        return 'red';
      case 'flying':
      case 'ice':
        return 'cyan';
      case 'water':
        return 'blue';
      case 'ground':
      case 'fighting':
      case 'rock':
        return 'orange';
      case 'fairy':
      case 'psychic':
        return 'pink';
      case 'electric':
        return 'yellow';
      case 'steel':
        return 'gray';
      case 'dark':
        return 'black';
    }
  };

  // Utils
  // const { colorMode } = useColorMode();
  useEffect(() => {
    const api = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    axios
      .get(api)
      .then(r => {
        // console.log(r.data);
        setPokemonDetails(r.data);
      })
      .catch(e => console.log(e));
  }, [pokemonId]);
  useEffect(() => {
    const api = pokemonDetails?.species?.url;

    axios
      .get(api)
      .then(r => {
        // console.log(r.data);
        setSpecies(r.data);
      })
      .catch(e => console.log(e));
  }, [pokemonDetails]);

  return (
    <Box>
      <HStack alignItems={'flex-start'} justifyContent={'space-between'} p={4}>
        <Box w={'100%'}>
          <Text fontWeight={700} fontSize={24} w={'100%'} textAlign={'center'}>
            {pokemonDetails?.name[0]?.toUpperCase() +
              pokemonDetails?.name?.slice(1) || 'Loading...'}
          </Text>

          <Text w={'100%'} textAlign={'center'}>
            {pokemonDetails?.id.toString().padStart(4, '0')}
          </Text>
        </Box>
      </HStack>

      <HStack w={'100%'} p={6} pt={0} pb={4} justifyContent={'center'}>
        <Box
          border={'1px solid var(--divider)'}
          w={'100%'}
          // bg={colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200'}
          borderRadius={20}
          p={4}
          h={'100%'}
        >
          <Image
            loading="lazy"
            boxSize={'400px'}
            objectFit={'contain'}
            src={
              pokemonDetails?.sprites?.other?.['official-artwork']
                ?.front_default
            }
            w={'100%'}
          />
        </Box>
      </HStack>

      <Tabs colorScheme="p">
        <TabList
          className={window.innerWidth < 1000 && 'hidden-scroll'}
          px={6}
          pb={2}
          borderBottom={'none'}
          overflow={'auto'}
        >
          <HStack w={'max-content'} gap={4}>
            {detailTab?.map((d, i) => {
              return (
                <Tab
                  key={i}
                  fontWeight={700}
                  px={0}
                  _active={{ bg: 'none' }}
                  fontSize={18}
                  // borderBottom={'none'}
                >
                  {d}
                </Tab>
              );
            })}
          </HStack>
        </TabList>

        <TabPanels fontSize={14} mt={'-12px'}>
          <TabPanel px={6}>
            <HStack className="detailItem">
              <Text w={'120px'}>Type</Text>
              <HStack>
                {pokemonDetails?.types?.map((t, i) => {
                  return (
                    <Badge key={i} colorScheme={typeColor(t?.type?.name)}>
                      {t?.type?.name || 'Loading...'}
                    </Badge>
                  );
                })}
              </HStack>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Shape</Text>
              <Text>
                {species?.shape?.name[0].toUpperCase() +
                  species?.shape?.name?.slice(1) || 'Undefined'}
              </Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Color</Text>
              <Text>
                {species?.color?.name[0].toUpperCase() +
                  species?.color?.name?.slice(1) || 'Undefined'}
              </Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Height</Text>
              <Text>{pokemonDetails?.height / 10 + ' m' || 'Undefined'}</Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Weight</Text>
              <Text>{pokemonDetails?.weight / 10 + ' kg' || 'Undefined'}</Text>
            </HStack>

            {/* <HStack className="detailItem">
              <Text w={'120px'}>Base Happiness</Text>
              <HStack gap={1}>
                <Text>{species?.base_happiness || 'Undefined'}</Text>
                <Icon w={4} as={FavoriteIcon} />
              </HStack>
            </HStack> */}
          </TabPanel>

          <TabPanel px={6}>
            {pokemonDetails?.stats?.map((s, i) => {
              return (
                <HStack
                  key={i}
                  py={2}
                  borderBottom={'1px solid var(--divider2)'}
                  justifyContent={'space-between'}
                >
                  <Text w={'120px'}>{statsName(s?.stat?.name)}</Text>
                  <Text>{s?.base_stat}</Text>
                </HStack>
              );
            })}
          </TabPanel>

          <TabPanel px={0}>
            <HStack p={6} pt={0} pb={4} w={'100%'} justifyContent={'center'}>
              <Box
                // border={'1px solid var(--divider)'}
                w={'100%'}
                borderRadius={20}
                p={4}
                h={'100%'}
              >
                <Image
                  loading="lazy"
                  src={
                    pokemonDetails?.sprites?.other?.['official-artwork']
                      ?.front_shiny
                  }
                  w={'100%'}
                />
              </Box>
            </HStack>
          </TabPanel>

          <TabPanel px={0}>
            <Text textAlign={'center'}>Unavailable</Text>
          </TabPanel>

          <TabPanel px={0}>
            <Text textAlign={'center'}>Unavailable</Text>
          </TabPanel>

          <TabPanel px={0}>
            <Text textAlign={'center'}>Unavailable</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
