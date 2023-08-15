import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { GiPathDistance } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { motion } from 'framer-motion';

interface SalonCardProps {
  salonName: string;
  rating: string;
  price?: string;
  gender: string;
  distance?: number;
  location: string;
  imageUrl: string;
  ratingCount?: number;
  statusClose: boolean;
}

const SalonCard: React.FC<SalonCardProps> = (props) => {
  const {
    salonName,
    rating,
    distance,
    gender,
    location,
    imageUrl,
    statusClose,
  } = props;

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
      <Card
        direction={{ base: 'row', sm: 'column' }}
        minW={['170px', '350px']}
        maxW={['240px', '350px']}
        minH={['200px', '300px']}
        maxH={['200px', '300px']}
        opacity={statusClose ? 0.7 : 1}
        margin={['9px']}
        _hover={{ opacity: 0.8 }}
        borderRadius={{ base: 'xl', sm: 'none' }}
        borderTopRadius={{ base: 'xl', sm: 'xl' }}
      >
        <Flex
          position="relative"
          maxW={{ base: '180px', sm: '100%' }}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={imageUrl}
            minW={'100%'}
            minH={'100%'}
            aspectRatio={15 / 8}
            alt="Green double couch with wooden legs"
            borderTopRadius={{ base: 'none', sm: 'xl' }}
            borderTopLeftRadius={{ base: 'xl', sm: 'xl' }}
            borderBottomLeftRadius={{ base: 'xl', sm: 'none' }}
          />

          {statusClose && (
            <Box
              position="absolute"
              color="accent"
              width={{ base: '80%', sm: '100%' }}
              maxH={'40px'}
              top="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="secondary"
              transform="translateY(-50%)"
            >
              <Text
                fontSize="xl"
                fontWeight="500"
                color="accent.500"
                width="100%"
                textAlign="center"
              >
                Unavailable
              </Text>
            </Box>
          )}
        </Flex>

        <CardBody>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Box flex="1">
              <Heading as="h6" size="sm">
                {salonName}
              </Heading>
              <HStack>
                <HStack mr="3px">
                  <StarIcon color="gold" />
                  <Text fontSize="sm">{rating}</Text>
                  <Text fontSize="sm">({props.ratingCount})</Text>
                </HStack>

                <HStack ml={['10px', '18px']}>
                  <GiPathDistance />
                  <Text fontSize="sm">{distance} Kms</Text>
                </HStack>

                <Button
                  color="accent.100"
                  colorScheme=""
                  variant="outline"
                  mt="7px"
                  ml={['10px', '18px']}
                  size={{ base: 'xs', sm: 'sm' }}
                >
                  {gender}
                </Button>
              </HStack>

              <HStack>
                <GrLocation />
                <Text fontSize="sm">{location}</Text>
              </HStack>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SalonCard;
