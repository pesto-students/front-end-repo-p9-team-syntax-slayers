import { Button, Flex, Heading,HStack,Stack,Text, Textarea } from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai';
import React, {useState} from 'react'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    reviewDummyData,
    serviceListDummy,
  } from '../../components/ReviewCard/Helper';
  import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { useEffect } from 'react';

interface AddReviewProps {
    salonId:string | undefined
}

export interface Rating {
    createdAT: string;
    feedback: string;
    id: string;
    name: string;
    profilePicURL: string | null;
    rating: number;
  }
  
 export interface SalonRating {
    salonID: string;
    ratingAvg: number;
    ratingCount: string; // This is a string based on your example, but consider making it a number if possible.
    ratings: Rating[];
  }

const AddReview:React.FC<AddReviewProps> = ({salonId}) => {
    const [value, setValue] = useState('')
    const [keySelected, setKeySelected] = useState(0)
    const [loading, setLoading] = useState(false)
    const [reviewersList, setReviewersList] = useState<SalonRating>();
    
    const user = useAppSelector(state=>state.user)

    let handleInputChange = (e:any) => {
      let inputValue = e
      setValue(inputValue)
    }
    const handleStarClick = (key: number) => {
        setKeySelected(key);
    }

    const handleSubmitReview = ()=>{
        console.log(keySelected,value,salonId)
        setLoading(true)

        const headers = {
            'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
            'Content-Type': 'application/json',
        };

        if(salonId){
            const payload={
                "rating": keySelected, "feedback": value, "salon_id": salonId
              }
           
            const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_ADD_REVIEW}`

            console.log(apiEndpoint,payload)
            axios.post(apiEndpoint,payload,{headers})
            .then((res)=>{
                console.log(res)
                setKeySelected(0)
                setValue('')
                setLoading(false)
            })
            .catch((err)=>{
                console.log(err)
                setKeySelected(0)
                setValue('')
                setLoading(false)
            })

        }

    }
     
    useEffect(()=>{
       

    const headers = {
        'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
        'Content-Type': 'application/json',
    };
  
    if(salonId){
       
        const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_GET_ALL_REVIEWS}${salonId}`
  
        console.log(apiEndpoint)
        axios.get(apiEndpoint,{headers})
        .then((res)=>{
            console.log(res)
            setReviewersList(res.data.data[0])
        })
        .catch((err)=>{
            console.log(err)
        })
  
    }
    },[salonId])
    
    console.log(reviewersList)
    return (
      <>
      <Flex direction={'column'} p={0}>
        <HStack justifyContent={'space-between'}>
         <Stack spacing={0}>  
        <Text mb='4px' ml={1}>Add Your Review:</Text>
        <Flex>
        {[1,2,3,4,5].map(key => (
                            <AiFillStar 
                                key={key}
                                size={24}
                                color={keySelected >= key ? 'gold' : 'lightgrey'} 
                                onClick={() => handleStarClick(key)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
        </Flex>
        </Stack> 
        <Button isLoading={loading} variant={'outline'} color={'accentt.500'} colorScheme={'accentt.500'}borderRadius={40} mb={1} onClick={handleSubmitReview} >submit</Button>
        </HStack>
        <Textarea
          value={value}
          onChange={(e)=>handleInputChange(e.target.value)}
          placeholder='Here is a sample placeholder'
          size='sm'
        /> 

          <HStack
            justifyContent={'flex-start'}
            whiteSpace={'normal'}
            overflowX="scroll"
            flexWrap="nowrap"
          > 
                        {reviewersList?.ratings?.map((item, index) => {
              return (
                <ReviewCard
                  key={index}
                  reviewerName={item.name}
                  reviewDate={item.createdAT}
                  review={item.feedback}
                  rating={item.rating}
                />
              );
            })}
          
          </HStack>
        </Flex>
      </>
    )
}

export default AddReview
