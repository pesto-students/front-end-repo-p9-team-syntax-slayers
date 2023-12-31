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
  VStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { GiPathDistance } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';

import GenderBtn from '../Buttons/GenderBtn';
import { addSalonDetails } from '../../redux/slices/cart';

export interface SalonCardProps {
  id?: string;
  salonName: string;
  rating?: string;
  price?: string;
  gender: string;
  distance?: number;
  location: string;
  imageUrl?: string;
  ratingCount?: number;
  statusClose?: boolean;
}

const SalonCard: React.FC<SalonCardProps> = (props) => {
  const {
    id,
    salonName,
    rating,
    distance,
    gender,
    location,
    imageUrl,
    statusClose,
  } = props;

  const history = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleCardClick = () => {
    if (user.isLoggedIn) {
      const salon = { salonName, location, gender, imageUrl };
      dispatch(addSalonDetails(salon));
      history(`/salonDetails/${id}`);
    } else {
      alert('please login');
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
      <Card
        key={id}
        direction={{ base: 'column', sm: 'column' }}
        onClick={handleCardClick}
        minW={['280px', '280px']}
        maxW={['100%', '300px']}
        minH={['300px', '300px']}
        maxH={['300px', '310px']}
        opacity={statusClose ? 0.7 : 1}
        margin={['9px']}
        _hover={{ opacity: 0.8, cursor: 'pointer' }}
        borderRadius={{ base: 'xl', sm: 'none' }}
        borderTopRadius={{ base: 'xl', sm: 'xl' }}
      >
        <Flex
          position="relative"
          maxW={['100vw']}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={imageUrl}
            minW={'100%'}
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

        <CardBody p={'8px'}>
          <VStack
            direction={{ base: 'row', md: 'row' }}
            alignItems={{ base: 'flex-start' }}
          >
            <Box flex="1" maxW={'90%'}>
              <Heading as="h6" size="sm">
                {salonName}
              </Heading>
              <HStack>
                <HStack mr="3px">
                  <StarIcon color="gold" />
                  <Text fontSize="sm">{Number(rating).toFixed(2)}</Text>
                  <Text fontSize="sm">({props.ratingCount})</Text>
                </HStack>

                <HStack ml={['10px', '18px']}>
                  <GiPathDistance />
                  <Text fontSize="sm">{distance} Kms</Text>
                  <GenderBtn> {gender} </GenderBtn>
                </HStack>
              </HStack>
            </Box>
            <HStack>
              {' '}
              <GrLocation />
              <Text fontSize="sm">{location}</Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SalonCard;
