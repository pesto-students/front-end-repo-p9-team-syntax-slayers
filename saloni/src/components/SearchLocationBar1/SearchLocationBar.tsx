import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Flex,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ScaleFade,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { SearchIcon, ChevronDownIcon, StarIcon } from '@chakra-ui/icons';
import instance from '../../API';
import { GiPathDistance } from 'react-icons/gi';
import GenderBtn from '../Buttons/GenderBtn';
import LocationDropdown from '../LocationDropDown/LocationDropDown';

interface City {
  id: string;
  name: string;
}

interface coordinations {
  lat: number;
  lon: number;
}
interface SearchLocationBarProps {
  city: string;
  lat: number;
  lon: number;
  dropdownOptions: City[];
  onCitySelect?: (id: string) => void;
  onSearchQueryChange: (value: string) => void;
}

const SearchLocationBar: React.FC<SearchLocationBarProps> = (props) => {
  const { city, lat, lon, dropdownOptions, onCitySelect, onSearchQueryChange } =
    props;

  const [searchQuery, setSearchQuery] = useState('');

  const history = useNavigate();

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false); // State to control animation visibility

  useEffect(() => {
    const handleClickOutside = () => {
      setIsSearchResultsVisible(false);
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_BASEURL}salon/searchNearBySalons?lon=${lon}&lat=${lat}&searchKeyWord=${searchQuery}`,
      );
      const salons = response?.data?.data;

      if (salons) {
        setSearchResults(salons);
        setIsSearchResultsVisible(true);
      }
      setIsSearchResultsVisible(true);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSalonClick = (salonId: string) => {
    history(`/salonDetails/${salonId}`);
  };

  return (
    <Box
      as={Stack}
      direction={{ base: 'column', sm: 'row' }}
      maxW={['500px', '1000px']}
      h={['215px', '80px']}
      bg={'white'}
      display={'flex'}
      position={'absolute'}
      top={['265px', '420px', '500px']}
      justifyContent={'center'}
      padding={{ base: '20px', sm: '10px' }}
      alignItems={'center'}
      borderRadius={{ base: '15px', sm: '5px' }}
      boxShadow="lg"
    >
      <Box padding={5}>
        <LocationDropdown
          city={city}
          dropdownOptions={dropdownOptions}
          onCitySelect={onCitySelect}
        />

        {/* <Menu>
          <MenuButton
            as={Button}
            colorScheme="white"
            border={'1px'}
            color={'black'}
            borderColor={'grey'}
            height="48px"
            w={useBreakpointValue({ base: '260px', sm: '200px' })}
          >
            <Flex justify="space-between" align="center" width="100%">
              {city}
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList w={useBreakpointValue({ base: '260px', sm: '200px' })}>
            {dropdownOptions.map((option) => (
              <MenuItem
                key={option.id}
                onClick={() => onCitySelect && onCitySelect(option.id)}
              >
                {option.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu> */}
      </Box>

      <InputGroup
        maxW={{ base: '300px', sm: '430px' }}
        justifyContent={'center'}
      >
        <InputLeftElement>
          <SearchIcon color="0.5" mt={'2'} />
        </InputLeftElement>
        <Input
          placeholder="Salon"
          size="md"
          maxW={'300'}
          height="48px"
          border={'1px'}
          borderRadius={'3px'}
          borderColor={'grey'}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleEnterKeyPress}
        />
      </InputGroup>

      <Button
        color={{ base: 'white', sm: 'accent.500' }}
        colorScheme={useBreakpointValue({ base: 'accent.500', sm: 'white' })}
        bg={{ base: 'accent.500', sm: 'white' }}
        variant={useBreakpointValue({ base: 'solid', sm: 'outline' })}
        size={{ base: '2xl', sm: 'lg' }}
        borderRadius={'3px'}
        onClick={handleSearch}
      >
        Search
      </Button>

      {/* Animate the search results */}
      {isSearchResultsVisible && (
        <ScaleFade in={isSearchResultsVisible} initialScale={0.9}>
          <Box
            mt={4}
            position={'absolute'}
            left={['-20px', '220px']}
            top={['190px', '60px']}
            bg={'secondary'}
            p={'10px'}
            zIndex={1000}
          >
            {searchResults.map((result) => (
              <Box
                key={result.id}
                p={4}
                borderRadius="md"
                boxShadow="md"
                cursor="pointer"
                onClick={() => handleSalonClick(result.id)}
                _hover={{ bg: 'gray.100' }}
                w={['390px']}
                zIndex={1000}
              >
                <HStack justifyContent={'space-between'}>
                  <HStack>
                    <Text fontWeight="semibold">{result.name}</Text>
                  </HStack>
                  <HStack>
                    <StarIcon color="gold" />{' '}
                    <Text fontSize="sm">{result.rating}</Text>
                  </HStack>

                  <HStack>
                    <Text color="gray.600">
                      <GiPathDistance /> {result.distance.toFixed(2)} Kms
                    </Text>
                  </HStack>
                  <GenderBtn> {result.gender} </GenderBtn>
                </HStack>
              </Box>
            ))}
          </Box>
        </ScaleFade>
      )}
    </Box>
  );
};

export default SearchLocationBar;
