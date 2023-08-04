import { HStack, Flex, Heading,useBreakpointValue, Box, Divider, Button } from "@chakra-ui/react";
import SelectedServiceCard from "../../components/SelectedServiceCard/SelectedServiceCard";
import TotalCostAndDetails from "../../components/TotalCostAndDetails/TotalCostAndDetails";
import DateSlots from "../../components/DateSlots/DateSlots";
import React, { useState } from "react";
import { SelectedServiceDummyList } from "../../components/SelectedServiceCard/Helper";

const FinalSelection = () => {
  
  const view = useBreakpointValue({ base: "360px", sm: "400px" })

  const [selectedServiceList, setSelectServiceList] = useState([]);

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
          {/* we may use selectedServiceList or get values from redux sotre instead of SelectedServiceDummyList */}
          {SelectedServiceDummyList.map((item, index) => {
            return <SelectedServiceCard key={index} serviceName={item.serviceName} duration={item.duration} price={item.price} gender={item.gender} />;
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
