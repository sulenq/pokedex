import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  VStack,
  Image,
  Text,
  Spinner,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalOverlay,
  Button,
  Icon,
} from '@chakra-ui/react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import PokemonDetails from '../pages/PokemonDetails';

export default function Item(props) {
  const data = props?.data;
  const rawName = data?.name;
  const name = rawName[0]?.toUpperCase() + rawName?.slice(1);
  const [detailsData, setDetailsData] = useState(null);
  console.log(window.innerWidth);

  // Utils
  const modalContent = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const api = data.url;
    setDetailsData();

    axios
      .get(api)
      .then(r => {
        // console.log(r.data);
        setDetailsData(r.data);
      })
      .catch(e => console.log(e));
  }, [data.url]);

  return (
    <>
      <VStack
        onClick={onOpen}
        cursor={'pointer'}
        gap={0}
        justifyContent={'space-between'}
        p={4}
        borderRadius={12}
        border={'1px solid var(--divider)'}
        _hover={{ bg: 'var(--divider2)' }}
      >
        {detailsData ? (
          <Image
            objectFit={'contain'}
            boxSize={'140px'}
            src={
              detailsData?.sprites?.other?.['official-artwork']?.front_default
            }
            w={'100%'}
          />
        ) : (
          <VStack h={'100%'}>
            <Spinner />
          </VStack>
        )}
        <Text fontWeight={700} noOfLines={1}>
          {name}
        </Text>
        <Text fontSize={14}>{detailsData?.id.toString().padStart(4, '0')}</Text>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        initialFocusRef={modalContent}
        size={window.innerWidth < 560 ? 'full' : 'xl'}
        isCentered
      >
        <ModalOverlay backdropFilter={'blur(10px)'} />

        <ModalContent ref={modalContent} overflow={'hidden'}>
          <ModalBody p={0}>
            <PokemonDetails id={detailsData?.id} />
          </ModalBody>

          <ModalFooter p={0}>
            <Button
              leftIcon={<Icon as={ArrowBackIcon} fontSize={18} />}
              w={'100%'}
              h={'50px'}
              variant={'ghost'}
              borderRadius={0}
              fontSize={'14px'}
              onClick={onClose}
            >
              BACK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
