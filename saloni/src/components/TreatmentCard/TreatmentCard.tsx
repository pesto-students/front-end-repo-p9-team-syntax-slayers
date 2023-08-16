import { Box, Card, CardBody, Image, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface TreatmentCardProps {
  imageUrl: string;
  serviceName: string;
  description?: string;
}

const TreatmentCard: React.FC<TreatmentCardProps> = (props) => {
  const { imageUrl, serviceName, description } = props;

  return (
    <>
      <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
        <Card
          direction={['column', 'row']}
          maxW={{ base: '100%', sm: '230px' }}
          minW={{ base: '100%', sm: '190px' }}
          borderRadius={'10px'}
          _hover={{ cursor: 'pointer' }}
          margin="9px"
          overflow="hidden"
        >
          <Image
            objectFit="cover"
            maxW={['100%', '110px']}
            borderTopLeftRadius={['xl', 'xl']}
            borderBottomLeftRadius={['xl', 'xl']}
            src={imageUrl}
            alt="Treatment Image"
          />

          <CardBody
            display="flex"
            flexDirection={['column', 'row']}
            justifyContent="center"
            alignItems={['flex-start', 'center']}
            flex="1"
          >
            <Box>
              <Heading size="xs">{serviceName}</Heading>
              <Text fontSize="xs" mt={['5px', '0']}>
                {description}
              </Text>
            </Box>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
};

export default TreatmentCard;
