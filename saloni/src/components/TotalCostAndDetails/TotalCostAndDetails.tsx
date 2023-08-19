import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Image, Flex, HStack, Divider } from '@chakra-ui/react';
import { SelectedServiceDummyList } from '../../components/SelectedServiceCard/Helper';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ServiceCardProps } from '../ServiceCard/ServiceCard';

interface TotalCostAndDetailsProps{

}


const TotalCostAndDetails:React.FC<TotalCostAndDetailsProps> = () => {

  const [selectedServiceList, setSelectedServiceList] = useState<ServiceCardProps[]>([]);
  const cart = useAppSelector(state=>state.cart)

  {/* we may use selectedServiceList or get values from redux sotre instead of SelectedServiceDummyList */}

  useEffect(()=>{
    setSelectedServiceList(cart.cartList)
    console.log(selectedServiceList)
  },[cart.cartList])

  const totalPrice = selectedServiceList.reduce((acc, service) => acc + service.price, 0)
  
  return (
    <Flex border={2} w={{ base: "100%", md: "500px" }} p={4} flexDirection={'column'} rounded={'md'} boxShadow={'lg'} bg={'white'} mb={2}>
      <HStack spacing={8}>
        <Image src={cart.salon.imageUrl} maxH="100px" maxW="180" rounded={10}/>
        <VStack spacing={0}>
          <Heading fontSize={'xl'}>{cart.salon.salonName}</Heading>
          <Text>{cart.salon.location}</Text>
        </VStack>
      </HStack>
      <Divider color={'lightGrey'} mt={4}/>
      <Flex direction={'column'} p={4}>
        <VStack align={'start'}>
            {/* we may use selectedServiceList or get values from redux sotre instead of SelectedServiceDummyList */}
          {selectedServiceList.map((item,index) => {
            return (
              <HStack key={index} justify="space-between" width="100%">
                <Text>{item.name}</Text> 
                <Text>Rs.{item.price}</Text>
              </HStack>
            )
          })}
          <Divider color={'lightGrey'} mt={4}/>
          <HStack justify="space-between" width="100%">
            <Text fontWeight={600}>Total</Text> 
            <Text fontWeight={600}>Rs.{totalPrice}</Text>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default TotalCostAndDetails;
