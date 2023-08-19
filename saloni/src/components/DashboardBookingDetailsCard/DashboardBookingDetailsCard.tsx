import { Flex, Text, Button , HStack} from '@chakra-ui/react'
import React from 'react'
import {Service} from "../../pages/dashboardServices/DashboardServices"

interface DashboardBookingDetailsCardProps{
    
  customerName : string
  time:string
  service?:Service[]
  bookingId:string
  status:boolean
}

const DashboardBookingDetailsCard:React.FC<DashboardBookingDetailsCardProps> = (props) => { 
  
  const {customerName, time, service, bookingId, status} = props

  const handleCancel = ()=> {
    console.log('handle cancel')
  }

  return <>
    <Flex direction={{base:"row",sm:'column'}} wrap={{base:'wrap',sm:"nowrap"}} border={'1px'} rounded={10} p={5} m={4} w={{base:"340px", sm:"330px"}} h={{base:"190px",sm:"215px"}}>
      <Text mr={1}> Customer Name : {customerName}</Text>
      <Text mr={1}>Time : {time}</Text>
   
      {Array.isArray(service) && service.map((item,index)=>{
       return  <Text key={index} mr={1}>Service : {item.name}</Text> 
      })}
      <HStack> <Text mr={1}>BookingId :</Text> <Text color={'lightgray'} fontSize={9} > {bookingId}</Text></HStack>
      <HStack><Text>Payment Status : </Text><Text color={status?'green':'red'}>{status?'Confirmed':'Not Confirmed'}</Text></HStack> 
      <Button variant={'outline'} color={'accent.500'} colorScheme={'accent.500'} mt={4} onClick={handleCancel}>Cancel Booking</Button>
    </Flex>
  </>
}

export default DashboardBookingDetailsCard
