import {
  Button,
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CarouselCard from '../../components/Carousel/Carousel';
import SortByNav from '../../components/SortByNavBar/SortByNavBar';

const Listings = () => {
  const [selectedOption, setSelectedOption] = useState<string>('relevance');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Box w="100%" h="auto">
        <VStack w="100%">
          <CarouselCard />
        </VStack>
        <VStack w="100%" h="auto">
          <HStack
            m={'10px'}
            p={['10px', '25px']}
            w="100%"
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            {/* <Heading>95 Salons</Heading> */}

            <SortByNav
              options={['relevance', 'distance', 'rating']}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
            />
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Listings;
