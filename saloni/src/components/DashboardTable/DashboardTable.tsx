import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import { tableDummyData } from './Helper'

 interface DashboardTableProps{
  salonId:string
 } 

const DashboardTable:React.FC<DashboardTableProps> = () => {
  return <>
  
  <TableContainer w={'80%'} boxShadow={"md"} mt={10}>
  <Table variant='striped'>
    <TableCaption>Salon Service and staff Details</TableCaption>
    <Thead>
      <Tr>
        <Th fontSize={15}>Service</Th>
        <Th fontSize={15}>Price</Th>
        <Th fontSize={15}>Time Period</Th>
        <Th fontSize={15}>Gender</Th>
        <Th fontSize={15} isNumeric>Staff</Th>
      </Tr>
    </Thead>
    <Tbody>
      {tableDummyData.map((item,index)=>{
       return       <Tr key={index}>
       <Td>{item.service}</Td>
       <Td>{item.price}</Td>
       <Td>{item.timePeriod}</Td>
       <Td>{item.gender}</Td>
       <Td isNumeric>{item.staff}</Td>
     </Tr> 
      })}

    </Tbody>
  </Table>
</TableContainer>
  
  </>
}

export default DashboardTable
