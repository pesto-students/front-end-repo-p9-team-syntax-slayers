import { Heading,Box, HStack,Text, Button } from '@chakra-ui/react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import React from 'react'
interface CartProps{

}
const Cart:React.FC<CartProps> = (props) => {


  const handleCart= ()=>{
   console.log('handleCart...')
  } 
  return <> 
  <Box bg={'#60b246'} maxH={100} maxW={{base:"400",sm:"300"}} m={4} rounded={10} padding={5}>
     <HStack> 
        <Text color={"white"} fontWeight={700}>2 Services |</Text>
        <Text color={"white"} fontWeight={700}>RS.700</Text>
     </HStack>
     <HStack mt={4}>
     <Button color={"white"} variant={'unstyled'} onClick={handleCart} fontWeight={700}>VIEW CART</Button>
     <AiOutlineShoppingCart color='white' size={'30'} />
     </HStack>
  </Box>
  </>
}

export default Cart
