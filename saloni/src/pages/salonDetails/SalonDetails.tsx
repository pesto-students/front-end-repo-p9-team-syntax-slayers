import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import React, { useEffect } from "react";
import CarouselCard from "../../components/Carousel/Carousel";
import { useState } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Cart from "../../components/Cart/Cart";
import {
  reviewDummyData,
  serviceListDummy,
} from "../../components/ReviewCard/Helper"; 

interface SalonDetailsProps{

}

const SalonDetails:React.FC<SalonDetailsProps> = (props) => {
  
  const [serviceList, setServiceList] = useState([]);
  const [reviewersList, setReviewersList] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [ratingNumber, setRatingNumber] = useState(0);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    let sum = 0;
    {
      /* instead of reviewDummyData we will use reviewersList here */
    }
    reviewDummyData.map((item, index) => {
      sum += item.rating;
    });
    {
      /* instead of reviewDummyData we will use reviewersList here */
    }
    setRatingNumber(sum / reviewDummyData.length);
  }, []);
  return (
    <>
      <Flex direction={"column"} bg={"primary"}>
        <HStack spacing={12} ml={6}>
          <Text color={"white"}>Salon NAme</Text>{" "}
          <HStack>
            {" "}
            <AiFillStar color="gold" />
            <Text color={"white"}>{ratingNumber}</Text>
          </HStack>{" "}
          <Button
            variant={"outline"}
            color={"accent.500"}
            colorScheme={"accent.500"}
          >
            Unisex
          </Button>
        </HStack>
        <HStack spacing={12} ml={6}>
          {" "}
          <HStack>
            <Text color={"green"}>Open</Text>{" "}
            <Text color={"white"}>Until: 7:00PM</Text>
          </HStack>{" "}
          <Text color={"white"}>Whitefield Banglore</Text>
        </HStack>
      </Flex>
      <CarouselCard />

      <Box padding={{ base: "", sm: "5" }}>
        <Box padding={5}>
          <Heading fontSize={"xl"}> Description</Heading>
          <Text mt={2}>
            Hair and Beauty Unisex Salon offer a variety of services including
            professional hair cutting and styling, manicures and pedicures, and
            often cosmetics, makeup and makeovers.
          </Text>
        </Box>

        <Box>
          <Button
            variant={activeButton === "Featured" ? "solid" : "outline"}
            color={activeButton === "Featured" ? "accent.500" : "black"}
            bg={activeButton === "Featured" ? "primary" : "white"}
            ml={3}
            _hover={{}}
            mr={{ sm: "10" }}
            onClick={() => handleButtonClick("Featured")}
          >
            Featured
          </Button>
          <Button
            variant={activeButton === "Hair" ? "solid" : "outline"}
            color={activeButton === "Hair" ? "accent.500" : "black"}
            bg={activeButton === "Hair" ? "primary" : "white"}
            ml={3}
            _hover={{}}
            mr={{ sm: "10" }}
            onClick={() => handleButtonClick("Hair")}
          >
            Hair
          </Button>
          <Button
            variant={activeButton === "MakeUp" ? "solid" : "outline"}
            color={activeButton === "MakeUp" ? "accent.500" : "black"}
            bg={activeButton === "MakeUp" ? "primary" : "white"}
            ml={3}
            _hover={{}}
            mr={{ sm: "10" }}
            onClick={() => handleButtonClick("MakeUp")}
          >
            MakeUp
          </Button>
          <Button
            variant={activeButton === "Spa" ? "solid" : "outline"}
            color={activeButton === "Spa" ? "accent.500" : "black"}
            bg={activeButton === "Spa" ? "primary" : "white"}
            ml={3}
            _hover={{}}
            mr={{ sm: "10" }}
            onClick={() => handleButtonClick("Spa")}
          >
            Spa
          </Button>
        </Box>
        <Divider mt={3} width={{ sm: "30%" }} />
        <Flex direction={{ base: "column", sm: "row" }}>
          <Box width={{ base: "100%", sm: "70%" }}>
            {/* instead of serviceListDummy list we will use here serviceList */}
            {serviceListDummy.map((item, index) => {
              return (
                <ServiceCard
                  key={index}
                  serviceName={item.serviceName}
                  duration={item.duration}
                  price={item.price}
                  gender={item.gender}
                />
              );
            })}
          </Box>
          <Cart />
        </Flex>

        <Box ml={4} mt={20}>
          <Heading fontSize={"xl"} mb={3}>
            {" "}
            Reviews
          </Heading>
          <HStack>
            <AiFillStar size={24} color="gold" />
            <Text>
              {/* instead of reviewDummyData we will use reviewersList here */}
              {ratingNumber}({reviewDummyData.length})
            </Text>
          </HStack>
          <HStack
            justifyContent={"flex-start"}
            whiteSpace={"normal"}
            overflowX="scroll"
            flexWrap="nowrap"
          >
            {/* instead of reviewDummyData we will use reviewersList here */}
            {reviewDummyData.map((item, index) => {
              return (
                <ReviewCard
                  key={index}
                  reviewerName={item.reviewerName}
                  reviewDate={item.reviewDate}
                  review={item.review}
                  rating={item.rating}
                />
              );
            })}
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default SalonDetails;
