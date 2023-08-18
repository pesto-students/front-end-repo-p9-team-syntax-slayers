import { HStack,Text, Flex, Heading,useBreakpointValue, Box, Divider, Button } from "@chakra-ui/react";
import SelectedServiceCard ,{SelectedServiceCardProps} from "../../components/SelectedServiceCard/SelectedServiceCard";
import TotalCostAndDetails from "../../components/TotalCostAndDetails/TotalCostAndDetails";
import DateSlots from "../../components/DateSlots/DateSlots";
import React, { useEffect, useState } from "react";
import { SelectedServiceDummyList } from "../../components/SelectedServiceCard/Helper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateAndTime } from "../../components/DateSlots/DateSlots";
const FinalSelection = () => {
  
  const view = useBreakpointValue({ base: "360px", sm: "400px" })
  const navigate = useNavigate()

  const [selectedServiceList, setSelectServiceList] = useState<SelectedServiceCardProps[]>([]);
  const cart = useAppSelector(state=>state.cart)
  const user = useAppSelector(state=>state.user)
  const dispatch = useAppDispatch();
  const [totalTime, setTotalTime] = useState(0)
  const [finalSlots, setFinalSlots] = useState<DateAndTime | null>()

  useEffect(()=>{
      console.log(cart.cartList)
      setSelectServiceList(cart.cartList)
      const sum =cart.cartList.reduce((sum,currentItem)=>{
        return sum + currentItem.duration
      },0)
      setTotalTime(sum)
  },[cart.cartList])
  
  const handleGoBack=()=> {
     navigate(`/`)
  }

  const handleSelectedDateSlots = (selectedDateSlots: DateAndTime | null) => {
    // Handle the data from child here
    console.log("Received Date and Time slots from child:", selectedDateSlots);
    setFinalSlots(selectedDateSlots)
    // Use the data as needed
};


  const checkoutHandler = async()=>{
     
    //This API is used to create OrderId
    const orderData = await axios.post(`${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_RAZORPAY_CHECKOUT}`,{
      amount:400
    })
    const payload = {
      "userId": user.userId,
      "salonId": cart.salonId,
      "serviceIds": cart.cartList.map(service => service.id),
      "orderId": orderData,
      "timeAndDateSlots": finalSlots
  }
  console.log(payload)
   const {data} = orderData
   console.log(`${process.env.REACT_APP_BASEURL as string}${process.env.REACT_APP_RAZORPAY_VERIFICATION as string}`)
    const options = {
            key: `${process.env.REACT_APP_RAZORPAY_API_KEY as string}`,
            amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Saloni",
            description: "Test Transaction",
            image: "/logo-black.png",
            order_id: data.data.id, 
            callback_url: `${process.env.REACT_APP_BASEURL as string}${process.env.REACT_APP_RAZORPAY_VERIFICATION as string}`,
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#242C2F"
            }
      };
      console.log('Order Data from BE:', data.data);
      console.log('Razorpay Options:', options);
      
            const rzp1 = new (window as any).Razorpay(options);     
            rzp1.open();

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
            return <SelectedServiceCard key={index} salon_id={item.salon_id} id={item.id} name={item.name} duration={item.duration} price={item.price} description={item.description}/>;
          })}
        </Flex>
        {view=="360px" && <DateSlots onDateSlotSelected={handleSelectedDateSlots}  salonId="1"  totalTime={totalTime}/> }
        <TotalCostAndDetails />
      </Flex>
      </Box>
      <Divider/>

      <Box padding={{base:"5",sm:"10"}} pb={{sm:"0"}}>
      <HStack>
       {view=="400px" &&   <DateSlots  onDateSlotSelected={handleSelectedDateSlots} salonId={'1'} totalTime={totalTime} />} 
      
       <Button onClick={checkoutHandler} width={{base:'100%', md:"50%",sm:"10%"}} h={{base:"40px",sm:"70px"}} variant={useBreakpointValue({ base: "solid", sm: "outline" })} bg={{ base: "accent.500", sm: "white" }} color={{ base: "white", sm: "accent.500" }} colorScheme={useBreakpointValue({ base: "accent.500", sm: "white" })} mb={{base:"5",sm:"10"}}>Book Now</Button>
       </HStack>
      </Box>
    

    </>
  );
};

export default FinalSelection;
