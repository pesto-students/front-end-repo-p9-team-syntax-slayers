import { Heading, Box, CircularProgress,Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react'
import { GrSubtractCircle } from "react-icons/gr";
import axios from 'axios';
import React, {useState} from 'react'
import { useAppDispatch,useAppSelector } from '../../redux/hooks';
import { removeFromList } from '../../redux/slices/cart';

export interface SelectedServiceCardProps{
  created_at?: string;
  description: string;
  duration: number;
  featured?: number;
  id?: string;
  is_active?: number;
  name: string;
  price: number;
  salon_id?: string;
  updated_at?: string;

}
const SelectedServiceCard:React.FC<SelectedServiceCardProps> = (props) => {
    
  const {name,duration,price, description,id,salon_id} = props 
  const dispatch = useAppDispatch()
  const [loader,setLoader]=useState(false)
  const user = useAppSelector(state=>state.user)


  const handleRemove=()=>{
    console.log('removed',id)
    setLoader(true)
    const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_REMOVE_FROM_CART}`
    const data={    "userId":user.userId,
    "salonId":salon_id,
    "serviceId":id}

    console.log(apiEndpoint)
    axios.post(apiEndpoint,data)
    .then(response=>{
      console.log(response)
      dispatch(removeFromList(props))
      setLoader(false)
    })
    .catch(error=>{
      console.log(error)
      setLoader(false)
    })

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
            {!loader &&<GrSubtractCircle size={"30px"} style={{ opacity: 0.8 }} onClick={handleRemove} cursor={'pointer'}/>}
            {loader&&<CircularProgress isIndeterminate color='accent.300' size={'24px'} />}
              <VStack justifyContent={"center"} alignItems={"flex-start"} spacing={0}>
                <HStack>
                  <Heading size="sm"> {name}</Heading>
                  <Text fontSize={"xs"}>({description})</Text>
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
