import React from 'react';
import { VStack, Heading, Text, HStack } from '@chakra-ui/react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureSection: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <VStack justifyContent="space-between" m="10px">
      <HStack m="10px">
        {icon}
        <Heading color="secondary">{title}</Heading>
      </HStack>

      <VStack alignItems="center">
        <Text color="secondary" fontSize="md">
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};

export default FeatureSection;
