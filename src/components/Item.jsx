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
        borderRadius={12}
        justifyContent={'space-between'}
        border={'1px solid var(--divider)'}
        // h={240}
        p={4}
      >
        <Image
          src={detailsData?.sprites?.other?.['official-artwork']?.front_default}
          w={'100%'}
          loading="lazy"
        />
        <Text fontWeight={700} noOfLines={1}>
          {name}
        </Text>
        <Text fontSize={14}>{detailsData?.id.toString().padStart(4, '0')}</Text>
      </VStack>
    </Link>
  );
}
