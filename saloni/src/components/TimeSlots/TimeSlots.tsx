import { Box, Text, Flex, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { DateAndTime, Slots } from '../DateSlots/DateSlots';

interface TimeSlotsProps {
  dateSeleted: DateAndTime | null;
  salonId: string;
  totalServiceTime: number;
}

const TimeSlots: React.FC<TimeSlotsProps> = (props) => {
  const SLOT_DURATION = 30;  // assuming to be 30 minutes
  const { dateSeleted, totalServiceTime } = props;
  const [selectedStartIndex, setSelectedStartIndex] = useState<number | null>(null);
  const [selectedLastIndex, setSelectedLastIndex] = useState<number | null>(null);

  const [slots, setSlots] = useState<Slots[] | []>([]);

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
        setSelectedStartIndex(index);
        setSelectedLastIndex(index + slotsRequired - 1);
      } else {
        alert('Not enough subsequent slots available for this service.');
      }
  }

  useEffect(() => {
    if (selectedStartIndex !== null && selectedLastIndex !== null) {
     
        const startSlotValue = slots[selectedStartIndex];
      const lastSlotValue = slots[selectedLastIndex];

      console.log("Start Slot Value:", startSlotValue);
      console.log("Last Slot Value:", lastSlotValue);

      
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
    </Flex>
  );
}

export default TimeSlots;
