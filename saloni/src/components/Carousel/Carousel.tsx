import { Box, Heading, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import { slides } from './Helper';
import './Carousel.css';

const CarouselCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const gotToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 5000); // Auto slide every 5 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <Box
        as={'div'}
        w={'100%'}
        h={['200px','400px']}
        m={'auto'}
        bg={''}
        position={'relative'}
      >
        <Box as={'div'} h={'100%'} position={'relative'}>
          <ChevronLeftIcon
            position={'absolute'}
            top={'50%'}
            left={{ base: 1, sm: 12 }}
            opacity={0.2}
            boxSize={{ base: '50', sm: '100' }}
            color={'white'}
            cursor={'pointer'}
            onClick={goToPrevious}
            zIndex={1000}
          />
          <ChevronRightIcon
            position={'absolute'}
            top={'50%'}
            right={{ base: 1, sm: 12 }}
            opacity={0.2}
            boxSize={{ base: '50', sm: '100' }}
            color={'white'}
            cursor={'pointer'}
            onClick={goToNext}
            zIndex={1000}
          />

          <Image
            as={'div'}
            w={'100%'}
            fit={'cover'}
            h={'100%'}
            backgroundSize={{ base: 'cover' }}
            backgroundPosition={'center'}
            backgroundImage={`url(${slides[currentIndex].url})`}
            backgroundRepeat={'no-repeat'}
          />
          <Box
            as={'div'}
            display={'flex'}
            justifyContent={'center'}
            position={'absolute'}
            bottom={0}
            width={'100%'}
          >
            {slides.map((slide, index) => (
              <Heading
                key={index}
                fontSize={'50px'}
                color={currentIndex === index ? 'white' : 'gray.500'}
                cursor={'pointer'}
                ml={2}
                onClick={() => gotToSlide(index)}
              >
                .
              </Heading>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CarouselCard;
