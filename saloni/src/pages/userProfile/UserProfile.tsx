import { Button, Flex, Heading, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import BookingCard from "../../components/BookingsCard/BookingCard";
//we are importing this for only dummy data..
import { dummyData } from "../../components/BookingsCard/Helper";
import { useAppSelector } from "../../redux/hooks";
const UserProfile = () => {
  const [activeButton, setActiveButton] = useState("");
  const user  = useAppSelector(state=>state.user)

  const handleActiveButton = (id: string) => {
    console.log("clicked", dummyData);
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
    })
    .catch((err)=>{
      console.log(err)
    })

    const apiEndpoint2 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_MY_FAVOURITES}${user.userId}`
    axios.get(apiEndpoint2,{headers})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[user.userId])
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
          <Heading fontSize={30} m={5}>
            Upcoming Bookings
          </Heading>
          {/* we will real data which will be fetched from API this dummyData is just a dummy */}
          {dummyData.map((item, index) => {
            return (
              <BookingCard
                key={index}
                orderId={item.orderId}
                salonName={item.salonName}
                city={item.city}
                salonImageUrl={item.salonImageUrl}
                bookingDate={item.bookingDate}
                bookingTime={item.bookingTime}
                pricePaid={item.pricePaid}
                services={item.services}
              />
            );
          })}
        </Box>
      </Flex>
    </>
  );
};

export default UserProfile;
