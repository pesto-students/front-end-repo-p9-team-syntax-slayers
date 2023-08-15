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
import React, { useState } from 'react';
import CarouselCard from '../../components/Carousel/Carousel';
import Navbar from '../../components/common/Navbar/Navbar';
import SortByNav from '../../components/SortByNavBar/SortByNavBar';

const Listings = () => {
  return (
    <>
      <Box w="100%" h="100vh">
        <VStack w="100%" h="200px">
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
            <Heading>95 Salons</Heading>
            <SortByNav options={['relevance', 'distance', 'rating']} />
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Listings;
