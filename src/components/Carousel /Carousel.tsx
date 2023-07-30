import { Flex, Heading, Image, Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import "./Carousel.css";

const CarouselCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [

    {
      url: "https://static.magicpin.com/samara/media/blog/18-01-2022-best_salon_bangalore_cover.jpg",
      title: "abc",
    },
    {
      url: "https://scontent.fpnq7-2.fna.fbcdn.net/v/t39.30808-6/301950931_773460743704509_888121629047839114_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=LudiUcRuXVQAX-x2esz&_nc_ht=scontent.fpnq7-2.fna&oh=00_AfA18IeP2SRA9gQLNwzKmAeEvYL6X2Lt5q-pvQsz_FHXOQ&oe=64CB392E",
      title: "abc",
    },
    {
      url: "https://www.mygreentrends.in/wp-content/uploads/bfi_thumb/Web-page-banner-Haircut-Men-003-pkmoxoo2p778ee5yqyoyjvineb44wvw8nsm1002t3e.jpg",
      title: "abc",
    },
    {
      url: "https://www.mygreentrends.in/wp-content/uploads/bfi_thumb/Web-page-banner-Hair-Straightening-Women-001-pms16em8oy8m8wjo23wwbhwt6csilqukpp93780uru.jpg",
      title: "abc",
    },
  ];

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
