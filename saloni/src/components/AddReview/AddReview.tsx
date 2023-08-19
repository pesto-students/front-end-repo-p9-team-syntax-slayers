import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  reviewDummyData,
  serviceListDummy,
} from '../../components/ReviewCard/Helper';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { useEffect } from 'react';

interface AddReviewProps {
  salonId: string | undefined;
}

export interface Rating {
  createdAT: string;
  feedback: string;
  id: string;
  name: string;
  profilePicURL: string | null;
  rating: number;
  userHaveRated: 1 | 0;
}

export interface SalonRating {
  salonID: string;
  ratingAvg: number;
  ratingCount: string; // This is a string based on your example, but consider making it a number if possible.
  ratings: Rating[];
  userHaveRated: 1 | 0;
}

const AddReview: React.FC<AddReviewProps> = ({ salonId }) => {
  const [value, setValue] = useState('');
  const [keySelected, setKeySelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewersList, setReviewersList] = useState<SalonRating>();

  const user = useAppSelector((state) => state.user);

  let handleInputChange = (e: any) => {
    let inputValue = e;
    setValue(inputValue);
  };
  const handleStarClick = (key: number) => {
    setKeySelected(key);
  };

  const handleSubmitReview = () => {
    console.log(keySelected, value, salonId);
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    };

    if (salonId) {
      const payload = {
        rating: keySelected,
        feedback: value,
        salon_id: salonId,
      };

      const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_ADD_REVIEW}`;

      console.log(apiEndpoint, payload);
      axios
        .post(apiEndpoint, payload, { headers })
        .then((res) => {
          console.log(res);
          setKeySelected(0);
          setValue('');
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setKeySelected(0);
          setValue('');
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    };

    if (salonId) {
      const apiEndpoint = `${process.env.REACT_APP_BASEURL}/salon/ratings/${salonId}/${user?.userId}`;

      axios
        .get(apiEndpoint, { headers })
        .then((res) => {
          console.log(res);
          setReviewersList(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [salonId]);

  return (
    <Box ml={0} mt={20}>
      <VStack p={0} gap={3}>
        <VStack alignItems={'flex-start'} w={'90%'}>
          <Heading fontSize={'xl'} mb={3}>
            {' '}
            Reviews
          </Heading>
          <HStack>
            <AiFillStar size={24} color="gold" />
            <Text>
              {reviewersList?.ratingAvg.toFixed(2) || 0}(
              {reviewersList?.ratingCount || 0})
            </Text>
          </HStack>
        </VStack>

        {reviewersList?.userHaveRated === 0 && (
          <>
            <HStack justifyContent={'space-between'} w={'90%'}>
              <Stack spacing={0}>
                <Text mb="4px" ml={0}>
                  Add Your Review:
                </Text>
                <Flex>
                  {[1, 2, 3, 4, 5].map((key) => (
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
              <Button
                isLoading={loading}
                variant={'outline'}
                color={'accentt.500'}
                colorScheme={'accentt.500'}
                borderRadius={40}
                mb={1}
                onClick={handleSubmitReview}
              >
                submit
              </Button>
            </HStack>
            <Textarea
              w={'90%'}
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Please add your valuable review"
              size="sm"
            />
          </>
        )}

        <HStack
          justifyContent={'flex-start'}
          whiteSpace={'normal'}
          overflowX="scroll"
          flexWrap="nowrap"
          mt={3}
        >
          {reviewersList?.ratings?.map((item, index) => {
            return (
              <ReviewCard
                key={index}
                reviewAuthor={item.userHaveRated}
                reviewerName={item.name}
                reviewDate={item.createdAT}
                review={item.feedback}
                rating={item.rating}
              />
            );
          })}
        </HStack>
      </VStack>
    </Box>
  );
};

export default AddReview;
