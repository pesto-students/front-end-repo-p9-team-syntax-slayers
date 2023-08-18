import React,{useEffect} from 'react'
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
  import { SalonService } from "../../components/CrudServices/CrudServices";
  import { tableDummyData } from './Helper'

 interface DashboardTableProps{
  salonId:string | undefined;
  servicesData: SalonService[] | null;
 } 

const DashboardTable:React.FC<DashboardTableProps> = ({servicesData,salonId}) => {

  useEffect(() => {
    if (servicesData) {
       console.log(servicesData)
    }
}, [servicesData]);
  return <>
  
  <TableContainer w={'80%'} boxShadow={"md"} mt={10}>
  <Table variant='striped'>
    <TableCaption>Salon Service and staff Details</TableCaption>
    <Thead>
      <Tr>
        <Th fontSize={15}>Service</Th>
        <Th fontSize={15}>Price</Th>
        <Th fontSize={15}>Time Period</Th>
        <Th fontSize={15}>Featured</Th>
      </Tr>
    </Thead>
    <Tbody>
      {servicesData?.map((item,index)=>{
       return       <Tr key={index}>
       <Td>{item?.name}</Td>
       <Td>Rs. {item.price}/-</Td>
       <Td>{item.duration} min</Td>
       <Td>{item.featured?'Yes':'No'}</Td>
     </Tr> 
      })}

    </Tbody>
  </Table>
</TableContainer>
  
  </>
}

export default DashboardTable
