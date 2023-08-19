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
import { SalonService } from "../../components/CrudServices/CrudServices";
import { DateAndTime , Slots} from "../../components/DateSlots/DateSlots";

enum ServiceAction {
  SERVICES = "services",
  BOOKINGS = "bookings",
  SALONDETAILS = "salonDetails"
}
interface Booking {
  bookingId: string;
  userId: string;
  customerName: string;
  StartTime: string;
  paymentConfirmed: boolean;
  services: Service[];
}

export interface Service {
  name: string;
}

const dashboardServices = () => {
  const [activeButton, setActiveButton] = useState(
    ServiceAction.SERVICES.toString()
  );
  const [salonDetails, setSalonDetails] = useState<SalonDetails | null>(null)
  const [servicesData, setServicesData] = useState<SalonService[] | null>(null);
  const [date,setDate]=useState<DateAndTime | null>(null)
  const [totalSlots, setTotalSlots] = useState(0)
  const [totalBookings, setTotalBookings] = useState(0)
  const [slotsAvailable, setSlotsAvailable] = useState(0)
  const [bookingList, setBookingList] = useState<Booking[]>()

  const user = useAppSelector(state=>state.user)

  const handleActiveButtons = (item: string) => {
    console.log(item);
    setActiveButton(item);
  };

  useEffect(()=>{
    const headers = {
      'Authorization': `Bearer ${user.token}`,  
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
   
  useEffect(()=>{
         
    const headers = {
      'Authorization': `Bearer ${user.token}`,  
      'Content-Type': 'application/json',
    };
    
    if(salonDetails?.id){
    const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_TIME_SLOTS}${salonDetails?.id}`
    axios.get(apiEndpoint,{headers})
    .then((res)=>{
      console.log(res.data.data[0])
      setDate(res.data.data[0])
    //  setDates([dummyData])
    })
    .catch((err)=>{
      console.log(err)
    })
     
    const apiEndpoint2 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SALONBOOKINGS_ADMIN}${salonDetails?.id}`
    axios.get(apiEndpoint2,{headers})
    .then((res)=>{
      console.log(res)
      setBookingList(res.data.data)

    })
    .catch((err)=>{
      console.log(err)
    })

  }
  },[salonDetails])

  useEffect(()=>{
     if(date){
      const totalSlots = date.slots.length
      const booking = date.slots.reduce((sum,item)=>!item.avaliableForBooking?sum+1:sum,0)
      setTotalSlots(totalSlots)
      setTotalBookings(booking)
      setSlotsAvailable(totalSlots-booking)

     }
  },[date])

  const handleAllSalonService = (allSalonServices: SalonService[] | null) => {
    setServicesData(allSalonServices);
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
            <CrudServices salonId={salonDetails?.id} sendBackServices={handleAllSalonService} />
            <DashboardTable salonId={salonDetails?.id}  servicesData={servicesData}/>
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
                justifyContent={{base:"center",sm:'space-around'}}
                alignItems={{base:"center", sm:""}}
              >  
                {/* values are hardcoded */}
               <HStack ><Text color={"white"}fontSize={'lg'} >Total Bookings : </Text><Text color={'accent.500'}>{totalBookings}</Text> </HStack>
               <HStack ><Text color={"white"}fontSize={'lg'} >Slots Available : </Text><Text color={'accent.500'}>{slotsAvailable}</Text> </HStack>
               <HStack ><Text color={"white"}fontSize={'lg'} >Total Slots : </Text><Text color={'accent.500'}>{totalSlots}</Text> </HStack>
              </Flex>
              <Box w={{ base: "100%", sm: "100%" }}>
                <TimeSlots totalServiceTime={0} dateSeleted={date} />
              </Box>
            </Flex>

            <Flex wrap={"wrap"} justifyContent={"center"}>
              {Array.isArray(bookingList) && bookingList.map((item, index) => {
                return (
                  <DashboardBookingDetailsCard
                    key={index}
                    customerName={item.customerName}
                    time={item.StartTime}
                    service={item.services}
                    bookingId={item.bookingId}
                    status={item.paymentConfirmed}
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
