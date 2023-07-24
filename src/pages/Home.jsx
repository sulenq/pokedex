import {
  Box,
  HStack,
  Text,
  Input,
  IconButton,
  Icon,
  VStack,
} from '@chakra-ui/react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import ItemList from '../components/ItemList';

export default function Home() {
  return (
    <VStack pt={4} px={6} h={'100vh'} gap={0}>
      <Box lineHeight={1.7} mb={4} w={'100%'}>
        <HStack justifyContent={'space-between'}>
          <Text fontWeight={800} fontSize={32}>
            Pokédex
          </Text>
          <ColorModeSwitcher
            borderRadius={'full'}
            size={'sm'}
            fontSize={'sm'}
          />
        </HStack>

        <Text fontSize={14} opacity={0.6}>
          Search for a Pokémon by name or using its National Pokédex number.
        </Text>
      </Box>

      <HStack mb={2} className="sticky" w={'100%'}>
        <Input
          className="input"
          variant={'filled'}
          borderRadius={12}
          placeholder="Search by Name or Number"
          _placeholder={{ fontSize: 14 }}
        />

        <IconButton
          // className="p-btn"
          colorScheme="p"
          aria-label="searchPokemonBtn"
          icon={<Icon as={SearchOutlinedIcon} />}
          borderRadius={12}
        />
      </HStack>

      <ItemList />
    </VStack>
  );
}
