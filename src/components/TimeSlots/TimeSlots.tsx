import { Box , Text, Flex, Button} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

interface TimeSlotsProps{
    dateSeleted:string
    salonId:string
}

const TimeSlots:React.FC<TimeSlotsProps> = (props) => {
     
    const {dateSeleted} = props

    const [slots, setSlots] = useState<string[]>([]);

    useEffect(()=>{

        const newSlots = [];
        for (let i = 10; i < 22; i++) {
            const date = new Date();
            date.setHours(i);
            date.setMinutes(0);
            newSlots.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' }));
            date.setMinutes(30);
            newSlots.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' }));
        }
        setSlots(newSlots);
    },[])


    const handleTime = (item:string)=>{
        console.log(item)
      }
  
  return <>

        <Flex justifyContent={{base:"center",sm:"flex-start"}} whiteSpace={'normal'} flexWrap="wrap" padding={3}>
            {slots.map((time, index) => (
              <Button key={ index} variant={'outline'} bg={'white'} h={{base:"40px",sm:"80px"}} w={{base:"70px",sm:"90px"}} m={1} fontSize={{base:"xs",sm:'sm'}} > {time} </Button>
            ))}
          </Flex>
   
   </>
}

export default TimeSlots

