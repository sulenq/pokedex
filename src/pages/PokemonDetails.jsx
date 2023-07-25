import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  // useColorMode,
} from '@chakra-ui/react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PokemonDetails() {
  const navigate = useNavigate();
  // const { colorMode } = useColorMode();
  const pokemonId = window.location.pathname;
  const [pokemonDetails, setPokemonDetails] = useState();
  const [species, setSpecies] = useState();
  const detailTab = ['Details', 'Shiny', 'Stats', 'Evolution'];
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
    }
  };

  useEffect(() => {
    const api = `https://pokeapi.co/api/v2/pokemon${pokemonId}`;

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
        <IconButton
          onClick={() => {
            navigate('/');
          }}
          icon={<Icon as={ArrowBackIcon} />}
          borderRadius={'full'}
          variant={'ghost'}
        />

        <Box w={'100%'} mr={10}>
          <Text fontWeight={700} fontSize={24} w={'100%'} textAlign={'center'}>
            {pokemonDetails?.name[0]?.toUpperCase() +
              pokemonDetails?.name?.slice(1) || 'Loading...'}
          </Text>

          <Text w={'100%'} textAlign={'center'}>
            {pokemonDetails?.id.toString().padStart(4, '0')}
          </Text>
        </Box>
      </HStack>

      <HStack p={4} pt={0} justifyContent={'center'}>
        <Box
          border={'1px solid var(--divider)'}
          // bg={colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200'}
          borderRadius={20}
          p={4}
          h={'100%'}
        >
          <Image
            loading="lazy"
            src={
              pokemonDetails?.sprites?.other?.['official-artwork']
                ?.front_default
            }
            w={'100%'}
          />
        </Box>
      </HStack>

      <HStack px={4} w={'100%'} justifyContent={'center'} mb={4}>
        <IconButton
          h={'100%'}
          // colorScheme="p"
          variant={'outline'}
          borderRadius={20}
          icon={<Icon as={ArrowLeftIcon} />}
        />
        <IconButton
          h={'100%'}
          // colorScheme="p"
          variant={'outline'}
          borderRadius={20}
          icon={<Icon as={ArrowRightIcon} />}
        />
      </HStack>

      <Tabs colorScheme="p">
        <TabList px={6} gap={2} borderBottom={'none'} justifyContent={'center'}>
          {detailTab?.map((d, i) => {
            return (
              <Tab
                key={i}
                fontWeight={700}
                px={2}
                _active={{ bg: 'none' }}
                fontSize={18}
                // borderBottom={'none'}
              >
                {d}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels fontSize={14}>
          <TabPanel px={8}>
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
                  species?.shape?.name?.slice(1) || 'Loading...'}
              </Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Color</Text>
              <Text>
                {species?.color?.name[0].toUpperCase() +
                  species?.color?.name?.slice(1) || 'Loading...'}
              </Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Height</Text>
              <Text>{pokemonDetails?.height / 10 + ' m' || 'Loading...'}</Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Weight</Text>
              <Text>{pokemonDetails?.weight / 10 + ' kg' || 'Loading...'}</Text>
            </HStack>

            <HStack className="detailItem">
              <Text w={'120px'}>Base Happiness</Text>
              <HStack gap={1}>
                <Text>{species?.base_happiness || 'Loading...'}</Text>
                <Icon w={4} as={FavoriteIcon} />
              </HStack>
            </HStack>
          </TabPanel>

          <TabPanel px={0}>
            <Box w={'100%'} overflow={'auto'} scrollSnapType={'x mandatory'}>
              <Image
                className="spritesDetailItem"
                src={
                  pokemonDetails?.sprites?.other?.['official-artwork']
                    ?.front_shiny
                }
              />
            </Box>
          </TabPanel>

          <TabPanel px={8}>
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
        </TabPanels>
      </Tabs>
    </Box>
  );
}
