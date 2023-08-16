// Importing required dependencies
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import LoginUser from '../Logins/LoginUser';
import {
  Image,
  Text,
  Avatar,
  VStack,
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Slide,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import LoginPartner from '../Logins/LoginPartner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/index';
import { removeToken, setToken } from '../../../redux/slices/user';
import LocationDropdown from '../../LocationDropDown/LocationDropDown';

// Defining Navbar functional component
const Navbar = () => {
  // Defining state variables for managing Navbar behavior
  const [hamburgerIconStatus, setHamburgerIconStatus] = useState(false);
  const [show, setShow] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isLoginModalOpen, onToggle: onLoginModalToggle } =
    useDisclosure();
  const {
    isOpen: isLoginModalForPartnerOpen,
    onToggle: onLoginModalForPartnerToggle,
  } = useDisclosure();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const isListingsRoute = location.pathname === '/listings';

  // const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn);

  // Function to handle click event (opens and closes the menu)
  const handleClick = () => {
    setHamburgerIconStatus(!hamburgerIconStatus);
  };

  const handleSuccessfulLoginUser = () => {
    onLoginModalToggle(); // Close the login modal
    dispatch(setToken());
  };
  const handleSuccessfulLoginPartner = () => {
    onLoginModalForPartnerToggle(); // Close the login modal
    dispatch(setToken());
  };
  // Function to handle profile button click event (toggle profile dropdown)
  const handleProfile = () => {
    console.log('profile');
    setShow(!show);
  };

  //Function to handle logout of user
  const handleLogout = () => {
    console.log('logout');
    dispatch(removeToken());
  };

  //Function to handle user search input in navbar
  const handleSearch = () => {
    console.log('searching..');
  };

  const handleUserNavigation = (page: string) => {
    navigate(page);
  };
  // The render of the component
  useEffect(() => {
    dispatch(setToken());
    user.userType == 'salon_admin'
      ? navigate('/dashboardService')
      : navigate('/');
  }, [user]);
  console.log(user);
  return (
    <>
      <nav>
        {/* Stacking logo and search box input together on the left side of the navbar */}
        <HStack spacing={8}>
          <Image src="/logo-no-background.png" alt="logo" height={'10'} />
          {/* Only show search box if a user is logged in. This is determined by isLoggedIn state */}
          {/* {isListingsRoute && (
            <LocationDropdown city={''} dropdownOptions={[]} />
          )} */}
          {user.isLoggedIn && (
            <InputGroup
              maxW={{ base: '210px', sm: 'lg' }}
              justifyContent={'center'}
            >
              <InputRightElement>
                <SearchIcon
                  onClick={handleSearch}
                  color="black"
                  mt={{ base: 'none', sm: '2' }}
                />
              </InputRightElement>
              <Input
                placeholder="Salon"
                color={'black'}
                size={{ base: 'sm', sm: 'lg' }}
                w={'lg'}
                bg={'white'}
                borderRadius={'3px'}
              />
            </InputGroup>
          )}
        </HStack>

        <div className="menu-icon" onClick={handleClick}>
          <HamburgerIcon boxSize={'9'} />
        </div>

        {/* Display different menu options based on login status */}
        {/* if user is not logged in */}
        {!user.isLoggedIn && (
          <ul className={hamburgerIconStatus ? 'menu-list' : 'menu-list close'}>
            <li>
              <NavLink to={'/'} onClick={onLoginModalForPartnerToggle}>
                {'Register as Partner'}
              </NavLink>
            </li>
            <li>
              <NavLink to={'/'} onClick={onToggle}>
                {'About us'}
              </NavLink>
            </li>
            <li>
              <NavLink to={'/'} onClick={onLoginModalToggle}>
                {'Login/Singup'}
              </NavLink>
            </li>
          </ul>
        )}
        <Modal
          onClose={onLoginModalToggle}
          size={{ base: 'full', sm: '2xl' }}
          isOpen={isLoginModalOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={0}>
              <LoginUser
                handleSuccessfulLoginUser={handleSuccessfulLoginUser}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          onClose={onLoginModalForPartnerToggle}
          size={{ base: 'full', sm: '2xl' }}
          isOpen={isLoginModalForPartnerOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={0}>
              <LoginPartner
                handleSuccessfulLoginPartner={handleSuccessfulLoginPartner}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* if user is logged in */}
        {user.isLoggedIn && (
          <>
            <ul
              className={hamburgerIconStatus ? 'menu-list' : 'menu-list close'}
            >
              <li>
                <NavLink to={'/'}>{'Home'}</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>{'Salons'}</NavLink>
              </li>
              <li>
                <NavLink to={'/'} onClick={onToggle}>
                  {'About us'}
                </NavLink>
              </li>
              <li className="menu-icon">
                <Text onClick={handleLogout} color={'accent.500'}>
                  Logout
                </Text>
              </li>
              <li>
                {/* below div is for showing avatar icon and dropdownlist for the icon which is only in Desktop view */}
                <div className="avatar-icon">
                  <Box
                    position="relative"
                    bgSize={'xs'}
                    onClick={handleProfile}
                  >
                    <Avatar
                      name="Sidhanth Kamble"
                      src="https://bit.ly/broken-link"
                      size={'sm'}
                      onClick={() => setShow(!show)}
                    />

                    {/* Display dropdown with profile options when mouse hovers over the avatar or on click */}
                    {show && (
                      <Portal>
                        <VStack
                          position="absolute"
                          top="63px"
                          width="200px"
                          background="primary"
                          color={'white'}
                          boxShadow="md"
                          p="4"
                          right={0}
                          rounded="md"
                          spacing="3"
                          onMouseLeave={() => setShow(false)}
                        >
                          <Text
                            onClick={() => handleUserNavigation('/userProfile')}
                            cursor={'pointer'}
                          >
                            Profile
                          </Text>
                          <Text
                            onClick={() => handleUserNavigation('/userProfile')}
                            cursor={'pointer'}
                          >
                            Bookings
                          </Text>
                          <Text
                            onClick={handleLogout}
                            color={'accent.500'}
                            cursor={'pointer'}
                          >
                            Logout
                          </Text>
                        </VStack>
                      </Portal>
                    )}
                  </Box>
                </div>
              </li>
            </ul>
          </>
        )}
      </nav>

      {/* this slide is for about us section */}
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="23px"
          color="white"
          mt="4"
          bg="primary"
          rounded="md"
          shadow="md"
        >
          <Text fontSize={13}>
            Step into a revolutionized salon experience crafted by our
            cutting-edge online platform. With an array of salons listed from
            across the city, we bring a seamless beauty service booking process
            right to your fingertips. Our platform&apos;s intuitive design and
            customer-focused approach promise to eliminate the uncertainty and
            waiting times traditionally associated with salon visits. Moreover,
            backed by reputable investors, we have secured a strong foothold in
            the beauty industry, a testament to our commitment to excellence and
            innovation.
          </Text>
          <Text fontSize={13} mt={3}>
            Our Founders : Chetan Rao, Sidhanth Kamble{' '}
          </Text>
        </Box>
      </Slide>
    </>
  );
};

// Exporting the Navbar component
export default Navbar;
