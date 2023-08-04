import {
  Button,
  Select,
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
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

import React from "react";

interface SearchLocationBarProps {
  city: string;
}

const SearchLocationBar: React.FC<SearchLocationBarProps> = (props) => {
  // props destructured
  const { city } = props;

  //Function to handle search input

  const handleSearch = () => {
     console.log('searching..')
  }
  return (
    <> 
     {/* All three main components dropdown, searchBox, button are changed based on mobile view */}
      <Box
        as={Stack}
        direction={{ base: "column", sm: "row" }}
        maxW={{ base: "300", sm: "610" }}
        bg={"white"}
        display={"flex"}
        justifyContent={"center"}
        padding={{base:"20px", sm:"10px"}}
        alignItems={"center"}
        borderRadius={{ base: "15px", sm: "5px" }}
        boxShadow="lg"
      >
        {/* This is for the dropdown options */}
        <Box padding={5}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="white"
              border={"1px"}
              color={"black"}
              borderColor={"grey"}
              height="48px"
              w={useBreakpointValue({ base: "260px", sm: "200px" })}
            >
              <Flex justify="space-between" align="center" width="100%">
                City
                <ChevronDownIcon />
              </Flex>
            </MenuButton>
            <MenuList w={useBreakpointValue({ base: "260px", sm: "200px" })}>
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
              <MenuItem>Option 3</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* This is the searchBox input group */}
        <InputGroup maxW={{ base: "300px", sm: "430px" }} justifyContent={'center'}>
          <InputLeftElement>
            <SearchIcon color="0.5" mt={'2'} />
          </InputLeftElement>
          <Input
            placeholder="Salon"
            size="md"
            maxW={"300"}
            height="48px"
            border={"1px"}
            borderRadius={"3px"}
            borderColor={"grey"}
          />
        </InputGroup>

        {/* Search button */}
        <Button
          color={{ base: "white", sm: "accent.500" }}
          colorScheme={useBreakpointValue({ base: "accent.500", sm: "white" })}
          bg={{ base: "accent.500", sm: "white" }}
          variant={useBreakpointValue({ base: "solid", sm: "outline" })}
          size={{ base: "2xl", sm: "lg" }}
          borderRadius={"3px"}
          onClick={handleSearch}
        >
          search
        </Button>
      </Box>
    </>
  );
};

export default SearchLocationBar;
