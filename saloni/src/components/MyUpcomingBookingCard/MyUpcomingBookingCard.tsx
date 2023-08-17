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
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { GrLocation } from 'react-icons/gr';
import { motion } from 'framer-motion';

import { BookingInfo } from '../../global';

const MyUpcomingBookingCard: React.FC<BookingInfo> = (props) => {
  const {
    banner,
    orderID,
    salonName,
    startTime,
    salonAddress,
    bookedServices,
  } = props;

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
      <Card
        key={orderID}
        direction={{ base: 'column', sm: 'column' }}
        minW={['280px', '280px']}
        maxW={['100%', '300px']}
        minH={['300px', '300px']}
        maxH={['300px', '310px']}
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
            src={banner}
            minW={'100%'}
            aspectRatio={15 / 8}
            alt={salonName}
            borderTopRadius={{ base: 'none', sm: 'xl' }}
            borderTopLeftRadius={{ base: 'xl', sm: 'xl' }}
            borderBottomLeftRadius={{ base: 'xl', sm: 'none' }}
          />
        </Flex>

        <CardBody>
          <Flex
            direction={{ base: 'row', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Box flex="1">
              <Heading as="h6" size="sm">
                {salonName}
              </Heading>
              <HStack mt={'8px'}>
                <HStack mr="3px">
                  <TimeIcon />
                  <Text fontSize="sm">{startTime}</Text>
                </HStack>
              </HStack>

              <HStack mt={'8px'}>
                <GrLocation />
                <Text fontSize="sm">{salonAddress}</Text>
              </HStack>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default MyUpcomingBookingCard;
