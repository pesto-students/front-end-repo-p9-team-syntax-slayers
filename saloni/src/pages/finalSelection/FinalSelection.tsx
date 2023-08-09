import { HStack,Text, Flex, Heading,useBreakpointValue, Box, Divider, Button } from "@chakra-ui/react";
import SelectedServiceCard ,{SelectedServiceCardProps} from "../../components/SelectedServiceCard/SelectedServiceCard";
import TotalCostAndDetails from "../../components/TotalCostAndDetails/TotalCostAndDetails";
import DateSlots from "../../components/DateSlots/DateSlots";
import React, { useEffect, useState } from "react";
import { SelectedServiceDummyList } from "../../components/SelectedServiceCard/Helper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

const FinalSelection = () => {
  
  const view = useBreakpointValue({ base: "360px", sm: "400px" })
  const navigate = useNavigate()

  const [selectedServiceList, setSelectServiceList] = useState<SelectedServiceCardProps[]>([]);
  const cart = useAppSelector(state=>state.cart)
  const dispatch = useAppDispatch();

  useEffect(()=>{
      console.log(cart.cartList)
      setSelectServiceList(cart.cartList)
    
  },[cart.cartList])
  
  const handleGoBack=()=> {
     navigate('/salonDetails')
  }
  return (
    <> 
    <Box padding={{base:"5",sm:"10"}} pb={{sm:"0"}} overflowY={'auto'}>
     <Heading> Selected Services </Heading>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        padding={{ base: "0px", sm: "30px" }}
        pb={{sm:"0"}}
      > 
     
        <Flex direction={"column"} mt={4}>
          {selectedServiceList.length==0 && <Flex direction={'column'} textAlign={'center'}> <Text fontSize={{base:"",sm:"30px"}}> Your cart is empty</Text> <Button mt={2} variant={'outline'} color={'accent.500'} onClick={handleGoBack} colorScheme={'accent.500'} >Go Back</Button> </Flex>}
          {selectedServiceList.map((item, index) => {
            return <SelectedServiceCard key={index} id={item.id} name={item.name} duration={item.duration} price={item.price} description={item.description}/>;
          })}
        </Flex>
        {view=="360px" && <DateSlots salonId="1"/> }
        <TotalCostAndDetails />
      </Flex>
      </Box>
      <Divider/>

      <Box padding={{base:"5",sm:"10"}} pb={{sm:"0"}}>
      <HStack>
       {view=="400px" &&   <DateSlots salonId={'1'}/>} 
      
       <Button width={{base:'100%', md:"50%",sm:"10%"}} h={{base:"40px",sm:"70px"}} variant={useBreakpointValue({ base: "solid", sm: "outline" })} bg={{ base: "accent.500", sm: "white" }} color={{ base: "white", sm: "accent.500" }} colorScheme={useBreakpointValue({ base: "accent.500", sm: "white" })} mb={{base:"5",sm:"10"}}>Book Now</Button>
       </HStack>
      </Box>
    

    </>
  );
};

export default FinalSelection;
