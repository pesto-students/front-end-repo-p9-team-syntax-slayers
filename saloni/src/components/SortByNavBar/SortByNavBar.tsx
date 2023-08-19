import React, { useEffect, useState, useCallback } from 'react';
import {
  Flex,
  Text,
  Box,
  Center,
  HStack,
  VStack,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import SalonCard from '../SalonCard/SalonCard';
import { Salon } from '../../global';
import { useAppSelector } from '../../redux/hooks';
import instance from '../../API';
import { motion } from 'framer-motion';

interface SortByNavProps {
  options: string[];
  selectedOption: string;
  onOptionClick: (option: string) => void;
}

const SortByNav: React.FC<SortByNavProps> = ({
  options,
  selectedOption,
  onOptionClick,
}) => {
  const [data, setData] = useState<Salon[]>([]);
  const [salonCount, setSalonCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(9);
  const user = useAppSelector((state) => state.user);
  const [existingSalonIds, setExistingSalonIds] = useState<string[]>([]);

  const fetchMoreData = useCallback(async () => {
    try {
      setIsLoading(true);

      const reqBody = {
        sortByType: selectedOption,
        // ... other filters
        count: count,
        lon: user.userLocation.lon,
        lat: user.userLocation.lat,
        existingSalonIDs: existingSalonIds,
      };

      const respData = await instance.post(
        `${process.env.REACT_APP_BASEURL}salon/nearBySalons`,
        reqBody,
      );

      if (respData?.data?.data) {
        const newSalons = respData?.data?.data?.nearBySalons?.nearBySalons;

        // Extract unique salon IDs from the new data
        const newSalonIds = newSalons.map((salon: Salon) => salon.id);
        const uniqueSalonIds = Array.from(
          new Set([...existingSalonIds, ...newSalonIds]),
        );

        setData((prevData) => {
          const updatedData = prevData.filter(
            (salon) => !uniqueSalonIds.includes(salon.id),
          );
          return [...updatedData, ...newSalons];
        });

        if (respData?.data?.data?.nearBySalons?.nearBySalons) {
          setSalonCount(
            respData?.data?.data?.nearBySalons?.nearBySalonsCount[0].count,
          );
        }

        setExistingSalonIds(uniqueSalonIds);
        setCount(uniqueSalonIds.length + 9);
      }
    } catch (error) {
      console.log('-err', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedOption, count, user, existingSalonIds]);
  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    // Clear data and reset count when selectedOption changes
    setData([]);
    setCount(2);
    setExistingSalonIds([]);
    // Fetch initial data based on the new selectedOption
    fetchMoreData();
  }, [selectedOption]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <VStack>
      <HStack justifyContent={'space-between'} w={'100%'} mb={'20px'}>
        <Box>
          <Heading
            fontSize={['xl', '3xl']}
          >{`${salonCount} Salons Near You`}</Heading>
        </Box>

        <HStack>
          {options.map((option) => (
            <HStack
              w="90%"
              key={option}
              p={2}
              cursor="pointer"
              onClick={() => onOptionClick(option)}
              borderBottom={
                selectedOption === option ? '2px solid #F61732' : 'none'
              }
            >
              <Center>
                <Text
                  fontWeight={selectedOption === option ? 'bold' : 'normal'}
                >
                  {option}
                </Text>
              </Center>
            </HStack>
          ))}
        </HStack>
      </HStack>
      <HStack wrap={'wrap'} h="auto" gap={3}>
        {data?.map((salon) => (
          <motion.div
            key={salon.id}
            initial={{ opacity: 0 }} // Initial opacity
            animate={{ opacity: 1 }} // Animation to full opacity
            transition={{ duration: 0.5 }} // Animation duration
          >
            <SalonCard
              id={salon.id}
              key={salon.id}
              salonName={salon.name}
              rating={salon.rating.toString()}
              distance={Number(salon?.distance?.toFixed(2)) || 0}
              gender={salon.gender}
              location={salon.address}
              ratingCount={salon?.rating_count || 0}
              imageUrl={salon.banner}
              statusClose={!!salon.temp_inactive}
            />
          </motion.div>
        ))}
        {isLoading && (
          <Center w="100%">
            <Spinner size="lg" color="primary" />
          </Center>
        )}
      </HStack>
    </VStack>
  );
};

export default SortByNav;
