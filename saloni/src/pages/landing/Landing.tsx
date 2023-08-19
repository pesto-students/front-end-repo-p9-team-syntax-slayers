import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { WarningIcon } from '@chakra-ui/icons';

import SalonCard from '../../components/SalonCard/SalonCard';
import TreatmentCard from '../../components/TreatmentCard/TreatmentCard';
import ScrollableCardList from '../../components/ScrollableCardListV2/ScrollableCardList';
import HeaderText from '../../components/Header/Index';
import { Link } from 'react-router-dom';
import { BookingInfo, City, ExploreTreatment, Salon } from '../../global';
import instance, { setAuthHeaders } from '../../API';
import CityCard from '../../components/CityCard/CityCard';
import { getDeviceType } from '../../helper/deviceType';
import SearchLocationBar from '../../components/SearchLocationBar1/SearchLocationBar';
import { geocodeCoordinates } from '../../helper/geoCoding';
import { CiShoppingBasket } from 'react-icons/ci';
import { AiOutlineShop } from 'react-icons/ai';
import { BiHappyAlt } from 'react-icons/bi';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setGeoAddress, setUserLocation } from '../../redux/slices/user';
import useGeolocation from '../../helper/geolocation';
import MyUpcomingBookingCard from '../../components/MyUpcomingBookingCard/MyUpcomingBookingCard';

const deviceType = getDeviceType();
const isMobileIOS =
  deviceType.device === 'Mobile' &&
  /iPhone|iPad|iPod/i.test(navigator.userAgent);

