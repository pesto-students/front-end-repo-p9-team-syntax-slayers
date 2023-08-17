import { Heading, Flex, Button,useToast, Box, Text, HStack,Image, VStack, FormControl, FormLabel,Input } from "@chakra-ui/react";
import CrudServices from "../../components/CrudServices/CrudServices";
import React, { useEffect, useState } from "react";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import DashboardBookingDetailsCard from "../../components/DashboardBookingDetailsCard/DashboardBookingDetailsCard";
import { dummyData } from "../../components/DashboardBookingDetailsCard/Helper";
import TimeSlots from "../../components/TimeSlots/TimeSlots";
import CrudSalon from "../../components/CrudSalon/CrudSalon";
import {SalonDetails} from "../../components/CrudSalon/CrudSalon"
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";

enum ServiceAction {
  SERVICES = "services",
  BOOKINGS = "bookings",
  SALONDETAILS = "salonDetails"
}

const dashboardServices = () => {
  const [activeButton, setActiveButton] = useState(
    ServiceAction.SERVICES.toString()
  );
  const [salonDetails, setSalonDetails] = useState<SalonDetails | null>(null)
  const user = useAppSelector(state=>state.user)

  const handleActiveButtons = (item: string) => {
    console.log(item);
    setActiveButton(item);
  };

  useEffect(()=>{
    const headers = {
      'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
      'Content-Type': 'application/json',
  };
  const apiEndpoint=`${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_GET_SALON_DETAILS_ADMIN}${user.userId}`
  console.log(apiEndpoint)
  axios.get(apiEndpoint,{headers})
  .then((res)=>{
      console.log(res.data.data[0])
      setSalonDetails(res.data.data[0])
  })
  .catch((err)=>{
     console.log(err)
  })
  },[user])
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Heading fontSize={70}> Dashboard</Heading>
        <Flex
          w={{ base: "350px", sm: "500px" }}
          alignItems={"center"}
          justifyContent={"center"}
        > 
           <Button
            w={"full"}
            bg={"primary"}
            borderRightRadius={0}
            color={
              activeButton == ServiceAction.SALONDETAILS ? "accent.500" : "white"
            }
            fontSize={{base:'16',sm:'18'}}
            onClick={() => handleActiveButtons(ServiceAction.SALONDETAILS)}
          >
            Salon Details
          </Button>
          <Button
            w={"full"}
            bg={"primary"}
            borderRadius={0}
            color={
              activeButton == ServiceAction.SERVICES ? "accent.500" : "white"
            }
            m={0.3}
            fontSize={{base:'16',sm:'18'}}
            onClick={() => handleActiveButtons(ServiceAction.SERVICES)}
          >
            Service
          </Button>
          <Button
            w={"full"}
            bg={"primary"}
            borderLeftRadius={0}
            color={
              activeButton == ServiceAction.BOOKINGS ? "accent.500" : "white"
            }
            fontSize={{base:'16',sm:'18'}}
            onClick={() => handleActiveButtons(ServiceAction.BOOKINGS)}
          >
            Bookings
          </Button>
        </Flex>
        {ServiceAction.SALONDETAILS === activeButton && (
            <>
               <CrudSalon userId="1" salonDetails={salonDetails} />
            </>
    )}
        {ServiceAction.SERVICES == activeButton && (
          <>
            <CrudServices salonId={salonDetails?.id} />
            <DashboardTable salonId="1"  />
          </>
        )}

        {ServiceAction.BOOKINGS == activeButton && (
          <>
            <Flex
              direction={{ base: "column"}}
              wrap={"wrap"}
              w={{ base: "90%", sm: "85%" }}
              bg={"primary"}
              justifyContent="space-around"
              p={{ base: 3, sm: 5 }}
              rounded={10}
              mt={5}
            >
              <Flex
                direction={{base:"column",sm:"row"}}
                w={{ base: "100%", sm: "100%" }}
                mb={{ base: 3, sm: 0 }}
                justifyContent={{base:"center",sm:'space-between'}}
                alignItems={{base:"center", sm:""}}
              >  
                {/* values are hardcoded */}
               <HStack ><Text color={"white"}fontSize={'lg'} >Total Bookings : </Text><Text color={'accent.500'}>8</Text> </HStack>
               <HStack ><Text color={"white"}fontSize={'lg'} >Slots Available : </Text><Text color={'accent.500'}>2</Text> </HStack>
               <HStack ><Text color={"white"}fontSize={'lg'} >TTotal Slots : </Text><Text color={'accent.500'}>10</Text> </HStack>
              </Flex>
              <Box w={{ base: "100%", sm: "100%" }}>
                <TimeSlots totalServiceTime={10} dateSeleted={null} salonId="11111" />
              </Box>
            </Flex>

            <Flex wrap={"wrap"} justifyContent={"center"}>
              {dummyData.map((item, index) => {
                return (
                  <DashboardBookingDetailsCard
                    key={index}
                    customerName={item.customerName}
                    time={item.time}
                    service={item.service}
                    gender={item.gender}
                    status={item.status}
                  />
                );
              })}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default dashboardServices;
