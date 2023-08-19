import { Button, Flex, Heading, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import BookingCard from "../../components/BookingsCard/BookingCard";
//we are importing this for only dummy data..
import { dummyData } from "../../components/BookingsCard/Helper";
import { useAppSelector } from "../../redux/hooks";
import FavSalonDetails from "../../components/FavSalonCard/FavSalonCard"

interface OrderDetails {
  banner: string;
  bookedServices: BookedService[];
  orderID: string;
  salonAddress: string;
  salonName: string;
  startTime: string;
}

export interface BookedService {
  name: string;
  duration: number;
}


export interface MyFavSalonData {
  salonName: string;
  salonAddress: string;
  openFrom: string;
  openTill: string;
  currentlyInactive: number;
  banner: null | string;
  rating: number;
  ratingCount: number;
}
const UserProfile = () => {
  const [activeButton, setActiveButton] = useState("bookings");
  const user  = useAppSelector(state=>state.user)
  const [upcomingBookings, setUpcomingBookings] = useState<OrderDetails[]>()
  const [pastBookings, setPastBookings] = useState<OrderDetails[]>()
  const [favourites, setFavourites] = useState<MyFavSalonData[]>()

  const handleActiveButton = (id: string) => {
    setActiveButton(id);
    console.log(activeButton);
  };

  useEffect(()=>{
    
    const headers = {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json',
  };
    const apiEndpoint1 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_MY_BOOKINGS}${user.userId}`
    axios.get(apiEndpoint1,{headers})
    .then((res)=>{
      console.log(res)
      setUpcomingBookings(res.data.data[0].upcomingBookings)
      setPastBookings(res.data.data[0].pastBookings)
    })
    .catch((err)=>{
      console.log(err)
    })

    const apiEndpoint2 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_MY_FAVOURITES}${user.userId}`
    axios.get(apiEndpoint2,{headers})
    .then((res)=>{
      console.log(res)
      setFavourites(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[user.userId])
  console.log(upcomingBookings)
  return (
    <>
      <Flex
        w={"100%"}
        h={{ base: "auto", sm: "90px" }}
        bg={"primary"}
        p={{ base: 2, sm: 3 }}
        justifyContent={"space-around"}
        direction={{ base: "column", sm: "row" }}
        alignItems={"flex-start"}
        textAlign={"left"}
      >
        <Flex direction={"column"} mb={{ base: 5, sm: 0 }}>
          <Text color={"white"}>Name : {user.firstName}</Text>
          <Text color={"white"}>Email : {user.email}</Text>
          <Text color={"white"}>UserType : {user.userType==='user'?'Customer':'Partner'}</Text>

        </Flex>
        <Button
          w={{ base: "80%", sm: "10%" }}
          p={3}
          variant={"outline"}
          color={"accent.500"}
          colorScheme={"accent.500"}
          mt={{ base: 1, sm: 0 }}
        >
          Edit profile
        </Button>
      </Flex>

      <Flex
        m={{ base: "0px", sm: "30px" }}
        w={{base:"100%",sm:"90%"}}
        h={{base:800,sm:500}}
        overflowY={"auto"}
        justifyContent={'center'}
        direction={{ base: "column", sm: "row" }}
      >
        <Flex
          w={{ base: "100%", sm: "20%" }}
          bg={"primary"}
          direction={{ base: "row", sm: "column" }}
          borderLeftRadius={{ sm: "10" }}
          justifyContent={"flex-start"}
          alignItems={"flex-end"}
        >
          <Button
            leftIcon={<AiOutlineShoppingCart />}
            mt={10}
            borderRightRadius={{ sm: "0px" }}
            borderBottomEndRadius={0}
            borderBottomLeftRadius={{ base: "0", sm: "3" }}
            w={"80%"}
            bg={activeButton == "bookings" ? "white" : "primary"}
            onClick={() => handleActiveButton("bookings")}
            color={activeButton == "bookings" ? "primary" : "white"}
          >
            Bookings
          </Button>
          <Button
            leftIcon={<AiOutlineHeart />}
            mt={10}
            borderRightRadius={{ sm: "0px" }}
            borderBottomEndRadius={0}
            borderBottomLeftRadius={{ base: "0", sm: "3" }}
            w={"80%"}
            bg={activeButton == "favourites" ? "white" : "primary"}
            onClick={() => handleActiveButton("favourites")}
            color={activeButton == "favourites" ? "primary" : "white"}
          >
            Favourites
          </Button>
        </Flex>

       {activeButton == "bookings" && <Box
          w={{ base: "100%", sm: "70%" }}
          bg={"white"}
          borderTop={{ sm: "1px" }}
          borderRight={"1px"}
          borderBottom={"1px"}
          borderRightRadius={10}
          overflowY={"auto"}
          maxHeight={{base:"100vh",sm:"80vh"}}
        >
          <Heading fontSize={30} m={5}>
            Upcoming Bookings
          </Heading>
          {/* we will real data which will be fetched from API this dummyData is just a dummy */}
        {upcomingBookings?.length!==0? upcomingBookings?.map((item, index) => {
            return (
              <BookingCard
                key={index}
                orderId={item.orderID}
                salonName={item.salonName}
                city={item.salonAddress}
                salonImageUrl={item.banner}
                bookingTime={item.startTime}
                services={item.bookedServices}
              />
            );
          }): <Flex justifyContent={'flex-start'} p={7}><Text fontSize={'20'}>No List Found</Text></Flex> }
        <Heading fontSize={30} m={5}>
            Past Bookings
          </Heading>
          {/* we will real data which will be fetched from API this dummyData is just a dummy */}
          {pastBookings?.length!==0? pastBookings?.map((item, index) => {
            return (
              <BookingCard
                key={index}
                orderId={item.orderID}
                salonName={item.salonName}
                city={item.salonAddress}
                salonImageUrl={item.banner}
                bookingTime={item.startTime}
                services={item.bookedServices}
              />
            );
          }): <Flex justifyContent={'flex-start'} p={7}><Text fontSize={'20'}>No List Found</Text></Flex> }
        </Box>
       }
       {activeButton == "favourites" && <>
       <Box
          w={{ base: "100%", sm: "70%" }}
          bg={"white"}
          borderTop={{ sm: "1px" }}
          borderRight={"1px"}
          borderBottom={"1px"}
          borderRightRadius={10}
          overflowY={"auto"}
          maxHeight={"80vh"}
        >
          
          {Array.isArray(favourites) && favourites.length !== 0 ? favourites?.map((item, index) => {
            return (
              <FavSalonDetails
                key={index}
                salonName={item.salonName}
                salonAddress={item.salonAddress}
                banner={item.banner || ''}
                openFrom={item.openFrom}
              />
            );
          }): <Flex justifyContent={'flex-start'} p={7}><Text fontSize={'20'}>No List Found</Text></Flex> }

        </Box>
          
       </>}
      </Flex>
    </>
  );
};

export default UserProfile;
