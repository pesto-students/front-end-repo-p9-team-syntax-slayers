import {
  Heading,
  Image,
  Text,
  Box,
  VStack,
  Flex,
  HStack,
  Stack,
  Card,
  Divider,
} from "@chakra-ui/react";
import React from "react";

interface BookingCardProps{

  orderId:string,
  salonName:string,
  city:string,
  salonImageUrl:string,
  bookingDate:string,
  bookingTime:string,
  pricePaid:string,
  services?:string[],
}

const BookingCard:React.FC<BookingCardProps> = (props) => {
  const {orderId, salonName, city, salonImageUrl, bookingDate, bookingTime, pricePaid, services} = props
  return (
    <>
      <Card
        direction={"row"}
        overflow="hidden"
        variant="outline"
        maxW={"650px"}
        maxH={"140px"}
        m={'5'}
        alignItems={'center'}
      >
        <Box bg={""} padding={"20px"} maxW={"180px"}>
          <Image
            objectFit="cover"
            width={"100%"}
            height={"100%"}
            borderRadius={10}
            src={salonImageUrl}
            alt="Caffe Latte"
          />
        </Box>
        <Stack pr={'5px'}>
           <Flex padding={'5px'}>
            <Box overflowY="auto" maxH={"180px"}>
              <VStack align="start" spacing={0}>
                <Text fontSize={{base:"xs",sm:"sm"}} color='gray'>Order: #{orderId}</Text>
                <Heading fontSize={{base:"sm",sm:"md"}}>{salonName}</Heading>
                <HStack spacing={5} mt={2}>
                  <VStack align="start" spacing={0}>

                    <Text py="" fontSize={{base:"2xs", sm:"xs"}}>
                      Date: {bookingDate}
                    </Text>
                    <Text py="" fontSize={{base:"2xs", sm:"xs"}}>
                      Time: {bookingTime}
                    </Text>
                    <Text mt="0" fontSize={{base:"2xs", sm:"xs"}}>
                      {city}
                    </Text>

                  </VStack>
                  <VStack align="start" spacing={0}>
                  <Text py="" fontSize={{base:"2xs", sm:"xs"}}>
                      1.pedicure
                    </Text>
                    <Divider/>
                    <Heading py="" fontSize={{base:"2xs", sm:"xs"}}>
                      Paid: Rs.{pricePaid}
                    </Heading>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
            </Flex>
        </Stack>
      </Card>
    </>
  );
};

export default BookingCard;
