import { Heading, Box, VStack , Text, Flex} from '@chakra-ui/react'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import TimeSlots from '../TimeSlots/TimeSlots';
import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";
import {dummyData} from "./helper"

interface DateSlotsProps{
  salonId:string
  totalTime:number
  onDateSlotSelected?: (selectedDateSlots: DateAndTime | null) => void;
}

export interface Slots{
  avaliableForBooking:boolean
  slot:string
  slotId:string
}

export interface DateAndTime{
  day:string,
  month:string,
  slots:Slots[]
  week:string
}

const DateSlots:React.FC<DateSlotsProps> = ({totalTime,onDateSlotSelected}) => {
    
    type DateTypeObject = {
        date: string;
        day: string;
      };
      
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const [dates,setDates] = useState<DateAndTime[] | []>([]);
    const [finalDateAndTime,setFinalDateAndTime] = useState<DateAndTime | null>(null)
    const [selectedBox, setSelectedBox] = useState<number | null>(null); // New state to track the selected box
    const [selectedDate, setSelectedDate] = useState<DateAndTime | null>(null);
    const user = useAppSelector(state=>state.user)
    const cart = useAppSelector(state=>state.cart)
    const [totalServiceTime,setTotalServiceTime] = useState(0)

      useEffect(()=>{
         setTotalServiceTime(totalTime)
      },[totalTime])
     
      useEffect(()=>{
         
        const headers = {
          'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
          'Content-Type': 'application/json',
        };

        const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_TIME_SLOTS}${cart.salonId}`
        axios.get(apiEndpoint,{headers})
        .then((res)=>{
          console.log(res)
          setDates(res.data.data)
        //  setDates([dummyData])
        })
        .catch((err)=>{
          console.log(err)
        })
       console.log(totalTime)
      },[])

    const handleDate = (item:DateAndTime, index:number)=>{  // Add index parameter to function
      setSelectedBox(index); // Set the selected box
       setSelectedDate(item)
    }
  
    
    const handleSelectedSlots = (selectedSlots: number[]) => {
     console.log(selectedSlots)
     if(selectedDate) {
      const updatedDate = {...selectedDate};
      updatedDate.slots = selectedDate.slots.filter((item,index)=>selectedSlots.includes(index));
     // setSelectedDate(updatedDate); // Set the updated date
      setFinalDateAndTime(updatedDate); // Updating the finalDateAndTime
   }
        
  };
  useEffect(() => {
    if (onDateSlotSelected && finalDateAndTime) {
        onDateSlotSelected(finalDateAndTime);
    }
}, [finalDateAndTime]);

  return (
    <>
    <Box padding={{base:"10px",sm:"20px",md:"30px",lg:"40px"}} overflowY={'auto'}>
      <Heading>Select Time</Heading>
      <Box mt={5}>
        <Flex justifyContent={"flex-start"} whiteSpace={'normal'} overflowX="scroll" flexWrap="nowrap" padding={3} >
          {dates.map((item:any,index)=>{  
            return <Box key={index}> 
              <VStack spacing={3} padding={2} m={1} rounded={7} border={selectedBox === index ? "1px" : "0px"} w="80px" h="80px" borderColor={'gray.300'} _hover={{ borderColor:"grey.500", bg:"lightGrey", opacity:"0.8" }} onClick={()=>handleDate(item,index)}>
                <Text fontSize={'sm'}>{item.day}</Text>
                <Text fontSize={'sm'}>{item.month.toString()}</Text>
              </VStack>
            </Box>
          })}
        </Flex>
      </Box>
      <TimeSlots onSlotsSelected={handleSelectedSlots} dateSeleted={selectedDate} totalServiceTime={totalTime} salonId={"1"}/>
    </Box> 

          </>
  )
}

export default DateSlots
