import {
  Heading,
  Card,
  CardBody,
  Text,
  Flex,
  Box,
  VStack,
  HStack,
  CircularProgress,
} from "@chakra-ui/react";
import { GrAddCircle} from "react-icons/gr";
import React, { useState } from "react";
import { useAppDispatch , useAppSelector} from "../../redux/hooks";
import axios from 'axios'
import cart, { addToList,removeFromList } from "../../redux/slices/cart";

export interface ServiceCardProps {
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

const ServiceCard: React.FC<ServiceCardProps> = (props) => {

  //Destructuring props
  const { name, duration, price, description,salon_id,id } = props;
  const cart = useAppSelector(state=>state.cart)
  const user = useAppSelector(state=>state.user)
  const dispatch = useAppDispatch();
  const [loader,setLoader]=useState(false)

  const handleAddClick = (props:ServiceCardProps)=> {
     console.log('adding..',props)
     setLoader(true)
     const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_ADD_TO_CART}`
     const data={  "userId":user.userId,
     "salonId":salon_id,
     "serviceId":id}
 
     console.log(apiEndpoint,data)
     axios.post(apiEndpoint,data)
     .then(response=>{
       console.log(response)
       dispatch(addToList(props))
       setLoader(false)
     })
     .catch(error=>{
       setLoader(false)
       console.log(error)
     })
  }

  const handleRemoveClick = (props:ServiceCardProps)=>{
    console.log('removing,,,')

    const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_REMOVE_FROM_CART}`
    const data={    "userId":"88109dd4-ec1b-4c44-9669-60b0e48f33c0",
    "salonId":salon_id,
    "serviceId":id}

    console.log(apiEndpoint,data)
    axios.post(apiEndpoint,data)
    .then(response=>{
      console.log(response)
      dispatch(removeFromList(props))
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <>
      <Box margin={"10px"}>
        <Card
          key={""}
          size={"sm"}
          maxW={"600px"}
          maxH={{base:"150px",sm:"100px"}}
          variant={"outline" }
          borderRadius={"15px"}
          boxShadow={"xs" }
        >
          <CardBody pl={"20px"} pr={"40px"}>
            <HStack justifyContent={"space-between"}>
              <VStack justifyContent={"center"} alignItems={"flex-start"}>
                <HStack>
                  <Heading size="sm"> {name}</Heading>
                  <Text fontSize={"xs"}>({description})</Text>
                </HStack>

                <Text fontSize={"sm"}>Duration :{duration}m</Text>
                <Text fontSize={"sm"}>Rs.{price}</Text>
              </VStack>
              {/* based on the cart we will decide the logic of showing icons + and - */}
              <Flex>
              {!loader && !cart.cartList.some(item => item.id === id) &&<GrAddCircle size={"30px"} style={{ opacity: 0.8 }} cursor={'pointer'} onClick={()=>handleAddClick(props)}/>}
              {loader&&<CircularProgress isIndeterminate color='accent.300' size={'24px'} />}
              {!loader&& cart.cartList.some(item => item.id === id)&& <Text color={'#60b246'}>Added to cart</Text>}
              </Flex>
            </HStack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default ServiceCard;
