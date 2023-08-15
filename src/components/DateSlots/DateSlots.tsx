import { Heading, Box, VStack , Text, Flex} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TimeSlots from '../TimeSlots/TimeSlots';

interface DateSlotsProps{
  salonId:string
}

const DateSlots:React.FC<DateSlotsProps> = () => {
    
    type DateTypeObject = {
        date: string;
        day: string;
      };
      
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const [dates,setDates] = useState<DateTypeObject[]>([]);
    const [selectedBox, setSelectedBox] = useState<number | null>(null); // New state to track the selected box
    const [selectedDate, setSelectedDate] = useState<string>('');

     //we use this useEffect hook to fetch upcoming 7 days and dates
    useEffect(() => {
        const newDates = [];
        for (let i = 0; i <= 7; i++) {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + i);
          const dayOfWeek = daysOfWeek[futureDate.getDay()];
          newDates.push({ date: futureDate.toDateString().slice(4,10), day: dayOfWeek });
        }
        setDates(newDates);
      }, []);


    const handleDate = (item:DateTypeObject, index:number)=>{  // Add index parameter to function
      setSelectedBox(index); // Set the selected box
       setSelectedDate(item.date)
      console.log(item)
    }

  return (
    <>
    <Box padding={{base:"10px",sm:"20px",md:"30px",lg:"40px"}} overflowY={'auto'}>
      <Heading>Select Time</Heading>
      <Box mt={5}>
        <Flex justifyContent={"flex-start"} whiteSpace={'normal'} overflowX="scroll" flexWrap="nowrap" padding={3} >
          {dates.map((item,index)=>{  
            return <Box key={index}> 
              <VStack spacing={3} padding={2} m={1} rounded={7} border={selectedBox === index ? "1px" : "0px"} w="80px" h="80px" borderColor={'gray.300'} _hover={{ borderColor:"grey.500", bg:"lightGrey", opacity:"0.8" }} onClick={()=>handleDate(item,index)}>
                <Text fontSize={'sm'}>{item.day}</Text>
                <Text fontSize={'sm'}>{item.date.toString()}</Text>
              </VStack>
            </Box>
          })}
        </Flex>
      </Box>
      <TimeSlots dateSeleted={selectedDate} salonId={"1"}/>
    </Box> 

          </>
  )
}

export default DateSlots