const Landing = () => {
  const [exploreSalons, setExploreSalons] = useState<Salon[]>([]);
  const [upComingBookings, setUpComingBookings] = useState<BookingInfo[]>([]);

  const [exploreTreatments, setExploreTreatments] = useState<
    ExploreTreatment[]
  >([]);
  const [cities, setCities] = useState<City[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const userLocation = useAppSelector((state) => state.user.userLocation);
  const user = useAppSelector((state) => state.user);

  const geoCoding = useAppSelector((state) => state.user.GeoAddress);
  const dispatch = useAppDispatch();
  const locationData = useGeolocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (user?.token) {
          const myUpcomingBookingsResponse = await instance.get(
            `${process.env.REACT_APP_BASEURL}profile/myUpComingBookings/${user.userId}`,
            {
              headers: {
                Authorization: user?.token,
              },
            },
          );

          if (myUpcomingBookingsResponse.status === 200) {
            setUpComingBookings(
              myUpcomingBookingsResponse?.data?.data[0]?.upcomingBookings,
            );
          }
        }
        if (locationData) {
          dispatch(
            setUserLocation({
              lat: locationData.latitude || 0,
              lon: locationData.longitude || 0,
            }),
          );

          const geoAddress = await geocodeCoordinates(
            locationData.latitude || 0,
            locationData.longitude || 0,
          );
          if (geoAddress) {
            dispatch(
              setGeoAddress({
                ...geoCoding,
                formatted: geoAddress.formatted,
                city: geoAddress.city,
                state: geoAddress.state,
                country: geoAddress.country,
                postalCode: geoAddress.postalCode,
              }),
            );
          }
        }
        const reqBody = {
          sortByType: 'relevance',
          count: 10,
          lon: locationData.longitude,
          lat: locationData.latitude,
        };

        const exploreTreatmentsResponse = await instance.get(
          'https://res.cloudinary.com/coorgly/raw/upload/v1691938795/ExploreTeatments_drkf3i.json',
        );

        const citiesResponse = await instance.get(
          'https://res.cloudinary.com/coorgly/raw/upload/v1692012905/cities_ce3y9s.json',
        );

        const exploreSalonsResponse = await instance.post(
          `${process.env.REACT_APP_BASEURL}salon/nearBySalons`,
          reqBody,
        );

        if (exploreTreatmentsResponse.status === 200) {
          setExploreTreatments(exploreTreatmentsResponse?.data || []);
        }

        if (citiesResponse.status === 200) {
          setCities(citiesResponse.data);
        }

        if (exploreSalonsResponse.status === 200) {
          setExploreSalons(
            exploreSalonsResponse?.data?.data?.nearBySalons?.nearBySalons || [],
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [JSON.stringify(locationData)]);

  const handleCitySelect = async (selectedId: string) => {
    try {
      const selectedCityData = cities.find((city) => city.id === selectedId);

      if (selectedCityData) {
        setIsLoading(true);

        dispatch(
          setUserLocation({
            lat: selectedCityData.lat || 12.9299,
            lon: selectedCityData.lon || 77.5822,
          }),
        );

        const geoAddress = await geocodeCoordinates(
          selectedCityData.lat || 12.9299,
          selectedCityData.lon || 77.5822,
        );

        if (geoAddress) {
          if (geoAddress.city == 'Bengaluru') geoAddress.city = 'Bangalore';
          console.log(geoAddress);
          dispatch(
            setGeoAddress({
              formatted: geoAddress.formatted,
              city: geoAddress.city,
              state: geoAddress.state,
              country: geoAddress.country,
              postalCode: geoAddress.postalCode,
            }),
          );
        }
        const reqBody = {
          sortByType: 'relevance',
          count: 10,
          lon: selectedCityData.lon,
          lat: selectedCityData.lat,
        };

        const exploreSalonsResponse = await instance.post(
          `${process.env.REACT_APP_BASEURL}salon/nearBySalons`,
          reqBody,
        );

        if (exploreSalonsResponse.status === 200) {
          setExploreSalons(
            exploreSalonsResponse?.data?.data?.nearBySalons?.nearBySalons || [],
          );
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log('-err', error);
    }
  };

  const handleSearchQueryChange = (value: string) => {
    // Handle the search query change in the parent component
    console.log('Search query changed:', value);
    // You can update the state or perform any necessary actions here
  };

  return (
    <>
      {/* Section 1 */}
      <VStack spacing={0} overflowX={'hidden'}>
        {/* Hero Image */}
        <Box m={0}>
          <Image
            w="100vw"
            h={['250px', '400px', '475px']}
            objectFit="cover"
            src="https://res.cloudinary.com/coorgly/image/upload/v1691577607/Search._Book._Relax._1_modvc2.png"
            alt="Saloni Hero Banner. Search, Book and Relax."
          />
        </Box>
        <SearchLocationBar
          city={geoCoding?.city || geoCoding?.formatted}
          lat={userLocation.lat}
          lon={userLocation.lon}
          dropdownOptions={cities}
          onCitySelect={handleCitySelect}
          onSearchQueryChange={handleSearchQueryChange}
        />

        {/* Subtitles section */}
        <HStack
          m={0}
          pt={['50px', '40px']}
          w="100%"
          h={['180px', '220px']}
          bg={'primary'}
          maxWidth={'100%'}
          maxHeight={'220px'}
          justifyContent={'space-around'}
        >
          {getDeviceType().device === 'Desktop' && (
            <>
              <FeatureSection
                icon={<AiOutlineShop color="#F61732" size="60px" />}
                title="Search."
                description="Discover Nearby Salons."
              />
              <FeatureSection
                icon={<CiShoppingBasket color="#F61732" size="60px" />}
                title="Book."
                description="Reserve Your Appointment."
              />
              <FeatureSection
                icon={<BiHappyAlt color="#F61732" size="60px" />}
                title="Relax."
                description="Relax, We Will Take Care From Here."
              />
            </>
          )}
        </HStack>
      </VStack>
      {/* Section 2 */}

      <VStack alignItems={'flex-start'}>
        {/* My Upcoming Bookings Section */}
        {user?.token && (
          <VStack m={5} alignItems={'flex-start'} justifyContent={'flex-start'}>
            <HStack
              w={'100%'}
              alignItems={'flex-start'}
              justifyContent={'space-between'}
            >
              <HeaderText text={'My Upcoming Bookings'} />
            </HStack>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Box maxH="60%" maxW={['85vw', '90vw']}>
                  {Array.isArray(upComingBookings) &&
                  upComingBookings.length > 1 ? (
                    <>
                      {isMobileIOS && (
                        <ScrollableCardList
                          cardWidth={'300px'}
                          visibleCards={1}
                        >
                          {upComingBookings.map((myBooking) => (
                            <MyUpcomingBookingCard
                              key={myBooking.orderID}
                              banner={myBooking.banner}
                              orderID={myBooking.orderID}
                              salonName={myBooking.salonName}
                              startTime={myBooking.startTime}
                              salonAddress={myBooking.salonAddress}
                              bookedServices={myBooking.bookedServices}
                            />
                          ))}
                        </ScrollableCardList>
                      )}

                      {!isMobileIOS &&
                        Array.isArray(upComingBookings) &&
                        upComingBookings.length > 2 && (
                          <ScrollableCardList
                            cardWidth={'300px'}
                            visibleCards={1}
                          >
                            {upComingBookings.map((myBooking) => (
                              <MyUpcomingBookingCard
                                key={myBooking.orderID}
                                banner={myBooking.banner}
                                orderID={myBooking.orderID}
                                salonName={myBooking.salonName}
                                startTime={myBooking.startTime}
                                salonAddress={myBooking.salonAddress}
                                bookedServices={myBooking.bookedServices}
                              />
                            ))}
                          </ScrollableCardList>
                        )}
                    </>
                  ) : (
                    <VStack
                      align="center"
                      justify="center"
                      spacing={3}
                      p={5}
                      borderWidth="1px"
                      borderRadius="lg"
                      borderColor="gray.300"
                      backgroundColor="gray.100"
                      textAlign="center"
                      minHeight="200px"
                    >
                      <Icon as={WarningIcon} boxSize={10} color="gray.500" />
                      <Text fontSize="lg" fontWeight="bold">
                        No Upcoming Booking
                      </Text>
                      {/* <Text>Please check back later.</Text> */}
                    </VStack>
                  )}
                </Box>
              </>
            )}
          </VStack>
        )}

        {/* Explore Salon Section */}
        <VStack m={5} alignItems={'flex-start'} justifyContent={'flex-start'}>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
          >
            <HeaderText text={'Explore Salons'} />
            {Array.isArray(exploreSalons) && exploreSalons.length >= 4 && (
              <Link to="/listings">
                <Text as="b" _hover={{ cursor: 'pointer' }} color="accent.50">
                  See All
                </Text>
              </Link>
            )}
          </HStack>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Box maxH="60%" maxW={['85vw', '90vw']}>
                {Array.isArray(exploreSalons) && exploreSalons.length > 2 && (
                  <HStack spacing={4} overflowY={'hidden'}>
                    <ScrollableCardList cardWidth="500px" visibleCards={3}>
                      {exploreSalons.map((salon) => (
                        <SalonCard
                          id={salon.id}
                          key={salon.id}
                          salonName={salon.name}
                          rating={salon.rating.toString()}
                          distance={Number(salon?.distance?.toFixed(2)) || 0}
                          gender={salon.gender}
                          location={salon.address}
                          ratingCount={salon?.rating_count || 0}
                          imageUrl={salon.banner}
                          statusClose={!!salon.temp_inactive}
                        />
                      ))}
                    </ScrollableCardList>
                  </HStack>
                )}

                {Array.isArray(exploreSalons) && exploreSalons.length <= 2 && (
                  <HStack spacing={4}>
                    {exploreSalons.map((salon) => (
                      <SalonCard
                        key={salon.id}
                        salonName={salon.name}
                        rating={salon.rating.toString()}
                        distance={Number(salon?.distance?.toFixed(2)) || 0}
                        gender={salon.gender}
                        location={salon.address}
                        ratingCount={salon?.rating_count || 0}
                        imageUrl={salon.banner}
                        statusClose={!!salon.temp_inactive}
                      />
                    ))}
                  </HStack>
                )}

                {Array.isArray(exploreSalons) && exploreSalons.length === 0 && (
                  <VStack
                    align="center"
                    justify="center"
                    spacing={3}
                    p={5}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="gray.300"
                    backgroundColor="gray.100"
                    textAlign="center"
                    minHeight="200px"
                  >
                    <Icon as={WarningIcon} boxSize={10} color="gray.500" />
                    <Text fontSize="lg" fontWeight="bold">
                      No salons available
                    </Text>
                    <Text>Please check back later.</Text>
                  </VStack>
                )}
              </Box>
            </>
          )}
        </VStack>
        {/* Explore Treatment Section */}
        <VStack m={5} align="stretch">
          <Box minW={'90vw'} justifyContent="center" alignContent={'center'}>
            <HeaderText text={'Explore Treatments'} />
          </Box>
          <Box>
            <HStack
              display={{ base: 'grid', md: 'flex' }}
              gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: '1fr' }}
              gap={4}
              justifyContent="center"
              alignContent="center"
            >
              {Array.isArray(exploreTreatments) &&
                exploreTreatments.map((exploreTreatment) => (
                  <Box key={exploreTreatment.id}>
                    <TreatmentCard
                      imageUrl={exploreTreatment.treatment_pic_url}
                      serviceName={exploreTreatment.name}
                      description={exploreTreatment.description || ''}
                    />
                  </Box>
                ))}
            </HStack>
          </Box>
        </VStack>
        {/* Cities We Serve In */}
        <VStack m={5} align="stretch">
          <Box minW={'90vw'} justifyContent="center" alignContent={'center'}>
            <HeaderText text={'Cities We Serve In'} />
          </Box>
          <Box>
            <HStack
              display={{ base: 'grid', md: 'flex' }}
              gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: '1fr' }}
              gap={4}
              justifyContent="center"
              alignContent={'center'}
            >
              {Array.isArray(cities) &&
                cities.map((city) => (
                  <Box key={city.id}>
                    <CityCard city={city} onClick={(id) => console.log(id)} />
                  </Box>
                ))}
            </HStack>
          </Box>
        </VStack>
      </VStack>
    </>
  );
};

export default Landing;
