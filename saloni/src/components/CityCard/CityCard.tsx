import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

interface City {
  id: string;
  name: string;
}

interface CityCardProps {
  city: City;
  onClick: (id: string) => void; // A callback function to handle the click event
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  const { id, name } = city;
  const handleClick = () => {
    onClick(id); // Pass the id to the callback function
  };

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
      <HStack
        p={4}
        borderRadius="md"
        border="1px solid #E2E8F0"
        alignItems="center"
        justifyContent="space-between"
        _hover={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Text>{name}</Text>
        <ChevronRightIcon color="gray.400" />
      </HStack>
    </motion.div>
  );
};

export default CityCard;
