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
import {BookedService} from "../../pages/userProfile/UserProfile"
interface BookingCardProps{

  orderId:string,
  salonName:string,
  city:string,
  salonImageUrl:string,
  bookingTime:string,
  services?:BookedService[],
}

const BookingCard:React.FC<BookingCardProps> = (props) => {
  const {orderId, salonName, city, salonImageUrl, bookingTime, services} = props
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
                <Text fontSize={{base:"8",sm:"sm"}} color='gray'>Order: #{orderId}</Text>
                <Heading fontSize={{base:"sm",sm:"md"}}>{salonName}</Heading>
                <HStack spacing={5} mt={2}>
                  <VStack align="start" spacing={0}>
                    <Text py="" fontSize={{base:"2xs", sm:"xs"}}>
                      Time: {bookingTime}
                    </Text>
                    <Text mt="0" fontSize={{base:"2xs", sm:"xs"}}>
                      {city}
                    </Text>

                  </VStack>
                  <VStack align="start" spacing={0}>
                   {services?.map((item,index)=>{
                    return <Text key={index} py="" fontSize={{base:"2xs", sm:"xs"}}>
                           {index+1}. {item.name} ({item.duration}m)
                  </Text>
                   })}
                    <Divider/>
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
