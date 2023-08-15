import { Flex, Text, Button , HStack} from '@chakra-ui/react'
import React from 'react'

interface DashboardBookingDetailsCardProps{
    
  customerName : string
  time:string
  service:string
  gender:string
  status:boolean
}

const DashboardBookingDetailsCard:React.FC<DashboardBookingDetailsCardProps> = (props) => { 
  
  const {customerName, time, service, gender, status} = props

  const handleCancel = ()=> {
    console.log('handle cancel')
  }

  return <>
    <Flex direction={{base:"row",sm:'column'}} wrap={{base:'wrap',sm:"nowrap"}} border={'1px'} rounded={10} p={5} m={4} w={{base:"340px", sm:"280px"}} h={{base:"160px",sm:"215px"}}>
      <Text mr={1}> Customer Name : {customerName}</Text>
      <Text mr={1}>Time : {time}</Text>
      <Text mr={1}>Service : {service}</Text>
      <Text mr={1}>Gender : {gender}</Text>
      <HStack><Text>Status : </Text><Text color={status?'green':'red'}>{status?'Confirmed':'Not Confirmed'}</Text></HStack> 
      <Button variant={'outline'} color={'accent.500'} colorScheme={'accent.500'} mt={4} onClick={handleCancel}>Cancel Booking</Button>
    </Flex>
  </>
}

export default DashboardBookingDetailsCard
