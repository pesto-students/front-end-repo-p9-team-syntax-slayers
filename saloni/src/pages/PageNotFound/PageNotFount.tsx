import React from 'react';
import { Box, Center, Heading, Text, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <Center h="100vh">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <motion.div variants={itemVariants}>
          <Box
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
          >
            <Heading size="2xl" color="red.500">
              404
            </Heading>
            <Text fontSize="xl" mt="2" color="gray.600">
              Oops! The page you are looking for does not exist.
            </Text>
            <Link mt="4" color="blue.500" fontWeight="bold" href="/">
              Go back to homepage
            </Link>
          </Box>
        </motion.div>
      </motion.div>
    </Center>
  );
};

export default NotFoundPage;
