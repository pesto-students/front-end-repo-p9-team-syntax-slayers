import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Text, Box, Center } from '@chakra-ui/react';

interface SortByNavProps {
  options: string[];
}

const SortByNav: React.FC<SortByNavProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Make an Axios call based on the selected option
    axios.get(`/api/data?sortBy=${selectedOption}`).then((response) => {
      setData(response.data);
    });
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      {options.map((option) => (
        <Box
          key={option}
          p={2}
          cursor="pointer"
          onClick={() => handleOptionClick(option)}
          borderBottom={
            selectedOption === option ? '2px solid #F61732' : 'none'
          }
        >
          <Center>
            <Text fontWeight={selectedOption === option ? 'bold' : 'normal'}>
              {option}
            </Text>
          </Center>
        </Box>
      ))}
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </Flex>
  );
};

export default SortByNav;
