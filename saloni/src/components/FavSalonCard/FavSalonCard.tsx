
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



  export interface MyFavSalonData {
    salonName?: string;
    salonAddress?: string;
    openFrom?: string;
    openTill?: string;
    currentlyInactive?: number;
    banner?: string;
    rating?: number;
    ratingCount?: number;
  }


  
const FavSalonCard:React.FC<MyFavSalonData> = ({salonName,salonAddress,openFrom,openTill,currentlyInactive,banner,rating,ratingCount}) => {
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
                src={banner}
                alt="Caffe Latte"
              />
            </Box>
            <Stack pr={'5px'}>
               <Flex padding={'5px'}>
                <Box overflowY="auto" maxH={"180px"}>
                  <VStack align="start" spacing={0}>
                    <Text fontSize={{base:"8",sm:"sm"}} color='gray'>Order: #{ratingCount}</Text>
                    <Heading fontSize={{base:"sm",sm:"md"}}>{salonName}</Heading>
                    <HStack spacing={5} mt={2}>
                      <VStack align="start" spacing={0}>
    {/* 
                        <Text py="" fontSize={{base:"2xs", sm:"xs"}}>
                          Date: {bookingDate}
                        </Text> */}
                        <Text py="" fontSize={{base:"2xs", sm:"xs"}}>
                          Time: {openFrom}
                        </Text>
                        <Text mt="0" fontSize={{base:"2xs", sm:"xs"}}>
                          {salonAddress}
                        </Text>
    
                      </VStack>
                      <VStack align="start" spacing={0}>
                        <Divider/>
                        {/* <Heading py="" fontSize={{base:"2xs", sm:"xs"}}>
                          Paid: Rs.{pricePaid}
                        </Heading> */}
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
                </Flex>
            </Stack>
          </Card>
        </>
      );
}

export default FavSalonCard
