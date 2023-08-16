import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface LocationDropdownProps {
  city: string;
  dropdownOptions: { id: string; name: string }[];
  onCitySelect?: (id: string) => void;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  city,
  dropdownOptions,
  onCitySelect,
}) => {
  return (
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
          <MenuItem key={option.id} onClick={() => onCitySelect?.(option.id)}>
            {option.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LocationDropdown;
