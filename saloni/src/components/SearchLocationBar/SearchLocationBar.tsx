import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import instance from '../../API';

interface City {
  id: string;
  name: string;
}

interface SearchLocationBarProps {
  city: string;
  dropdownOptions: City[];
  onCitySelect?: (id: string) => void;
  onSearchQueryChange: (value: string) => void;
  // selectedLocation: LatLngTuple | null;
  // handleLocationSelect: (lat: number, lon: number) => void;
  // handleLocationChange: (lat: number, lon: number) => void;
}

const SearchLocationBar: React.FC<SearchLocationBarProps> = (props) => {
  const {
    city,
    dropdownOptions,
    onCitySelect,
    onSearchQueryChange,
    // selectedLocation,
    // handleLocationChange,
    // handleLocationSelect,
  } = props;

  const [searchQuery, setSearchQuery] = useState('');

  const history = useNavigate();

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false); // State to control animation visibility

  const handleSearch = async () => {
    try {
      ('/salon/searchNearBySalons?lon=77.5822&lat=12.9299&searchKeyWord=glamoures');
      const response = await instance.get(
        `${process.env.REACT_APP_BASEURL}/salon/searchNearBySalons?lon=77.5822&lat=12.9299&searchKeyWord=${searchQuery}`,
      );
      const salons = response.data;

      setSearchResults(salons);
      setIsSearchResultsVisible(true); // Show animation when search results are visible
    } catch (error) {
      console.error('Error fetching salons:', error);
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
        <Menu>
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
        </Menu>
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
          <Box mt={4}>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>
                  <MenuItem onClick={() => handleSalonClick(result.id)}>
                    {result.name} - Distance: {result.distance}
                  </MenuItem>
                </li>
              ))}
            </ul>
          </Box>
        </ScaleFade>
      )}
    </Box>
  );
};

export default SearchLocationBar;
