import { Heading, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { slides } from "./Helper";
import "./Carousel.css";

const CarouselCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const gotToSlide=(index:number)=> {
      setCurrentIndex(index)
  }

  return (
    <>
      <Box
        as={"div"}
        w={"100%"}
        h={{ base: "200", md: "400" }}
        m={"auto"}
        bg={""}
        position={'relative'}
      >
        <Box as={"div"} h={"100%"} position={"relative"}>
          <ChevronLeftIcon
            position={"absolute"}
            top={"50%"}
            left={{ base: 1, sm: 12 }}
            opacity={0.2}
            boxSize={{ base: "50", sm: "100" }}
            color={"white"}
            cursor={"pointer"}
            onClick={goToPrevious}
          />
          <ChevronRightIcon
            position={"absolute"}
            top={"50%"}
            right={{ base: 1, sm: 12 }}
            opacity={0.2}
            boxSize={{ base: "50", sm: "100" }}
            color={"white"}
            cursor={"pointer"}
            onClick={goToNext}
          />

          <Box
            as={"div"}
            w={"100%"}
            h={"100%"}
            backgroundSize={{ base: "cover" }}
            backgroundPosition={"center"}
            backgroundImage={`url(${slides[currentIndex].url})`}
            backgroundRepeat={"no-repeat"}
          />
        </Box>
        <Box as={'div'} display={'flex'} justifyContent={'center'} position={'absolute'} bottom={0} width={'100%'}>
         {slides.map((slide,index)=>{
          return <Heading key={index} fontSize={'50px'} color={'white'} opacity={0.5} onClick={()=>gotToSlide(index)} cursor={'pointer'} ml={2}>.</Heading>
         })}
        </Box>
      </Box>
    </>
  );
};

export default CarouselCard;
