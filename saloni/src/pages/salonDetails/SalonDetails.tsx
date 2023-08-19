import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Divider,
  HStack,
  Progress,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalBody,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import React, { useEffect } from 'react';
import CarouselCard from '../../components/Carousel/Carousel';
import { useState } from 'react';
import ServiceCard, {
  ServiceCardProps,
} from '../../components/ServiceCard/ServiceCard';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import Cart from '../../components/Cart/Cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  reviewDummyData,
  serviceListDummy,
} from '../../components/ReviewCard/Helper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToList, emptyCart } from '../../redux/slices/cart';
import { useParams } from 'react-router-dom';
import AddReview from '../../components/AddReview/AddReview';

interface SalonDetailsProps {}

const SalonDetails: React.FC<SalonDetailsProps> = (props) => {
  const [serviceList, setServiceList] = useState<ServiceCardProps[]>([]);
  const [filteredServiceList, setFilteredServiceList] = useState<
    ServiceCardProps[]
  >([]);
  const [activeButton, setActiveButton] = useState('');
  const [ratingNumber, setRatingNumber] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const currentSalonId = useAppSelector((state) => state.cart.salonId);
  const salonRedux = useAppSelector((state) => state.cart.salon);
  const history = useNavigate();

  const { salonId } = useParams();

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName == 'Featured') {
      setFilteredServiceList(serviceList.filter((item) => item.featured == 1));
    } else if (buttonName == 'Hair') {
      setFilteredServiceList(
        serviceList.filter((item) =>
          item.name.toLocaleLowerCase().includes('hair'),
        ),
      );
    } else if (buttonName == 'MakeUp') {
      setFilteredServiceList(
        serviceList.filter((item) =>
          item.name.toLocaleLowerCase().includes('makeup'),
        ),
      );
    } else {
      const words = ['massage', 'facial', 'cure'];
      setFilteredServiceList(
        serviceList.filter((item) =>
          words.some((word) => item.name.toLocaleLowerCase().includes(word)),
        ),
      );
    }
  };

  useEffect(() => {
    setActiveButton('Featured');
    setFilteredServiceList(serviceList.filter((item) => item.featured == 1));
  }, [serviceList]);

  useEffect(() => {
    setLoader(true);
    const apiEndpoint1 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_GET_SALON_SERVICES}${salonId}`;

    axios
      .get(apiEndpoint1)
      .then((response) => {
        console.log(response.data.data);
        setServiceList(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(
          'There has been a problem with our fetch operation:',
          error,
        );
        setLoader(false);
      });

    const apiEndpoint2 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_CART_LIST}${user.userId}`;
    console.log(apiEndpoint2);
    // Make the GET request.
    axios
      .get(apiEndpoint2)
      .then((response) => {
        const cartDataFromDB = response.data.data;
        console.log(cartDataFromDB);
        dispatch(emptyCart());
        cartDataFromDB.map((item: ServiceCardProps) => {
          dispatch(addToList(item));
        });
      })
      .catch((error) => {
        console.error(
          'There has been a problem with our fetch operation:',
          error,
        );
      });
  }, [salonId]);

  useEffect(() => {
    console.log(cart);
    if (currentSalonId && currentSalonId !== salonId) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [cart]);

  useEffect(() => {
    let sum = 0;
    {
      /* instead of reviewDummyData we will use reviewersList here */
    }
    reviewDummyData.map((item, index) => {
      sum += item.rating;
    });
    {
      /* instead of reviewDummyData we will use reviewersList here */
    }
    setRatingNumber(sum / reviewDummyData.length);
  }, []);

  const handleClearCart = () => {
    let apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_CLEAR_CART}`;
    axios
      .post(apiEndpoint, { userId: user.userId })
      .then((res) => {
        console.log(res);
        dispatch(emptyCart());
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Flex direction={'column'} bg={'primary'}>
        <HStack spacing={12} ml={6}>
          <Text color={'white'}>{salonRedux.salonName}</Text>{' '}
          <HStack>
            {' '}
            <AiFillStar color="gold" />
            <Text color={'white'}>{ratingNumber}</Text>
          </HStack>{' '}
          <Button
            variant={'outline'}
            color={'accent.500'}
            colorScheme={'accent.500'}
          >
            {salonRedux.gender}
          </Button>
        </HStack>
        <HStack spacing={12} ml={6}>
          {' '}
          <HStack>
            <Text color={'green'}>Open</Text>{' '}
            <Text color={'white'}>Until: 7:00PM</Text>
          </HStack>{' '}
          <Text color={'white'}>{salonRedux.location}</Text>
        </HStack>
      </Flex>
      <CarouselCard />

      <Box padding={{ base: '', sm: '5' }}>
        <Box padding={5}>
          <Heading fontSize={'xl'}> Description</Heading>
          <Text mt={2}>
            Hair and Beauty Unisex Salon offer a variety of services including
            professional hair cutting and styling, manicures and pedicures, and
            often cosmetics, makeup and makeovers.
          </Text>
        </Box>

        <Box>
          <Button
            variant={activeButton === 'Featured' ? 'solid' : 'outline'}
            color={activeButton === 'Featured' ? 'accent.500' : 'black'}
            bg={activeButton === 'Featured' ? 'primary' : 'white'}
            ml={3}
            _hover={{}}
            mr={{ sm: '10' }}
            onClick={() => handleButtonClick('Featured')}
          >
            Featured
          </Button>
          <Button
            variant={activeButton === 'Hair' ? 'solid' : 'outline'}
            color={activeButton === 'Hair' ? 'accent.500' : 'black'}
            bg={activeButton === 'Hair' ? 'primary' : 'white'}
            ml={3}
            _hover={{}}
            mr={{ sm: '10' }}
            onClick={() => handleButtonClick('Hair')}
          >
            Hair
          </Button>
          <Button
            variant={activeButton === 'MakeUp' ? 'solid' : 'outline'}
            color={activeButton === 'MakeUp' ? 'accent.500' : 'black'}
            bg={activeButton === 'MakeUp' ? 'primary' : 'white'}
            ml={3}
            _hover={{}}
            mr={{ sm: '10' }}
            onClick={() => handleButtonClick('MakeUp')}
          >
            MakeUp
          </Button>
          <Button
            variant={activeButton === 'Spa' ? 'solid' : 'outline'}
            color={activeButton === 'Spa' ? 'accent.500' : 'black'}
            bg={activeButton === 'Spa' ? 'primary' : 'white'}
            ml={3}
            _hover={{}}
            mr={{ sm: '10' }}
            onClick={() => handleButtonClick('Spa')}
          >
            Spa
          </Button>
        </Box>
        <Divider mt={3} width={{ sm: '30%' }} />
        <Flex direction={{ base: 'column', sm: 'row' }}>
          <Box width={{ base: '100%', sm: '70%' }}>
            {loader && (
              <Progress size="xs" color={'accent.500'} isIndeterminate />
            )}
            {/* instead of serviceListDummy list we will use here serviceList */}
            {!loader &&
              filteredServiceList.map((item, index) => {
                return (
                  <ServiceCard
                    key={item.id} // It's better to use unique value 'id' for key if available instead of the array index
                    name={item.name}
                    duration={item.duration}
                    price={item.price}
                    description={item.description}
                    created_at={item.created_at}
                    featured={item.featured}
                    id={item.id}
                    is_active={item.is_active}
                    salon_id={item.salon_id}
                    updated_at={item.updated_at}
                  />
                );
              })}
          </Box>
          <Cart />
        </Flex>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Warning</ModalHeader>
            <ModalBody>
              The service present in your cart is/are of another salon. Are you
              sure you want to clear the cart and switch?
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  history(`/salonDetails/${currentSalonId}`);
                  setShowModal(false);
                }}
              >
                Go Back To Previous salon
              </Button>
              <Button
                color={'accent.500'}
                variant={'outline'}
                colorScheme="accent.500"
                onClick={() => {
                  handleClearCart();
                  setShowModal(false);
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <AddReview salonId={salonId} />
      </Box>
    </>
  );
};

export default SalonDetails;
