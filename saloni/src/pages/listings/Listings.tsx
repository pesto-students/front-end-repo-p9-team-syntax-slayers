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
import { City, GeoAddress, Salon, longlat } from '../../global';
import instance, { setAuthHeaders } from '../../API';
import useGeolocation from '../../helper/geolocation';
import { geocodeCoordinates } from '../../helper/geoCoding';
import { useAppSelector } from '../../redux/hooks';

const Listings = () => {
  const [selectedOption, setSelectedOption] = useState<string>('relevance');
  const [data, setData] = useState<Salon[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const reqBody = {
          sortByType: selectedOption,
          // filterByType: 'unisex',
          existingSlonIDs: [],
          count: 10,
          lon: user.userLocation.lon,
          lat: user.userLocation.lat,
        };

        const respData = await instance.post(
          `${process.env.REACT_APP_BASEURL}salon/nearBySalons`,
          reqBody,
        );

        if (respData.data.data) {
          setData(respData.data.data);
        }
      } catch (error) {
        console.log('-err', error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

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
            {/*  */}

            <SortByNav
              options={['relevance', 'distance', 'rating']}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
              data={data}
            />
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Listings;
