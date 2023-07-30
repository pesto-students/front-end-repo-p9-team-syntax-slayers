import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  HStack,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

interface SalonCardProps {
  salonName: string;
  rating: string;
  price: string;
  gender: string;
  location: string;
  imageUrl: string;
  statusClose: boolean;
}

const SalonCard: React.FC<SalonCardProps> = (pageProps) => {
  
  //Destructring props
  const { salonName, rating, price, gender, location, imageUrl, statusClose } = pageProps;
  return (
    <>
      <Box
        as={Card}
        direction={{base:"row",sm:"column"}}
        maxW={{base:"100%",sm:"250px"}}
        minW={{base:"390px",sm:"170px"}}
        minH={{base:"140px",sm:"200px"}}
        pointerEvents={statusClose ? "none" : "auto"}
        opacity={statusClose ? 0.7 : 1}
        margin={"9px"}
        _hover={{opacity:0.8}}
        borderRadius={{base:"xl",sm:"none"}}
        borderTopRadius={{base:"xl",sm:"xl"}}
      >
        <Box position={"relative"} alignItems="center" maxW={{base:"180px",sm:"100%"}} justifyContent="center">
            
          <Image
            src={imageUrl}
            width="100%"
            height="100%"
            alt="Green double couch with wooden legs"
            borderTopRadius={{base:"none",sm:"xl"}}
            borderTopLeftRadius={{base:"xl",sm:"xl"}}
            borderBottomLeftRadius={{base:"xl",sm:"none"}}
          />

          {statusClose && (
            <Box
              position={"absolute"}
              color={"accent"}
              width={{base:"80%",sm:"100%"}}
              maxH={"40px"}
              top="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={"secondary"}
              transform="translateY(-50%)"
            >
              <Text
                fontSize={"xl"}
                fontWeight={"500"}
                color={"accent.500"}
                width={"100%"}
                textAlign={"center"}
              >
                Unavailable
              </Text>
            </Box>
          )}
        </Box>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
            <Box flex="1">
              <Heading as="h6" size="sm">
                {salonName}
              </Heading>
              <Text fontSize={"sm"}>{rating}</Text>
              <Text fontSize={"sm"}>Price Rs. {price}</Text>
              <Text fontSize={"sm"}>{location}</Text>
            </Box>
            <Button
              color={"accent.100"}
              colorScheme={""}
              variant={"outline"}
              mt='7px'
              size={{ base: "xs", sm: "sm" }}
            >
              {gender}
            </Button>
          </Flex>

        </CardBody>
      </Box>
    </>
  );
};

export default SalonCard;
