import { Heading, Box, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react'
import { GrSubtractCircle } from "react-icons/gr";
import React from 'react'

interface SelectedServiceCardProps{
  serviceName:string
  duration:string
  price:string
  gender:string

}
const SelectedServiceCard:React.FC<SelectedServiceCardProps> = (props) => {
    
  const {serviceName,duration,price,gender} = props 

  const handleRemove=()=>{
    console.log('removed')
  }

   return <>
       <Box margin={"10px"}>
        <Card
          key={""}
          size={"sm"}
          w={{base:"350px",sm:"480px"}}
          maxH={"100px"}
          variant={"outline" }
          borderRadius={"15px"}
          boxShadow={"xs" }
        >
          <CardBody pl={"20px"} pr={"40px"}>
            <HStack justifyContent={"space-between"} spacing={3}>
            {/* <GrAddCircle size={"30px"} style={{ opacity: 0.8 }} /> */}
            <GrSubtractCircle size={"30px"} style={{ opacity: 0.8 }} onClick={handleRemove}/>
              <VStack justifyContent={"center"} alignItems={"flex-start"} spacing={0}>
                <HStack>
                  <Heading size="sm"> {serviceName}</Heading>
                  <Text fontSize={"xs"}>({gender})</Text>
                </HStack>

                <Text fontSize={"sm"}>Duration :{duration}m</Text>
              </VStack>
              <Text fontSize={"md"} fontWeight={600}>Rs.{price}</Text>
            </HStack>
          </CardBody>
        </Card>
      </Box>
     </>
}

export default SelectedServiceCard
