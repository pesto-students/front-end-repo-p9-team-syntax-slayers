import { Box, Text, Flex, Button,useBreakpointValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { DateAndTime, Slots } from '../DateSlots/DateSlots';

interface TimeSlotsProps {
  dateSeleted: DateAndTime | null;
  salonId: string;
  totalServiceTime: number;
  onSlotsSelected?: (selectedSlots: number[]) => void; 
}

const TimeSlots: React.FC<TimeSlotsProps> = (props) => {
  const SLOT_DURATION = 30;  // assuming to be 30 minutes
  const { dateSeleted, totalServiceTime } = props;
  const [selectedStartIndex, setSelectedStartIndex] = useState<number | null>(null);
  const [selectedLastIndex, setSelectedLastIndex] = useState<number | null>(null);
  const [noOfSlotsSelected,setNoOfSlotsSelected] = useState<number[] | []>([])
  const [slots, setSlots] = useState<Slots[] | []>([]);
  const view = useBreakpointValue({ base: "360px", sm: "400px" })

  useEffect(() => {
    if (dateSeleted) {
      setSlots(dateSeleted.slots);
    } else {
      setSlots([]);
    }
  }, [dateSeleted]);
  const slotsRequired = totalServiceTime / SLOT_DURATION;

  const canBookTime = (startIndex: number): boolean => {
   // we are check if there are enough slots after the current slot
    if (startIndex + slotsRequired > slots.length) return false;

    // we are checking if all required slots are available
    for (let i = 0; i < slotsRequired; i++) {
      if (!slots[startIndex + i].avaliableForBooking) return false;
    }

    return true;
  }; 


   
  const handleBookingTime = (index:number)=> {
    if (canBookTime(index)) {
      let indexArray=[]
        for(let i=index;i<index+slotsRequired;i++){
             indexArray.push(i)
             setNoOfSlotsSelected(indexArray)
        }
        setSelectedStartIndex(index);
        setSelectedLastIndex(index + slotsRequired - 1);
      } else {
        alert('Not enough subsequent slots available for this service.');
      }
  }

  useEffect(() => {
    if (selectedStartIndex !== null && selectedLastIndex !== null) {
   
      noOfSlotsSelected.forEach((i)=>console.log(slots[i]))
      if (props.onSlotsSelected) { 
        props.onSlotsSelected(noOfSlotsSelected);
    }
      
    }
  }, [selectedStartIndex, selectedLastIndex]);


  return (
    <Flex justifyContent={{base:"center",sm:"flex-start"}} whiteSpace={'normal'} flexWrap="wrap" padding={3}>
      {slots.map((time, index) => (
        <Button 
          key={index}
          variant={time.avaliableForBooking ? 'outline' : 'outline'} 
          isDisabled={!canBookTime(index)}
          bg={'white'}
          h={{base:"40px",sm:"80px"}}
          w={{base:"70px",sm:"90px"}}
          m={1}
          fontSize={{base:"xs",sm:'sm'}}
          onClick={()=>handleBookingTime(index)}
        > 
          
          {time.avaliableForBooking?time.slot:'Booked'}
        </Button>
      ))}
             {/* <Button width={{base:'100%', md:"50%",sm:"10%"}} h={{base:"40px",sm:"70px"}} variant={useBreakpointValue({ base: "solid", sm: "outline" })} bg={{ base: "accent.500", sm: "white" }} color={{ base: "white", sm: "accent.500" }} colorScheme={useBreakpointValue({ base: "accent.500", sm: "white" })} mb={{base:"5",sm:"10"}}>Book Now</Button> */}

    </Flex>
  );
}

export default TimeSlots;
