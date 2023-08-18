import React, { useEffect, useState } from 'react';
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
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import LoginUser from '../Logins/LoginUser';
import LoginPartner from '../Logins/LoginPartner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/index';
import { removeToken, setToken } from '../../../redux/slices/user';
// import LocationDropdown from '../../LocationDropDown/LocationDropDown';

const Navbar = () => {
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

  const handleClick = () => {
    setHamburgerIconStatus(!hamburgerIconStatus);
  };

  const handleSuccessfulLoginUser = () => {
    onLoginModalToggle();
    dispatch(setToken());
  };

  const handleSuccessfulLoginPartner = () => {
    onLoginModalForPartnerToggle();
    dispatch(setToken());
    navigate('/dashboardService');
  };

  const handleProfile = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    dispatch(removeToken());
    navigate('/');
  };

  const handleSearch = () => {
    console.log('searching..');
  };

  const handleUserNavigation = (page: string) => {
    navigate(page);
  };

  useEffect(() => {
    dispatch(setToken());
  }, [user]);

  return (
    <>
      <Box
        bg="rgb(36, 44, 47)"
        p="10px"
        display="flex"
        justifyContent="space-between"
        color="aliceblue"
        position="relative"
        zIndex="99"
      >
        <HStack spacing={8}>
          <Link to="/">
            <Image
              src="/logo-no-background.png"
              alt="logo"
              height="10"
              _hover={{ cursor: 'pointer' }}
            />
          </Link>

          {/* {user.isLoggedIn && (
            <InputGroup
              maxW={{ base: '210px', sm: 'lg' }}
              justifyContent="center"
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
                color="black"
                size={{ base: 'sm', sm: 'lg' }}
                w="lg"
                bg="white"
                borderRadius="3px"
              />
            </InputGroup>
          )} */}
        </HStack>

        <Box
          className="menu-icon"
          onClick={handleClick}
          display={{ base: 'block', sm: 'none' }}
        >
          <HamburgerIcon boxSize="9" />
          {hamburgerIconStatus&&user.isLoggedIn && (
                <Portal>
                  <VStack
                    position="absolute"
                    top="63px"
                    width="200px"
                    bg="primary"
                    color="white"
                    boxShadow="md"
                    p="4"
                    right={0}
                    rounded="md"
                    spacing="3"
                    onMouseLeave={() => setShow(false)}
                  >
                    <Text
                      onClick={() => handleUserNavigation('/userProfile')}
                      cursor="pointer"
                    >
                      Profile
                    </Text>
                    <Text
                      onClick={() => handleUserNavigation('/userProfile')}
                      cursor="pointer"
                    >
                      Bookings
                    </Text>
                    <Text
                      onClick={handleLogout}
                      color="accent.500"
                      cursor="pointer"
                    >
                      Logout
                    </Text>
                  </VStack>
                </Portal>
              )}
              {hamburgerIconStatus&&!user.isLoggedIn && (
                <Portal>
                  <VStack
                    position="absolute"
                    top="63px"
                    width="200px"
                    bg="primary"
                    color="white"
                    boxShadow="md"
                    p="4"
                    right={0}
                    rounded="md"
                    spacing="3"
                    onMouseLeave={() => setShow(false)}
                  >
                    <Text
                      onClick={onLoginModalForPartnerToggle}
                      cursor="pointer"
                    >
                      For Partners
                    </Text>
                    <Text
                      onClick={onToggle}
                      cursor="pointer"
                    >
                      About Us
                    </Text>
                    <Text
                      onClick={onLoginModalToggle}
                      color="accent.500"
                      cursor="pointer"
                    >
                      Log In
                    </Text>
                  </VStack>
                </Portal>
              )}
        </Box>

        {!user.isLoggedIn ? (
          <>
            <HStack
              as="ul"
              className={hamburgerIconStatus ? 'menu-list' : 'menu-list close'}
              listStyleType="none"
              alignItems="flex-end"
              display={{ base: 'none', sm: 'flex' }}
              spacing={6}
            >
              <NavLink
                to="/"
                onClick={onLoginModalForPartnerToggle}
                color="white"
              >
                {'For Partners'}
              </NavLink>
              <NavLink to="/" onClick={onToggle} color="white">
                {'About us'}
              </NavLink>
              <NavLink to="/" onClick={onLoginModalToggle} color="white">
                {'Login/Signup'}
              </NavLink>
            </HStack>
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
          </>
        ) : (
          <HStack
            as="ul"
            className={hamburgerIconStatus ? 'menu-list' : 'menu-list close'}
            listStyleType="none"
            alignItems="flex-end"
            display={{ base: 'none', sm: 'flex' }}
            spacing={6}
          >
            <NavLink to="/" color="white">
              {'Home'}
            </NavLink>
            <NavLink to="/" color="white">
              {'Salons'}
            </NavLink>
            <NavLink to="/" onClick={onToggle} color="white">
              {'About us'}
            </NavLink>
            <Text color="accent.500" onClick={handleLogout} cursor="pointer">
              Logout
            </Text>
            <Box
              className="avatar-icon"
              position="relative"
              bgSize="xs"
              onClick={handleProfile}
            >
              <Avatar
                name={user.firstName}
                src="https://bit.ly/broken-link"
                size="sm"
                onClick={() => setShow(!show)}
              />
              {show && (
                <Portal>
                  <VStack
                    position="absolute"
                    top="63px"
                    width="200px"
                    bg="primary"
                    color="white"
                    boxShadow="md"
                    p="4"
                    right={0}
                    rounded="md"
                    spacing="3"
                    onMouseLeave={() => setShow(false)}
                  >
                    <Text
                      onClick={() => handleUserNavigation('/userProfile')}
                      cursor="pointer"
                    >
                      Profile
                    </Text>
                    <Text
                      onClick={() => handleUserNavigation('/userProfile')}
                      cursor="pointer"
                    >
                      Bookings
                    </Text>
                    <Text
                      onClick={handleLogout}
                      color="accent.500"
                      cursor="pointer"
                    >
                      Logout
                    </Text>
                  </VStack>
                </Portal>
              )}
            </Box>
          </HStack>
        )}
      </Box>
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
