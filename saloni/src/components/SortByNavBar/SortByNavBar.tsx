import React from 'react';
import { Flex, Text, Box, Center, HStack, VStack } from '@chakra-ui/react';
import SalonCard from '../SalonCard/SalonCard';
import { Salon } from '../../global';

interface SortByNavProps {
  options: string[];
  selectedOption: string;
  onOptionClick: (option: string) => void;
  data: Salon[];
}

const SortByNav: React.FC<SortByNavProps> = ({
  options,
  selectedOption,
  onOptionClick,
  data,
}) => {
  console.log('data1', data);
  return (
    <VStack>
      <HStack>
        {options.map((option) => (
          <HStack
            key={option}
            p={2}
            cursor="pointer"
            onClick={() => onOptionClick(option)}
            borderBottom={
              selectedOption === option ? '2px solid #F61732' : 'none'
            }
          >
            <Center>
              <Text fontWeight={selectedOption === option ? 'bold' : 'normal'}>
                {option}
              </Text>
            </Center>
          </HStack>
        ))}
      </HStack>
      <HStack>
        {data?.map((salon) => (
          <SalonCard
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
        ))}
      </HStack>
    </VStack>
  );
};

export default SortByNav;
