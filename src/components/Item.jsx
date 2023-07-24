import { useEffect, useState } from 'react';
import axios from 'axios';
import { VStack, Image, Text, Link } from '@chakra-ui/react';

export default function Item(props) {
  const data = props?.data;
  const rawName = data?.name;
  const name = rawName[0]?.toUpperCase() + rawName?.slice(1);
  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    const api = data.url;

    axios
      .get(api)
      .then(r => {
        // console.log(r.data);
        setDetailsData(r.data);
      })
      .catch(e => console.log(e));
  }, [data.url]);

  return (
    <Link href={`${detailsData?.id}`}>
      <VStack
        gap={0}
        borderRadius={10}
        border={'1px solid var(--divider)'}
        h={200}
        p={4}
      >
        <Image src={detailsData?.sprites.front_default} h={'100%'} />
        <Text fontWeight={700} noOfLines={1} mb={1}>{name}</Text>
        <Text fontSize={14}>{detailsData?.id.toString().padStart(3, '0')}</Text>
      </VStack>
    </Link>
  );
}
