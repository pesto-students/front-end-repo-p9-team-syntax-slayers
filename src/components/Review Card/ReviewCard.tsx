import { Box, Flex, Heading, HStack, VStack, Avatar, Text } from '@chakra-ui/react'
import {AiFillStar} from 'react-icons/ai'
import React from 'react'

interface ReviewCardProps{
    reviewerName:string,
    reviewDate:String,
    review:string,
    rating:Number
}

const ReviewCard:React.FC<ReviewCardProps> = (props) => {

    const {reviewerName, reviewDate, review,rating} =props;


  return <>
    <Box bg="white" p={5} shadow="md" rounded="md" w="full" maxW={{ base: "80%", md: "36%" }} m={'2'}>
      <Flex direction={"row"} align={{ base: "center", md: "flex-start" }} mb={4}>
        <Avatar name="Your Name" src="https://bit.ly/broken-link" />
        <Box ml={{base:4, md: 4 }}>
          <Text fontWeight="bold">{reviewerName}</Text>
          <Text color="gray.500">{reviewDate}</Text>
        </Box>
      </Flex>
      <Flex justify="flex-start" mb={1}>
        {Array(rating).fill(1).map((_,i)=>{
            return <AiFillStar key={i}size={24} color="gold" />
        })}
        
      </Flex>
      <Text align="justify">{review}</Text>
    </Box>
  </>
}

export default ReviewCard
