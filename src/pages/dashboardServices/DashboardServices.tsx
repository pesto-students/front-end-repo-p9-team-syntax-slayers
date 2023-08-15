import { Heading, Flex, Button, Box, Text, HStack } from "@chakra-ui/react";
import CrudServices from "../../components/CrudServices/CrudServices";
import React, { useState } from "react";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import DashboardBookingDetailsCard from "../../components/DashboardBookingDetailsCard/DashboardBookingDetailsCard";
import { dummyData } from "../../components/DashboardBookingDetailsCard/Helper";
import TimeSlots from "../../components/TimeSlots/TimeSlots";

enum ServiceAction {
  SERVICES = "services",
  BOOKINGS = "bookings",
}

const dashboardServices = () => {
  const [activeButton, setActiveButton] = useState(
    ServiceAction.SERVICES.toString()
  );

  const handleActiveButtons = (item: string) => {
    console.log(item);
    setActiveButton(item);
  };
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
              activeButton == ServiceAction.SERVICES ? "accent.500" : "white"
            }
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
            onClick={() => handleActiveButtons(ServiceAction.BOOKINGS)}
          >
            Bookings
          </Button>
        </Flex>
        {ServiceAction.SERVICES == activeButton && (
          <>
            <CrudServices salonId="1" />
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
                <TimeSlots dateSeleted="3-aug-2023" salonId="11111" />
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
