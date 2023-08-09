import { Heading,Box, HStack,Text, Button } from '@chakra-ui/react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { emptyCart } from '../../redux/slices/cart';
import axios from 'axios'

interface CartProps{

}
const Cart:React.FC<CartProps> = (props) => {
  
   const cartDetails = useAppSelector(state=>state.cart) 
   const [total, setTotal] = useState(0)
   const navigate = useNavigate()
   const dispatch  = useAppDispatch()

   useEffect (()=>{
      setTotal(cartDetails.cartList.reduce((sum,item)=>sum+item.price,0))
   },[cartDetails])

  const handleViewCart= ()=>{
   console.log('handleCart...')
   navigate('/finalSelection')
  } 

  const handleClearCart=()=>{
    
    let apiEndpoint=`${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_CLEAR_CART}`
    axios.post(apiEndpoint,{"userId":'88109dd4-ec1b-4c44-9669-60b0e48f33c0'})
    .then((res)=>{
      console.log(res)
      dispatch(emptyCart())
    })
    .catch((error)=>console.log(error))

  }
  return <> 
  <Box bg={'#60b246'} maxH={100} maxW={{base:"400",sm:"300"}} m={4} rounded={10} padding={5}>
     <HStack> 
        <Text color={"white"} fontWeight={700}>{cartDetails.cartList.length} {cartDetails.cartList.length>1?"Services":"Service"} | </Text>
        <Text color={"white"} fontWeight={700}>RS.{total}</Text>
     </HStack>
     <HStack mt={4}>
     <Button color={"white"} variant={'unstyled'} onClick={handleViewCart} fontWeight={700}>VIEW CART |</Button>
     <Button color={"white"} variant={'unstyled'} onClick={handleClearCart} fontWeight={700}>CLEAR CART</Button>
     <AiOutlineShoppingCart color='white' size={'30'} />
     </HStack>
  </Box>
  </>
}

export default Cart
