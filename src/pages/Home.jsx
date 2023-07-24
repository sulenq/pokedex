import { Box, HStack, Text, Input, IconButton, Icon } from '@chakra-ui/react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import ItemList from '../components/ItemList';

export default function Home() {
  return (
    <Box py={4} px={6}>
      <Box lineHeight={1.7} mb={4}>
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

      <HStack mb={4} className="sticky">
        <Input
          className="input"
          variant={'filled'}
          borderRadius={10}
          placeholder="Search by Name or Number"
          _placeholder={{ fontSize: 14 }}
        />

        <IconButton
          className="p-btn"
          aria-label="searchPokemonBtn"
          icon={<Icon as={SearchOutlinedIcon} />}
          borderRadius={10}
        />
      </HStack>

      <ItemList />
    </Box>
  );
}
