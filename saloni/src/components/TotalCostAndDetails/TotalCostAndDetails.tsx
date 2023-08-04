import React, { useState } from 'react';
import { Box, Heading, Text, VStack, Image, Flex, HStack, Divider } from '@chakra-ui/react';
import { SelectedServiceDummyList } from '../../components/SelectedServiceCard/Helper';

interface TotalCostAndDetailsProps{

}


const TotalCostAndDetails:React.FC<TotalCostAndDetailsProps> = () => {
  const [selectedServiceList, setSelectedServiceList] = useState([]);

  {/* we may use selectedServiceList or get values from redux sotre instead of SelectedServiceDummyList */}

  const totalPrice = SelectedServiceDummyList.reduce((acc, service) => acc + parseInt(service.price), 0);

  return (
    <Flex border={2} w={{ base: "100%", md: "500px" }} p={4} flexDirection={'column'} rounded={'md'} boxShadow={'lg'} bg={'white'} mb={2}>
      <HStack spacing={8}>
        <Image src="https://static.magicpin.com/samara/media/blog/18-01-2022-best_salon_bangalore_cover.jpg" maxH="100px" maxW="180" rounded={10}/>
        <VStack spacing={0}>
          <Heading fontSize={'xl'}>Salon Name</Heading>
          <Text>Location</Text>
        </VStack>
      </HStack>
      <Divider color={'lightGrey'} mt={4}/>
      <Flex direction={'column'} p={4}>
        <VStack align={'start'}>
            {/* we may use selectedServiceList or get values from redux sotre instead of SelectedServiceDummyList */}
          {SelectedServiceDummyList.map((item,index) => {
            return (
              <HStack key={index} justify="space-between" width="100%">
                <Text>{item.serviceName}</Text> 
                <Text>Rs.{item.price}</Text>
              </HStack>
            )
          })}
          <Divider color={'lightGrey'} mt={4}/>
          <HStack justify="space-between" width="100%">
            <Text>Total</Text> 
            <Text>Rs.{totalPrice}</Text>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default TotalCostAndDetails;
